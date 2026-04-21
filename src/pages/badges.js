import * as React from "react"

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
  }
}

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 20px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 6,
    textAlign: "center",
  },
  sub: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 36,
    textAlign: "center",
  },
  loginBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 36px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    maxWidth: 320,
  },
  scanPage: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #1e293b",
  },
  topBarTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #334155",
    borderRadius: 6,
    color: "#94a3b8",
    fontSize: 12,
    padding: "5px 12px",
    cursor: "pointer",
  },
  scannerWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 20px",
  },
  scannerHint: {
    color: "#64748b",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  qrBox: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 16,
    overflow: "hidden",
    background: "#1e293b",
  },
  // Sheet panel (slides up)
  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    borderRadius: "20px 20px 0 0",
    padding: "24px 20px 36px",
    boxShadow: "0 -4px 40px rgba(0,0,0,0.3)",
    maxHeight: "85vh",
    overflowY: "auto",
  },
  sheetHandle: {
    width: 40,
    height: 4,
    background: "#e2e8f0",
    borderRadius: 2,
    margin: "0 auto 20px",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 16,
  },
  field: { marginBottom: 12 },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 15,
    color: "#1e293b",
  },
  divider: {
    height: 1,
    background: "#f1f5f9",
    margin: "16px 0",
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  },
  notesInput: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    color: "#1e293b",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  saveBtn: {
    marginTop: 16,
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
  saveBtnLoading: {
    opacity: 0.6,
    cursor: "default",
  },
  cancelBtn: {
    marginTop: 10,
    width: "100%",
    background: "transparent",
    color: "#94a3b8",
    border: "none",
    padding: "10px",
    fontSize: 14,
    cursor: "pointer",
  },
  unknownBox: {
    background: "#fef9c3",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  unknownTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#92400e",
    marginBottom: 8,
  },
  unknownPre: {
    fontSize: 11,
    color: "#78350f",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    margin: 0,
  },
  toast: {
    position: "fixed",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#166534",
    color: "#fff",
    borderRadius: 10,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    zIndex: 9999,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  sessionLog: {
    borderTop: "1px solid #1e293b",
    padding: "16px 20px",
  },
  sessionTitle: {
    color: "#475569",
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  sessionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  sessionName: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 500,
  },
  sessionCompany: {
    color: "#475569",
    fontSize: 12,
    marginTop: 1,
  },
  sessionTime: {
    color: "#334155",
    fontSize: 11,
    whiteSpace: "nowrap",
    marginLeft: 12,
    marginTop: 2,
  },
}

// ── Component ─────────────────────────────────────────────────────────────────

const BadgeScanner = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [mode, setMode] = React.useState("scanning") // scanning | preview | submitting | unknown
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
      const el = document.getElementById("qr-reader")
      if (el) el.innerHTML = ""
      const scanner = new Html5Qrcode("qr-reader")
      scannerRef.current = scanner
      return scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (text) => {
          if (stoppedRef.current) return
          stoppedRef.current = true
          stopScanner()
          setRawScan(text)
          if (text.toUpperCase().includes("BEGIN:VCARD")) {
            setContact(parseVCard(text))
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
    }).catch(console.error)

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
      const res = await fetch("/.netlify/functions/add-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...contact, note: notes, rawScan }),
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

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={S.page}>
        <p style={{ color: "#94a3b8" }}>Loading…</p>
      </div>
    )
  }

  // ── Access check ──────────────────────────────────────────────────────────
  const isAdmin = user?.app_metadata?.roles?.includes("admin")
  const domain = user?.email?.split("@")[1]?.toLowerCase()
  const hasAccess = isAdmin || domain === "clickhouse.com"

  if (user && !hasAccess) {
    return (
      <div style={S.page}>
        <p style={S.logo}>KCD Toronto 2026</p>
        <p style={{ ...S.sub, color: "#f87171" }}>
          Access restricted — this scanner is for ClickHouse staff only.
        </p>
        <button
          style={{ ...S.loginBtn, background: "#334155" }}
          onClick={() => {
            const netlifyIdentity = require("netlify-identity-widget")
            netlifyIdentity.logout()
          }}
        >
          Log out
        </button>
      </div>
    )
  }

  // ── Login wall ─────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={S.page}>
        <p style={S.logo}>KCD Toronto 2026</p>
        <p style={S.sub}>Sponsor Lead Scanner</p>
        <button
          style={S.loginBtn}
          onClick={() => {
            const netlifyIdentity = require("netlify-identity-widget")
            netlifyIdentity.open("login")
          }}
        >
          Log in to scan badges
        </button>
      </div>
    )
  }

  // ── Scanner ────────────────────────────────────────────────────────────────
  return (
    <div style={S.scanPage}>
      {toast && <div style={S.toast}>{toast}</div>}

      <div style={S.topBar}>
        <span style={S.topBarTitle}>Badge Scanner</span>
        <button
          style={S.logoutBtn}
          onClick={() => {
            const netlifyIdentity = require("netlify-identity-widget")
            netlifyIdentity.logout()
          }}
        >
          Log out
        </button>
      </div>

      <div style={S.scannerWrap}>
        {mode === "scanning" && (
          <>
            <p style={S.scannerHint}>Point at an attendee badge QR code</p>
            <div style={S.qrBox}>
              <div id="qr-reader" style={{ width: "100%" }} />
            </div>
          </>
        )}

        {mode !== "scanning" && mode !== "preview" && mode !== "submitting" && (
          <div style={S.qrBox}>
            <div id="qr-reader" style={{ width: "100%", display: "none" }} />
          </div>
        )}
      </div>

      {/* Contact sheet */}
      {(mode === "preview" || mode === "submitting") && contact && (
        <div style={S.sheet}>
          <div style={S.sheetHandle} />
          <p style={S.sheetTitle}>
            {contact.fullName || "Contact"}
          </p>

          {contact.company && (
            <div style={S.field}>
              <p style={S.fieldLabel}>Company</p>
              <p style={S.fieldValue}>{contact.company}</p>
            </div>
          )}
          {contact.title && (
            <div style={S.field}>
              <p style={S.fieldLabel}>Title</p>
              <p style={S.fieldValue}>{contact.title}</p>
            </div>
          )}
          {contact.email && (
            <div style={S.field}>
              <p style={S.fieldLabel}>Email</p>
              <p style={S.fieldValue}>{contact.email}</p>
            </div>
          )}
          {contact.phone && (
            <div style={S.field}>
              <p style={S.fieldLabel}>Phone</p>
              <p style={S.fieldValue}>{contact.phone}</p>
            </div>
          )}

          <div style={S.divider} />

          <label style={S.notesLabel}>Notes</label>
          <textarea
            style={S.notesInput}
            rows={3}
            placeholder="What did you discuss? Follow-up needed?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={mode === "submitting"}
          />

          {submitError && (
            <p style={{ color: "#dc2626", fontSize: 13, marginTop: 8 }}>{submitError}</p>
          )}

          <button
            style={{
              ...S.saveBtn,
              ...(mode === "submitting" ? S.saveBtnLoading : {}),
            }}
            onClick={submitLead}
            disabled={mode === "submitting"}
          >
            {mode === "submitting" ? "Saving…" : "Save Lead"}
          </button>
          <button style={S.cancelBtn} onClick={resetToScan} disabled={mode === "submitting"}>
            Cancel
          </button>
        </div>
      )}

      {/* Unknown QR sheet */}
      {mode === "unknown" && (
        <div style={S.sheet}>
          <div style={S.sheetHandle} />
          <div style={S.unknownBox}>
            <p style={S.unknownTitle}>QR scanned — not a vCard</p>
            <pre style={S.unknownPre}>{rawScan}</pre>
          </div>
          <button style={S.saveBtn} onClick={resetToScan}>Scan Another</button>
        </div>
      )}

      {/* Session log */}
      {leads.length > 0 && mode === "scanning" && (
        <div style={S.sessionLog}>
          <p style={S.sessionTitle}>This session · {leads.length}</p>
          {leads.map((lead, i) => (
            <div key={i} style={S.sessionRow}>
              <div>
                <p style={S.sessionName}>{lead.fullName}</p>
                {lead.company && <p style={S.sessionCompany}>{lead.company}</p>}
              </div>
              <span style={S.sessionTime}>{lead.savedAt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Head = () => (
  <>
    <title>Badge Scanner — KCD Toronto 2026</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  </>
)

export default BadgeScanner
