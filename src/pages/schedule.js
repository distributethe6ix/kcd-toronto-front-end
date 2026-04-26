import * as React from "react"
import Layout from "../components/layout"
import { SESSIONIZE_BASE, parseGridSmart, parseSessionDetails, formatTime } from "../utils/sessionize"

const loadBookmarks = () => {
  if (typeof window === "undefined") return new Set()
  try {
    return new Set(JSON.parse(localStorage.getItem("kcd2026-bookmarks") ?? "[]"))
  } catch {
    return new Set()
  }
}

const SchedulePage = () => {
  const [sessions, setSessions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [bookmarks, setBookmarks] = React.useState(new Set())
  const [view, setView] = React.useState("all") // "all" | "mine"

  React.useEffect(() => {
    setBookmarks(loadBookmarks())
  }, [])

  React.useEffect(() => {
    Promise.all([
      fetch(`${SESSIONIZE_BASE}/GridSmart?under=True`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.text()
      }),
      fetch(`${SESSIONIZE_BASE}/Sessions?under=True`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.text()
      }),
    ])
      .then(([gridHtml, sessionsHtml]) => {
        const gridSessions = parseGridSmart(gridHtml)
        const detailMap = new Map(
          parseSessionDetails(sessionsHtml).map((s) => [s.id, s])
        )
        const merged = gridSessions.map((s) => ({
          ...s,
          ...(detailMap.get(s.id) || {}),
        }))
        setSessions(merged)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      if (typeof window !== "undefined") {
        localStorage.setItem("kcd2026-bookmarks", JSON.stringify([...next]))
      }
      return next
    })
  }

  const timedSessions = sessions
    .filter((s) => s.startsAt)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))

  const untimedSessions = sessions.filter((s) => !s.startsAt)

  const timeSlots = timedSessions.reduce((acc, session) => {
    const key = session.startsAt
    if (!acc[key]) acc[key] = []
    acc[key].push(session)
    return acc
  }, {})

  const sortedTimeKeys = Object.keys(timeSlots).sort()

  // In "mine" view: keep a slot if it has a service session or a bookmarked session
  const visibleTimeKeys =
    view === "mine"
      ? sortedTimeKeys.filter((key) =>
          timeSlots[key].some((s) => s.isService || bookmarks.has(s.id))
        )
      : sortedTimeKeys

  const getVisibleSessions = (key) =>
    view === "mine"
      ? timeSlots[key].filter((s) => s.isService || bookmarks.has(s.id))
      : timeSlots[key]

  const bookmarkCount = bookmarks.size

  const renderSessionCard = (session, slotSessions) => (
    <div
      key={session.id}
      className={slotSessions.length > 1 && view === "all" ? "column is-half" : ""}
    >
      <div className={`card${session.isService ? " has-background-light" : ""}`}>
        <div className="card-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="title is-5 mb-2">{session.title}</h3>

              {session.room && (
                <p className="is-size-7 has-text-grey mb-1">
                  <strong>Room:</strong> {session.room}
                </p>
              )}

              {session.speakers && session.speakers.length > 0 && (
                <p className="has-text-grey-dark mb-2">
                  <em>{session.speakers.map((s) => s.name).join(", ")}</em>
                </p>
              )}

              {session.description && (
                <div className="content is-small mb-3">
                  <p>{session.description}</p>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {session.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`tag is-small ${
                      tag.category === "level"
                        ? "is-info is-light"
                        : tag.category === "session_format"
                        ? "is-primary is-light"
                        : "is-light"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {!session.isService && (
              <button
                onClick={() => toggleBookmark(session.id)}
                aria-label={bookmarks.has(session.id) ? "Remove from my schedule" : "Add to my schedule"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  padding: "0.25rem",
                  minWidth: "44px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: bookmarks.has(session.id) ? "#f5a623" : "#cccccc",
                }}
              >
                {bookmarks.has(session.id) ? "★" : "☆"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Event Schedule</h1>
            <p className="subtitle is-3">May 13, 2026 | Toronto, ON</p>
          </div>
        </div>
      </section>

      {/* Tab toggle */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "white", borderBottom: "1px solid #dbdbdb" }}>
        <div className="container">
          <div className="tabs is-fullwidth mb-0">
            <ul>
              <li className={view === "all" ? "is-active" : ""}>
                <a onClick={() => setView("all")} style={{ cursor: "pointer" }}>
                  Full Schedule
                </a>
              </li>
              <li className={view === "mine" ? "is-active" : ""}>
                <a onClick={() => setView("mine")} style={{ cursor: "pointer" }}>
                  My Schedule
                  {bookmarkCount > 0 && (
                    <span className="tag is-warning is-rounded ml-2" style={{ fontSize: "0.7rem" }}>
                      {bookmarkCount}
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Pinned Keynote Sessions — always visible */}
          <div className="mb-6">
            <h2 className="title is-4 mb-4">🎤 Featured Keynotes</h2>
            <div className="columns">
              <div className="column is-half">
                <div className="card" style={{ borderTop: "4px solid #326ce5" }}>
                  <div className="card-content">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img
                        src="/speakers/keynote/marylia.png"
                        alt="Marylia Gutierrez"
                        style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div>
                        <h3 className="title is-5 mb-1">Opening Keynote</h3>
                        <p className="has-text-grey-dark mb-2">Marylia Gutierrez</p>
                        <span className="tag is-primary is-light">Keynote</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="card" style={{ borderTop: "4px solid #326ce5" }}>
                  <div className="card-content">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <img
                        src="/speakers/keynote/doneyli.jpg"
                        alt="Doneyli De Jesus"
                        style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div>
                        <h3 className="title is-5 mb-1">Sponsored Keynote</h3>
                        <p className="has-text-grey-dark mb-2">Doneyli De Jesus</p>
                        <span className="tag is-warning is-light">Sponsored · ClickHouse</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="has-text-centered py-6">
              <progress className="progress is-primary" max="100" style={{ maxWidth: "400px", margin: "0 auto" }}>
                Loading schedule...
              </progress>
              <p className="mt-3 has-text-grey">Loading schedule...</p>
            </div>
          )}

          {error && (
            <div className="notification is-danger is-light">
              <p>
                <strong>Unable to load schedule.</strong> Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length === 0 && (
            <div className="notification is-info is-light">
              <p className="has-text-centered is-size-5">
                <strong>Schedule coming soon!</strong> The full agenda will be published closer to the event date.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && view === "mine" && bookmarkCount === 0 && (
            <div className="notification is-light has-text-centered py-6">
              <p className="is-size-5 mb-2">No sessions saved yet.</p>
              <p className="has-text-grey">
                Tap <strong>☆</strong> on any session in the Full Schedule to add it here.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && (
            <>
              {visibleTimeKeys.map((timeKey) => {
                const slotSessions = getVisibleSessions(timeKey)
                if (!slotSessions.length) return null
                const startTime = formatTime(timeKey)
                const endTime = slotSessions[0]?.endsAt ? formatTime(slotSessions[0].endsAt) : ""

                return (
                  <div key={timeKey} className="mb-5">
                    <div
                      className="has-background-primary-light px-4 py-2 mb-3"
                      style={{ borderLeft: "4px solid #326ce5", borderRadius: "2px" }}
                    >
                      <strong className="is-size-5 has-text-primary">
                        {startTime}{endTime ? ` – ${endTime}` : ""}
                      </strong>
                    </div>

                    <div className={slotSessions.length > 1 && view === "all" ? "columns is-multiline" : ""}>
                      {slotSessions.map((session) => renderSessionCard(session, slotSessions))}
                    </div>
                  </div>
                )
              })}

              {view === "all" && untimedSessions.length > 0 && (
                <div className="mt-6">
                  <h2 className="title is-4 mb-4">Additional Sessions</h2>
                  <div className="columns is-multiline">
                    {untimedSessions.map((session) => renderSessionCard(session, untimedSessions))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default SchedulePage

export const Head = () => <title>Schedule - KCD Toronto 2026</title>
