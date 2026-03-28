import * as React from "react"
import Layout from "../components/layout"

const SESSIONIZE_BASE = "https://sessionize.com/api/v2/9ddjd9rc/view"

// Parses GridSmart HTML — includes service sessions (breaks, lunch, etc.)
const parseGridSmart = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-sessionid]")].map((el) => {
    const timeAttr = el.querySelector(".sz-session__time")?.getAttribute("data-sztz") || ""
    const parts = timeAttr.split("|")
    return {
      id: el.dataset.sessionid,
      title: el.querySelector(".sz-session__title")?.textContent?.trim(),
      room: el.querySelector(".sz-session__room")?.textContent?.trim(),
      roomId: el.querySelector(".sz-session__room")?.getAttribute("data-roomid"),
      timeDisplay: el.querySelector(".sz-session__time")?.textContent?.trim(),
      startsAt: parts[2] || null,
      endsAt: parts[3] || null,
      isService: el.classList.contains("sz-session--service"),
      speakers: [...el.querySelectorAll(".sz-session__speakers [data-speakerid]")].map((li) => ({
        id: li.dataset.speakerid,
        name: li.querySelector("a")?.textContent?.trim(),
      })),
      description: null,
      tags: [],
    }
  })
}

// Parses Sessions HTML — has descriptions and tags but no service sessions
const parseSessionDetails = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-sessionid]")].map((el) => ({
    id: el.dataset.sessionid,
    description: el.querySelector(".sz-session__description")?.textContent?.trim(),
    tags: [...el.querySelectorAll(".sz-tag")].map((t) => ({
      category: t.getAttribute("data-categoryname"),
      name: t.textContent?.trim(),
    })),
  }))
}

const formatTime = (isoString) => {
  if (!isoString) return ""
  try {
    return new Date(isoString).toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Toronto",
    })
  } catch {
    return isoString
  }
}

const SchedulePage = () => {
  const [sessions, setSessions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

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

  const timedSessions = sessions
    .filter((s) => s.startsAt)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))

  const untimedSessions = sessions.filter((s) => !s.startsAt)

  // Group by start time slot
  const timeSlots = timedSessions.reduce((acc, session) => {
    const key = session.startsAt
    if (!acc[key]) acc[key] = []
    acc[key].push(session)
    return acc
  }, {})

  const sortedTimeKeys = Object.keys(timeSlots).sort()

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

      <section className="section">
        <div className="container">
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

          {!loading && !error && sessions.length > 0 && (
            <>
              {sortedTimeKeys.map((timeKey) => {
                const slotSessions = timeSlots[timeKey]
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

                    <div className={slotSessions.length > 1 ? "columns is-multiline" : ""}>
                      {slotSessions.map((session) => (
                        <div
                          key={session.id}
                          className={slotSessions.length > 1 ? "column is-half" : ""}
                        >
                          <div className={`card${session.isService ? " has-background-light" : ""}`}>
                            <div className="card-content">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {untimedSessions.length > 0 && (
                <div className="mt-6">
                  <h2 className="title is-4 mb-4">Additional Sessions</h2>
                  <div className="columns is-multiline">
                    {untimedSessions.map((session) => (
                      <div key={session.id} className="column is-half">
                        <div className="card">
                          <div className="card-content">
                            <h3 className="title is-5 mb-2">{session.title}</h3>
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
                        </div>
                      </div>
                    ))}
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
