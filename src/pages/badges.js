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
    note: "",
  }
}

const BadgeScanner = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  // mode: scanning | preview | submitting | unknown
  const [mode, setMode] = React.useState("scanning")
  const [contact, setContact] = React.useState(null)
  const [rawScan, setRawScan] = React.useState(null)
  const [notes, setNotes] = React.useState("")
  const [leads, setLeads] = React.useState([])
  const [submitError, setSubmitError] = React.useState(null)
  const [toast, setToast] = React.useState(null)

  const scannerRef = React.useRef(null)
  const startedRef = React.useRef(false)
  const stoppedRef = React.useRef(false)

  // Auth
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

  // QR scanner
  React.useEffect(() => {
    if (!user || mode !== "scanning") return

    stoppedRef.current = false

    const stopScanner = () => {
      if (scannerRef.current && startedRef.current) {
        startedRef.current = false
        scannerRef.current.stop().catch(() => {}).finally(() => {
          scannerRef.current = null
        })
      }
    }

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (stoppedRef.current) return

      // Clear any leftover DOM state from a previous instance
      const el = document.getElementById("qr-reader")
      if (el) el.innerHTML = ""

      const scanner = new Html5Qrcode("qr-reader")
      scannerRef.current = scanner

      return scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (text) => {
          if (stoppedRef.current) return
          stoppedRef.current = true
          stopScanner()
          setRawScan(text)
          if (text.toUpperCase().includes("BEGIN:VCARD")) {
            const parsed = parseVCard(text)
            setContact(parsed)
            setNotes("")
            setMode("preview")
          } else {
            setContact(null)
            setNotes("")
            setMode("unknown")
          }
        },
        () => {}
      ).then(() => {
        if (!stoppedRef.current) startedRef.current = true
      })
    }).catch((err) => {
      console.error("QR scanner error:", err)
    })

    return () => {
      stoppedRef.current = true
      stopScanner()
    }
  }, [user, mode])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const submitLead = async () => {
    setMode("submitting")
    setSubmitError(null)
    try {
      const netlifyIdentity = require("netlify-identity-widget")
      const token = netlifyIdentity.currentUser()?.token?.access_token
      const payload = { ...contact, note: notes, rawScan }
      const res = await fetch("/.netlify/functions/add-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      setLeads((prev) => [
        { ...contact, note: notes, savedAt: new Date().toLocaleTimeString() },
        ...prev,
      ])
      showToast(`${contact?.fullName || "Contact"} saved`)
      resetToScan()
    } catch (err) {
      setSubmitError(err.message)
      setMode("preview")
    }
  }

  const resetToScan = () => {
    setContact(null)
    setRawScan(null)
    setNotes("")
    setSubmitError(null)
    setMode("scanning")
  }

  if (loading) {
    return (
      <Layout>
        <section className="section">
          <div className="container has-text-centered"><p>Loading…</p></div>
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
      {toast && (
        <div
          style={{
            position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
            zIndex: 9999, minWidth: 260,
          }}
        >
          <div className="notification is-success is-light has-text-centered py-3 px-5">
            {toast}
          </div>
        </div>
      )}

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

          {/* Scanner */}
          {mode === "scanning" && (
            <div className="box">
              <p className="has-text-centered has-text-grey mb-4">
                Point your camera at an attendee badge QR code
              </p>
              <div id="qr-reader" style={{ width: "100%" }} />
            </div>
          )}

          {/* Contact preview + notes */}
          {(mode === "preview" || mode === "submitting") && contact && (
            <div className="box">
              <h2 className="title is-5 mb-4">Contact</h2>
              <table className="table is-fullwidth mb-4">
                <tbody>
                  {contact.fullName && <tr><th style={{ width: "30%" }}>Name</th><td>{contact.fullName}</td></tr>}
                  {contact.email && <tr><th>Email</th><td>{contact.email}</td></tr>}
                  {contact.phone && <tr><th>Phone</th><td>{contact.phone}</td></tr>}
                  {contact.company && <tr><th>Company</th><td>{contact.company}</td></tr>}
                  {contact.title && <tr><th>Title</th><td>{contact.title}</td></tr>}
                </tbody>
              </table>

              <div className="field">
                <label className="label">Notes</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    rows={3}
                    placeholder="What did you discuss? Follow-up needed?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={mode === "submitting"}
                  />
                </div>
              </div>

              {submitError && (
                <p className="has-text-danger mb-3 is-size-7">{submitError}</p>
              )}
              <div className="buttons">
                <button
                  className={`button is-success${mode === "submitting" ? " is-loading" : ""}`}
                  onClick={submitLead}
                  disabled={mode === "submitting"}
                >
                  Save Lead
                </button>
                <button className="button" onClick={resetToScan} disabled={mode === "submitting"}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Unknown QR format */}
          {mode === "unknown" && (
            <div className="box">
              <div className="notification is-warning is-light mb-4">
                <p><strong>QR scanned — not a vCard format.</strong></p>
                <p className="is-size-7 mt-2">Raw content:</p>
                <pre className="is-size-7 mt-1" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {rawScan}
                </pre>
              </div>
              <button className="button is-fullwidth" onClick={resetToScan}>
                Scan Another
              </button>
            </div>
          )}

          {/* Session log */}
          {leads.length > 0 && (
            <div className="box mt-4">
              <h2 className="title is-6 mb-3">Captured this session ({leads.length})</h2>
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
                    {lead.note && (
                      <p className="is-size-7 has-text-grey-dark mt-1">{lead.note}</p>
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
