import * as React from "react"
import Layout from "../components/layout"

const TIERS = ["diamond", "platinum", "gold", "silver", "community"]

const defaultForm = {
  userEmail: "",
  sponsor_name: "",
  sponsor_tier: "gold",
  discount_code: "",
  discount_percent: "",
  ticket_codes: "",
  logo_url: "",
  agreement_pdf: "",
}

const SponsorAdmin = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [form, setForm] = React.useState(defaultForm)
  const [status, setStatus] = React.useState(null) // { type: "success"|"error", message }
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.init()

    const currentUser = netlifyIdentity.currentUser()
    if (currentUser) setUser(currentUser)
    setLoading(false)

    const onLogin = (u) => { setUser(u); netlifyIdentity.close() }
    const onLogout = () => setUser(null)
    netlifyIdentity.on("login", onLogin)
    netlifyIdentity.on("logout", onLogout)
    return () => {
      netlifyIdentity.off("login", onLogin)
      netlifyIdentity.off("logout", onLogout)
    }
  }, [])

  const handleLogin = () => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.open("login")
  }

  const handleLogout = () => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.logout()
  }

  const isAdmin = user?.app_metadata?.roles?.includes("admin")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    const netlifyIdentity = require("netlify-identity-widget")
    const token = netlifyIdentity.currentUser()?.token?.access_token

    const ticketCodes = form.ticket_codes
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    try {
      const res = await fetch("/.netlify/functions/set-sponsor-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: form.userEmail,
          sponsorData: {
            sponsor_name: form.sponsor_name,
            sponsor_tier: form.sponsor_tier,
            discount_code: form.discount_code,
            discount_percent: Number(form.discount_percent) || 0,
            ticket_codes: ticketCodes,
            logo_url: form.logo_url,
            agreement_pdf: form.agreement_pdf,
          },
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus({ type: "success", message: `Sponsor profile saved for ${form.userEmail}.` })
        setForm(defaultForm)
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong." })
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <section className="section">
          <div className="container has-text-centered">
            <p className="is-size-4">Loading...</p>
          </div>
        </section>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Sponsor Admin</h1>
              <p className="subtitle is-4">Organizer access only</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="box has-text-centered" style={{ maxWidth: 400, margin: "0 auto" }}>
              <p className="mb-4">Log in with your organizer account to manage sponsors.</p>
              <button className="button is-dark is-medium" onClick={handleLogin}>Log In</button>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="notification is-danger">
              <strong>Access denied.</strong> This page is restricted to organizers.
              <br />
              <button className="button is-light mt-3" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sponsor Admin</h1>
            <p className="subtitle is-4">Set sponsor portal data for a user</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="has-text-right mb-4">
            <span className="mr-3 has-text-grey">{user.email}</span>
            <button className="button is-light" onClick={handleLogout}>Log Out</button>
          </div>

          {status && (
            <div className={`notification ${status.type === "success" ? "is-success" : "is-danger"} mb-5`}>
              {status.message}
            </div>
          )}

          <div className="box" style={{ maxWidth: 680 }}>
            <h2 className="title is-4 mb-5">Set Sponsor Profile</h2>
            <p className="mb-5 has-text-grey">
              The sponsor must already have a Netlify Identity account (invited via the Netlify dashboard).
              Enter their email below and fill in their portal details.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Sponsor's Login Email *</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="userEmail"
                    value={form.userEmail}
                    onChange={handleChange}
                    placeholder="jane@acmecorp.com"
                    required
                  />
                </div>
                <p className="help">Must match their Netlify Identity account exactly.</p>
              </div>

              <div className="field">
                <label className="label">Sponsor Name *</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="sponsor_name"
                    value={form.sponsor_name}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Tier *</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="sponsor_tier" value={form.sponsor_tier} onChange={handleChange}>
                      {TIERS.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Discount Code</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="discount_code"
                        value={form.discount_code}
                        onChange={handleChange}
                        placeholder="ACME2026"
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-narrow">
                  <div className="field">
                    <label className="label">Discount %</label>
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        name="discount_percent"
                        value={form.discount_percent}
                        onChange={handleChange}
                        placeholder="15"
                        min="0"
                        max="100"
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Complimentary Ticket Codes</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="ticket_codes"
                    value={form.ticket_codes}
                    onChange={handleChange}
                    placeholder={"ACME-TKT-001\nACME-TKT-002\nACME-TKT-003"}
                    rows={4}
                  />
                </div>
                <p className="help">One code per line.</p>
              </div>

              <div className="field">
                <label className="label">Logo URL</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="logo_url"
                    value={form.logo_url}
                    onChange={handleChange}
                    placeholder="/sponsors/acme-logo.png"
                  />
                </div>
                <p className="help">Path to their logo in the <code>/static/sponsors/</code> folder.</p>
              </div>

              <div className="field">
                <label className="label">Agreement PDF URL</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="agreement_pdf"
                    value={form.agreement_pdf}
                    onChange={handleChange}
                    placeholder="/sponsor-portal/acme/agreement.pdf"
                  />
                </div>
              </div>

              <div className="field mt-5">
                <div className="control">
                  <button
                    className={`button is-dark is-medium ${submitting ? "is-loading" : ""}`}
                    type="submit"
                    disabled={submitting}
                  >
                    Save Sponsor Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SponsorAdmin

export const Head = () => <title>Sponsor Admin - KCD Toronto 2026</title>
