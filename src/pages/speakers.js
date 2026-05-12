import * as React from "react"
import Layout from "../components/layout"
import SpeakerModal from "../components/SpeakerModal"

const SESSIONIZE_BASE = "https://sessionize.com/api/v2/9ddjd9rc/view"

const parseSpeakers = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-speakerid]")]
    .filter((el) => el.querySelector(".sz-speaker__name"))
    .map((el) => ({
      id: el.dataset.speakerid,
      name: el.querySelector(".sz-speaker__name")?.textContent?.trim(),
      tagline: el.querySelector(".sz-speaker__tagline")?.textContent?.trim(),
      photo: el.querySelector(".sz-speaker__photo img")?.getAttribute("src"),
      bio: el.querySelector(".sz-speaker__bio")?.textContent?.trim(),
      links: [...el.querySelectorAll(".sz-speaker__link")]
        .map((a) => ({
          url: a.getAttribute("href"),
          label: a.querySelector(".sz-speaker__link-label")?.textContent?.trim(),
          type: [...a.classList]
            .find((c) => c.startsWith("sz-speaker__link--"))
            ?.replace("sz-speaker__link--", ""),
        }))
        .filter((l) => l.url && l.url !== "#"),
      sessions: [...el.querySelectorAll(".sz-speaker__sessions a")]
        .map((a) => ({ title: a.textContent?.trim(), url: a.getAttribute("href") }))
        .filter((s) => s.title),
    }))
}

const SpeakersPage = () => {
  const [speakers, setSpeakers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null)

  React.useEffect(() => {
    fetch(`${SESSIONIZE_BASE}/Speakers?under=True`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((html) => {
        const parsed = parseSpeakers(html)
        setSpeakers(parsed)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Speakers</h1>
            <p className="subtitle is-3">Meet our amazing speakers</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Keynote Speakers - pinned, always visible */}
          <div className="mb-6">
            <h2 className="title is-2 has-text-centered mb-5">Keynote Speakers</h2>
            <div className="columns is-centered">
              <div className="column is-4">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <figure className="image" style={{ width: "120px", height: "120px", margin: "0 auto 1rem" }}>
                      <img
                        src="/speakers/keynote/marylia.png"
                        alt="Marylia Gutierrez"
                        style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #326ce5" }}
                      />
                    </figure>
                    <p className="title is-4">Marylia Gutierrez</p>
                    <p className="subtitle is-6">Keynote Speaker</p>
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <figure className="image" style={{ width: "120px", height: "120px", margin: "0 auto 1rem" }}>
                      <img
                        src="/speakers/keynote/Ernani Cecon Headshot-1.jpg"
                        alt="Ernani Cecon"
                        style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #326ce5" }}
                      />
                    </figure>
                    <p className="title is-4">Ernani Cecon</p>
                    <p className="subtitle is-6">Diamond Keynote · RBC</p>
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <figure className="image" style={{ width: "120px", height: "120px", margin: "0 auto 1rem" }}>
                      <img
                        src="/speakers/keynote/doneyli.jpg"
                        alt="Doneyli De Jesus"
                        style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #326ce5" }}
                      />
                    </figure>
                    <p className="title is-4">Doneyli De Jesus</p>
                    <p className="subtitle is-6">Sponsored Keynote</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="title is-2 has-text-centered mb-5">Featured Speakers</h2>

          {loading && (
            <div className="has-text-centered py-6">
              <progress className="progress is-primary" max="100" style={{ maxWidth: "400px", margin: "0 auto" }}>
                Loading speakers...
              </progress>
              <p className="mt-3 has-text-grey">Loading speakers...</p>
            </div>
          )}

          {error && (
            <div className="notification is-danger is-light">
              <p>
                <strong>Unable to load speakers.</strong> Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && speakers.length === 0 && (
            <div className="notification is-info is-light">
              <p className="has-text-centered">
                <strong>Speaker announcements coming soon!</strong> Check back for updates.
              </p>
            </div>
          )}

          {!loading && !error && speakers.length > 0 && (
            <>
              <div className="columns is-multiline">
                {speakers.map((speaker) => (
                  <div key={speaker.id} className="column is-4">
                    <div
                      className="card"
                      style={{ cursor: "pointer", height: "100%" }}
                      onClick={() => setSelectedSpeaker(speaker)}
                    >
                      <div className="card-content has-text-centered">
                        <div className="mb-4">
                          {speaker.photo ? (
                            <figure className="image" style={{ width: "120px", height: "120px", margin: "0 auto" }}>
                              <img
                                src={speaker.photo}
                                alt={speaker.name}
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  border: "3px solid #326ce5",
                                }}
                              />
                            </figure>
                          ) : (
                            <div
                              style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                backgroundColor: "#326ce5",
                                margin: "0 auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "3rem",
                                color: "white",
                              }}
                            >
                              {speaker.name ? speaker.name.charAt(0) : "?"}
                            </div>
                          )}
                        </div>
                        <p className="title is-5 mb-1">{speaker.name}</p>
                        {speaker.tagline && (
                          <p className="subtitle is-6 has-text-grey">{speaker.tagline}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </Layout>
  )
}

export default SpeakersPage

export const Head = () => <title>Speakers - KCD Toronto 2026</title>
