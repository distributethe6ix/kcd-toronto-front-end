import * as React from "react"

const SpeakerModal = ({ speaker, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!speaker) return null

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ maxWidth: "640px", width: "90vw" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">{speaker.name}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-vcentered mb-4">
            {speaker.photo && (
              <div className="column is-narrow">
                <figure className="image" style={{ width: "120px", height: "120px" }}>
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #326ce5"
                    }}
                  />
                </figure>
              </div>
            )}
            <div className="column">
              <h3 className="title is-4 mb-1">{speaker.name}</h3>
              {speaker.tagline && (
                <p className="subtitle is-6 has-text-grey mb-2">{speaker.tagline}</p>
              )}
              {speaker.links && speaker.links.length > 0 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {speaker.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button is-small is-link is-light"
                    >
                      {link.label || link.type || "Link"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {speaker.bio && (
            <div className="content">
              <p>{speaker.bio}</p>
            </div>
          )}

          {speaker.sessions && speaker.sessions.length > 0 && (
            <div>
              <h4 className="title is-6 mb-2">Sessions</h4>
              <ul>
                {speaker.sessions.map((session, i) => (
                  <li key={i} className="is-size-6">{session}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  )
}

export default SpeakerModal
