import * as React from "react"

const SESSIONIZE_BASE = "https://sessionize.com/api/v2/9ddjd9rc/view"

const parseSpeakerWall = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-speakerid]")]
    .map((el) => ({
      id: el.dataset.speakerid,
      name: el.querySelector(".sz-speaker__name")?.textContent?.trim(),
      photo: el.querySelector(".sz-speaker__photo img")?.getAttribute("src"),
    }))
    .filter((s) => s.name)
}

const SpeakerWallReel = () => {
  const [speakers, setSpeakers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    fetch(`${SESSIONIZE_BASE}/SpeakerWall?under=True`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((html) => {
        const parsed = parseSpeakerWall(html)
        setSpeakers(parsed)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <progress className="progress is-primary" max="100" style={{ maxWidth: "400px", margin: "0 auto" }}>
        Loading speakers...
      </progress>
    )
  }

  if (error || speakers.length === 0) {
    return null
  }

  const doubled = [...speakers, ...speakers]
  const animDuration = `${Math.max(30, speakers.length * 2.5)}s`

  return (
    <>
      <style>{`
        @keyframes speakerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .speaker-reel-track {
          display: flex;
          animation: speakerScroll ${animDuration} linear infinite;
          width: max-content;
        }
        .speaker-reel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="speaker-reel-track">
          {doubled.map((speaker, i) => (
            <a
              key={`${speaker.id}-${i}`}
              href="/speakers"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "130px",
                padding: "0 0.75rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {speaker.photo ? (
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #326ce5",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#326ce5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  {speaker.name.charAt(0)}
                </div>
              )}
              <span
                className="is-size-7 has-text-centered mt-2"
                style={{
                  maxWidth: "120px",
                  lineHeight: "1.2",
                  fontWeight: "500",
                }}
              >
                {speaker.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default SpeakerWallReel
