import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import sponsorData from "../data/sponsors.json"

const TIERS = ["diamond", "platinum", "gold", "silver", "community"]

const TIER_COLORS = {
  diamond: "is-info",
  platinum: "is-link",
  gold: "is-warning",
  silver: "is-light",
  community: "is-light",
}

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
  const [saveStatus, setSaveStatus] = React.useState(null)
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

  const getToken = () => {
    const netlifyIdentity = require("netlify-identity-widget")
    return netlifyIdentity.currentUser()?.token?.access_token
  }

  const isAdmin = user?.app_metadata?.roles?.includes("admin")

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSaveStatus(null)

    const ticketCodes = form.ticket_codes
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    try {
      const res = await fetch("/.netlify/functions/set-sponsor-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
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
        setSaveStatus({ type: "success", message: `Saved for ${form.userEmail}.` })
        setForm(defaultForm)
      } else {
        setSaveStatus({ type: "error", message: data.error || "Something went wrong." })
      }
    } catch {
      setSaveStatus({ type: "error", message: "Network error. Please try again." })
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
            <p className="subtitle is-4">Manage sponsor portal access</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="has-text-right mb-5">
            <span className="mr-3 has-text-grey">{user.email}</span>
            <button className="button is-light" onClick={handleLogout}>Log Out</button>
          </div>

          <div className="columns is-variable is-6">
            {/* Left: Set sponsor data */}
            <div className="column is-5">
              <div className="box">
                <h2 className="title is-4 mb-2">Set Sponsor Profile</h2>
                <p className="has-text-grey is-size-7 mb-4">
                  The sponsor must already have a Netlify Identity account. Enter their email and fill in their portal details.
                </p>

                {saveStatus && (
                  <div className={`notification is-light ${saveStatus.type === "success" ? "is-success" : "is-danger"} mb-4`}>
                    {saveStatus.message}
                  </div>
                )}

                <form onSubmit={handleSave}>
                  <div className="field">
                    <label className="label">Login Email *</label>
                    <div className="control">
                      <input className="input" type="email" name="userEmail" value={form.userEmail}
                        onChange={handleChange} placeholder="jane@acmecorp.com" required />
                    </div>
                    <p className="help">Must match their Netlify Identity account exactly.</p>
                  </div>

                  <div className="field">
                    <label className="label">Sponsor Name *</label>
                    <div className="control">
                      <input className="input" type="text" name="sponsor_name" value={form.sponsor_name}
                        onChange={handleChange} placeholder="Acme Corp" required />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Tier *</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select name="sponsor_tier" value={form.sponsor_tier} onChange={handleChange}>
                          {TIERS.map((t) => (
                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Additional Tickets Discount Code</label>
                        <div className="control">
                          <input className="input" type="text" name="discount_code" value={form.discount_code}
                            onChange={handleChange} placeholder="ACME2026" />
                        </div>
                      </div>
                    </div>
                    <div className="column is-narrow">
                      <div className="field">
                        <label className="label">Discount %</label>
                        <div className="control">
                          <input className="input" type="number" name="discount_percent" value={form.discount_percent}
                            onChange={handleChange} placeholder="15" min="0" max="100" style={{ width: 90 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Included Ticket Codes</label>
                    <div className="control">
                      <textarea className="textarea" name="ticket_codes" value={form.ticket_codes}
                        onChange={handleChange} placeholder={"ACME-TKT-001\nACME-TKT-002"} rows={3} />
                    </div>
                    <p className="help">One code per line.</p>
                  </div>

                  <div className="field">
                    <label className="label">Logo URL</label>
                    <div className="control">
                      <input className="input" type="text" name="logo_url" value={form.logo_url}
                        onChange={handleChange} placeholder="/sponsors/acme-logo.png" />
                    </div>
                    <p className="help">Path in <code>/static/sponsors/</code>.</p>
                  </div>

                  <div className="field">
                    <label className="label">Agreement PDF URL</label>
                    <div className="control">
                      <input className="input" type="text" name="agreement_pdf" value={form.agreement_pdf}
                        onChange={handleChange} placeholder="/sponsor-portal/acme/agreement.pdf" />
                    </div>
                  </div>

                  <div className="field mt-4">
                    <div className="control">
                      <button className={`button is-dark is-fullwidth ${submitting ? "is-loading" : ""}`}
                        type="submit" disabled={submitting}>
                        Save Sponsor Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Sponsor list */}
            <div className="column is-7">
              <div className="box">
                <h2 className="title is-4 mb-2">Sponsors</h2>
                <p className="has-text-grey is-size-7 mb-4">
                  Click a sponsor to preview their portal as an admin.
                </p>

                <div className="table-container">
                  <table className="table is-fullwidth is-hoverable">
                    <thead>
                      <tr>
                        <th>Sponsor</th>
                        <th>Tier</th>
                        <th>Domain</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsorData.sponsors.map((s) => (
                        <tr key={s.id}>
                          <td className="has-text-weight-semibold">{s.name}</td>
                          <td>
                            <span className={`tag ${TIER_COLORS[s.tier] || "is-light"}`}>
                              {s.tier.charAt(0).toUpperCase() + s.tier.slice(1)}
                            </span>
                          </td>
                          <td className="has-text-grey is-size-7">@{s.domain}</td>
                          <td>
                            <Link
                              to={`/sponsor-portal?admin_preview=${s.id}`}
                              className="button is-small is-dark is-outlined"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Portal
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SponsorAdmin

export const Head = () => <title>Sponsor Admin - KCD Toronto 2026</title>
