import * as React from "react"
import Layout from "../components/layout"

const parseVCard = (text) => {
  const get = (key) => {
    const match = text.match(new RegExp(`^${key}[^:\\r\\n]*:(.+)$`, "mi"))
    return match ? match[1].trim() : ""
  }
  const n = get("N")
  let firstName = "", lastName = ""
  if (n) {
    const parts = n.split(";")
    lastName = parts[0] || ""
    firstName = parts[1] || ""
  }
  return {
    firstName,
    lastName,
    fullName: get("FN") || `${firstName} ${lastName}`.trim(),
    email: get("EMAIL"),
    phone: get("TEL"),
    company: get("ORG").split(";")[0],
    title: get("TITLE"),
    note: get("NOTE"),
  }
}

const BadgeScanner = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [mode, setMode] = React.useState("scanning") // scanning | preview | submitting | success | unknown
  const [contact, setContact] = React.useState(null)
  const [rawScan, setRawScan] = React.useState(null)
  const [leads, setLeads] = React.useState([])
  const [submitError, setSubmitError] = React.useState(null)
  const scannerRef = React.useRef(null)

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

  React.useEffect(() => {
    if (!loading && !user) {
      const netlifyIdentity = require("netlify-identity-widget")
      netlifyIdentity.open("login")
    }
  }, [loading, user])

  React.useEffect(() => {
    if (!user || mode !== "scanning") return

    let html5QrCode
    let started = false

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      html5QrCode = new Html5Qrcode("qr-reader")
      scannerRef.current = html5QrCode
      return html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (text) => {
          html5QrCode.stop().catch(() => {})
          setRawScan(text)
          if (text.toUpperCase().includes("BEGIN:VCARD")) {
            setContact(parseVCard(text))
            setMode("preview")
          } else {
            setContact(null)
            setMode("unknown")
          }
        },
        () => {}
      )
    }).then(() => {
      started = true
    }).catch(console.error)

    return () => {
      if (started && scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [user, mode])

  const submitLead = async () => {
    setMode("submitting")
    setSubmitError(null)
    try {
      const netlifyIdentity = require("netlify-identity-widget")
      const token = netlifyIdentity.currentUser()?.token?.access_token
      const res = await fetch("/.netlify/functions/add-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      setLeads((prev) => [
        { ...contact, savedAt: new Date().toLocaleTimeString() },
        ...prev,
      ])
      setMode("success")
    } catch (err) {
      setSubmitError(err.message)
      setMode("preview")
    }
  }

  const scanAnother = () => {
    setContact(null)
    setRawScan(null)
    setSubmitError(null)
    setMode("scanning")
  }

  if (loading) {
    return (
      <Layout>
        <section className="section">
          <div className="container has-text-centered">
            <p>Loading…</p>
          </div>
        </section>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <section className="section">
          <div className="container has-text-centered">
            <p className="is-size-5">Please log in to use the badge scanner.</p>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="hero is-dark is-small">
        <div className="hero-body">
          <div className="container is-flex is-justify-content-space-between is-align-items-center">
            <div>
              <h1 className="title is-4 mb-1">Badge Scanner</h1>
              <p className="subtitle is-6 mb-0">KCD Toronto 2026 — Lead Capture</p>
            </div>
            <button
              className="button is-small is-light"
              onClick={() => {
                const netlifyIdentity = require("netlify-identity-widget")
                netlifyIdentity.logout()
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 500 }}>

          {mode === "scanning" && (
            <div className="box">
              <p className="has-text-centered has-text-grey mb-4">
                Point your camera at an attendee badge QR code
              </p>
              <div id="qr-reader" style={{ width: "100%" }} />
            </div>
          )}

          {(mode === "preview" || mode === "submitting") && contact && (
            <div className="box">
              <h2 className="title is-5 mb-4">Contact Detected</h2>
              <table className="table is-fullwidth">
                <tbody>
                  {contact.fullName && (
                    <tr><th style={{ width: "30%" }}>Name</th><td>{contact.fullName}</td></tr>
                  )}
                  {contact.email && (
                    <tr><th>Email</th><td>{contact.email}</td></tr>
                  )}
                  {contact.phone && (
                    <tr><th>Phone</th><td>{contact.phone}</td></tr>
                  )}
                  {contact.company && (
                    <tr><th>Company</th><td>{contact.company}</td></tr>
                  )}
                  {contact.title && (
                    <tr><th>Title</th><td>{contact.title}</td></tr>
                  )}
                  {contact.note && (
                    <tr><th>Note</th><td>{contact.note}</td></tr>
                  )}
                </tbody>
              </table>
              {submitError && (
                <p className="has-text-danger mb-3 is-size-7">{submitError}</p>
              )}
              <div className="buttons">
                <button
                  className={`button is-success${mode === "submitting" ? " is-loading" : ""}`}
                  onClick={submitLead}
                  disabled={mode === "submitting"}
                >
                  Add to Sheet
                </button>
                <button
                  className="button"
                  onClick={scanAnother}
                  disabled={mode === "submitting"}
                >
                  Scan Another
                </button>
              </div>
            </div>
          )}

          {mode === "unknown" && (
            <div className="box">
              <div className="notification is-warning is-light mb-4">
                <strong>QR scanned, but it's not a vCard.</strong>
                <p className="is-size-7 mt-2">Badge format detected:</p>
                <pre className="is-size-7 mt-1" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {rawScan}
                </pre>
              </div>
              <button className="button is-fullwidth" onClick={scanAnother}>
                Try Another
              </button>
            </div>
          )}

          {mode === "success" && (
            <div className="box">
              <div className="notification is-success is-light mb-4">
                <strong>{contact?.fullName || "Contact"}</strong> added to your leads sheet.
              </div>
              <button className="button is-primary is-fullwidth" onClick={scanAnother}>
                Scan Next Badge
              </button>
            </div>
          )}

          {leads.length > 0 && (
            <div className="box mt-4">
              <h2 className="title is-6 mb-3">
                Captured this session ({leads.length})
              </h2>
              {leads.map((lead, i) => (
                <div
                  key={i}
                  className="is-flex is-justify-content-space-between is-align-items-center mb-2"
                >
                  <div>
                    <span className="has-text-weight-semibold">{lead.fullName}</span>
                    {lead.company && (
                      <span className="has-text-grey ml-2 is-size-7">· {lead.company}</span>
                    )}
                  </div>
                  <span className="tag is-light is-size-7">{lead.savedAt}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <title>Badge Scanner — KCD Toronto 2026</title>
export default BadgeScanner
