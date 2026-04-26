import * as React from "react"
import Layout from "../components/layout"
import { SESSIONIZE_BASE, formatTime } from "../utils/sessionize"

const parseSessions = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-sessionid]")].map((el) => {
    const timeAttr = el.querySelector(".sz-session__time")?.getAttribute("data-sztz") || ""
    const parts = timeAttr.split("|")
    return {
      id: el.dataset.sessionid,
      title: el.querySelector(".sz-session__title")?.textContent?.trim(),
      description: el.querySelector(".sz-session__description")?.textContent?.trim(),
      room: el.querySelector(".sz-session__room")?.textContent?.trim(),
      roomId: el.querySelector(".sz-session__room")?.getAttribute("data-roomid"),
      timeDisplay: el.querySelector(".sz-session__time")?.textContent?.trim(),
      startsAt: parts[2] || null,
      endsAt: parts[3] || null,
      speakers: [...el.querySelectorAll(".sz-session__speakers [data-speakerid]")].map((li) => ({
        id: li.dataset.speakerid,
        name: li.querySelector("a")?.textContent?.trim(),
      })),
      tags: [...el.querySelectorAll(".sz-tag")].map((t) => ({
        category: t.getAttribute("data-categoryname"),
        name: t.textContent?.trim(),
      })),
    }
  })
}

const SessionCard = ({ session }) => {
  const formatTag = (tag) => tag.name
  const levelTag = session.tags.find((t) => t.category === "level")
  const formatTagItem = session.tags.find((t) => t.category === "session_format")

  return (
    <div className="card mb-4">
      <div className="card-content">
        <h3 className="title is-5 mb-2">{session.title}</h3>

        {session.speakers && session.speakers.length > 0 && (
          <p className="has-text-grey mb-2">
            <strong>Speaker{session.speakers.length > 1 ? "s" : ""}:</strong>{" "}
            {session.speakers.map((s) => s.name).join(", ")}
          </p>
        )}

        {session.timeDisplay && (
          <p className="has-text-primary mb-2">
            <strong>{session.timeDisplay}</strong>
          </p>
        )}

        {session.description && (
          <div className="content is-small mb-3">
            <p>{session.description}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {levelTag && (
            <span className="tag is-info is-light">{levelTag.name}</span>
          )}
          {formatTagItem && (
            <span className="tag is-primary is-light">{formatTagItem.name}</span>
          )}
          {session.tags
            .filter((t) => t.category !== "level" && t.category !== "session_format")
            .map((tag, i) => (
              <span key={i} className="tag is-light">{tag.name}</span>
            ))}
        </div>
      </div>
    </div>
  )
}

const SessionsPage = () => {
  const [sessions, setSessions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [activeRoom, setActiveRoom] = React.useState(null)

  React.useEffect(() => {
    fetch(`${SESSIONIZE_BASE}/Sessions?under=True`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((html) => {
        const parsed = parseSessions(html)
        setSessions(parsed)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const roomedSessions = sessions.filter((s) => s.room)
  const noRoomSessions = sessions.filter((s) => !s.room)

  const rooms = [...new Set(roomedSessions.map((s) => s.room))].sort()

  const sessionsByRoom = rooms.reduce((acc, room) => {
    acc[room] = roomedSessions
      .filter((s) => s.room === room)
      .sort((a, b) => {
        if (!a.startsAt && !b.startsAt) return 0
        if (!a.startsAt) return 1
        if (!b.startsAt) return -1
        return new Date(a.startsAt) - new Date(b.startsAt)
      })
    return acc
  }, {})

  React.useEffect(() => {
    if (rooms.length > 0 && activeRoom === null) {
      setActiveRoom(rooms[0])
    }
  }, [rooms.length])

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sessions</h1>
            <p className="subtitle is-3">KCD Toronto 2026 — May 13, 2026</p>
          </div>
        </div>
      </section>

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
                Loading sessions...
              </progress>
              <p className="mt-3 has-text-grey">Loading sessions...</p>
            </div>
          )}

          {error && (
            <div className="notification is-danger is-light">
              <p>
                <strong>Unable to load sessions.</strong> Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length === 0 && (
            <div className="notification is-info is-light">
              <p className="has-text-centered">
                <strong>Sessions will be announced soon!</strong> Check back closer to the event.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && (
            <>
              {rooms.length > 0 && (
                <>
                  <div className="tabs is-medium is-boxed mb-5">
                    <ul>
                      {rooms.map((room) => (
                        <li key={room} className={activeRoom === room ? "is-active" : ""}>
                          <a onClick={() => setActiveRoom(room)} style={{ cursor: "pointer" }}>
                            {room}
                          </a>
                        </li>
                      ))}
                      {noRoomSessions.length > 0 && (
                        <li className={activeRoom === "__none__" ? "is-active" : ""}>
                          <a onClick={() => setActiveRoom("__none__")} style={{ cursor: "pointer" }}>
                            General / Service
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>

                  {rooms.map((room) => (
                    <div key={room} style={{ display: activeRoom === room ? "block" : "none" }}>
                      <h2 className="title is-4 mb-4">{room}</h2>
                      {sessionsByRoom[room].map((session) => (
                        <SessionCard key={session.id} session={session} />
                      ))}
                    </div>
                  ))}

                  {noRoomSessions.length > 0 && (
                    <div style={{ display: activeRoom === "__none__" ? "block" : "none" }}>
                      <h2 className="title is-4 mb-4">General / Service Sessions</h2>
                      {noRoomSessions
                        .sort((a, b) => {
                          if (!a.startsAt && !b.startsAt) return 0
                          if (!a.startsAt) return 1
                          if (!b.startsAt) return -1
                          return new Date(a.startsAt) - new Date(b.startsAt)
                        })
                        .map((session) => (
                          <SessionCard key={session.id} session={session} />
                        ))}
                    </div>
                  )}
                </>
              )}

              {rooms.length === 0 && sessions.length > 0 && (
                <>
                  <h2 className="title is-3 mb-5">All Sessions</h2>
                  {sessions
                    .sort((a, b) => {
                      if (!a.startsAt && !b.startsAt) return 0
                      if (!a.startsAt) return 1
                      if (!b.startsAt) return -1
                      return new Date(a.startsAt) - new Date(b.startsAt)
                    })
                    .map((session) => (
                      <SessionCard key={session.id} session={session} />
                    ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default SessionsPage

export const Head = () => <title>Sessions - KCD Toronto 2026</title>
