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
  sponsorId: "",
  sponsor_name: "",
  sponsor_tier: "gold",
  discount_code: "",
  discount_percent: "",
  ticket_code: "",
  ticket_quantity: "",
  promo_url: "",
  agreement_pdf: "",
}

const SponsorAdmin = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [form, setForm] = React.useState(defaultForm)
  const [saveStatus, setSaveStatus] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [loadingConfig, setLoadingConfig] = React.useState(false)

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
    return netlifyIdentity.currentUser()?.jwt()
  }

  const isAdmin = user?.app_metadata?.roles?.includes("admin")

  const handleSponsorSelect = (e) => {
    const id = e.target.value
    if (!id) {
      setForm(defaultForm)
      return
    }
    const sponsor = sponsorData.sponsors.find((s) => s.id === id)
    setForm((f) => ({
      ...f,
      sponsorId: id,
      sponsor_name: sponsor.name,
      sponsor_tier: sponsor.tier,
    }))
    setSaveStatus(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleLoadConfig = async () => {
    if (!form.sponsorId) return
    const sponsor = sponsorData.sponsors.find((s) => s.id === form.sponsorId)
    if (!sponsor) return
    setLoadingConfig(true)
    setSaveStatus(null)
    try {
      const res = await fetch("/.netlify/functions/get-sponsor-config", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify({ domain: sponsor.domain }),
      })
      const data = await res.json()
      if (res.ok && data.config) {
        const c = data.config
        setForm((f) => ({
          ...f,
          sponsor_name: c.sponsor_name || sponsor.name,
          sponsor_tier: c.sponsor_tier || sponsor.tier,
          discount_code: c.discount_code || "",
          discount_percent: c.discount_percent != null ? String(c.discount_percent) : "",
          ticket_code: c.ticket_code || "",
          ticket_quantity: c.ticket_quantity != null ? String(c.ticket_quantity) : "",
          promo_url: c.promo_url || "",
          agreement_pdf: c.agreement_pdf || "",
        }))
        setSaveStatus({ type: "success", message: "Config loaded." })
      } else if (res.ok && !data.config) {
        setSaveStatus({ type: "success", message: "No saved config yet for this sponsor." })
      } else {
        setSaveStatus({ type: "error", message: data.error || "Failed to load config." })
      }
    } catch {
      setSaveStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setLoadingConfig(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.sponsorId) return
    const sponsor = sponsorData.sponsors.find((s) => s.id === form.sponsorId)
    if (!sponsor) return
    setSubmitting(true)
    setSaveStatus(null)

    try {
      const res = await fetch("/.netlify/functions/set-sponsor-config", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify({
          domain: sponsor.domain,
          sponsorData: {
            sponsor_name: form.sponsor_name,
            sponsor_tier: form.sponsor_tier,
            discount_code: form.discount_code,
            discount_percent: Number(form.discount_percent) || 0,
            ticket_code: form.ticket_code,
            ticket_quantity: Number(form.ticket_quantity) || 0,
            promo_url: form.promo_url,
            agreement_pdf: form.agreement_pdf,
          },
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSaveStatus({ type: "success", message: `Saved config for ${sponsor.name} (@${sponsor.domain}).` })
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
                  Select a sponsor, load their existing config, make changes, and save.
                  Config is stored by domain — any employee who signs in will see it automatically.
                </p>

                {saveStatus && (
                  <div className={`notification is-light ${saveStatus.type === "success" ? "is-success" : "is-danger"} mb-4`}>
                    {saveStatus.message}
                  </div>
                )}

                <div className="field">
                  <label className="label">Sponsor *</label>
                  <div className="control is-flex" style={{ gap: "0.5rem" }}>
                    <div className="select is-fullwidth">
                      <select value={form.sponsorId} onChange={handleSponsorSelect}>
                        <option value="">— Select a sponsor —</option>
                        {sponsorData.sponsors.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} (@{s.domain})
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className={`button is-light ${loadingConfig ? "is-loading" : ""}`}
                      onClick={handleLoadConfig}
                      disabled={!form.sponsorId || loadingConfig}
                      title="Load saved config for this sponsor"
                    >
                      Load
                    </button>
                  </div>
                  <p className="help">Config is keyed to the sponsor's domain.</p>
                </div>

                <form onSubmit={handleSave}>
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

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Included Ticket Code</label>
                        <div className="control">
                          <input className="input" type="text" name="ticket_code" value={form.ticket_code}
                            onChange={handleChange} placeholder="ACME-TKT-2026" />
                        </div>
                      </div>
                    </div>
                    <div className="column is-narrow">
                      <div className="field">
                        <label className="label">Quantity</label>
                        <div className="control">
                          <input className="input" type="number" name="ticket_quantity" value={form.ticket_quantity}
                            onChange={handleChange} placeholder="2" min="0" style={{ width: 90 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Sponsor Promo URL</label>
                    <div className="control">
                      <input className="input" type="text" name="promo_url" value={form.promo_url}
                        onChange={handleChange} placeholder="/sponsors/acme-promo.png" />
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
                      <button
                        className={`button is-dark is-fullwidth ${submitting ? "is-loading" : ""}`}
                        type="submit"
                        disabled={submitting || !form.sponsorId}
                      >
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
