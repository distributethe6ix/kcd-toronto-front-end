import * as React from "react"
import Layout from "../components/layout"

const SpeakersPage = () => {
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
          <div className="box has-background-info-light">
            <h2 className="title is-3 has-text-centered">Call for Proposals</h2>
            <p className="subtitle has-text-centered">We're looking for speakers!</p>
            <div className="content">
              <p className="has-text-centered">
                Whether you're a Kubernetes expert, a cloud native practitioner, or have an interesting story about
                your cloud native journey, we want to hear from you.
              </p>
              <p className="has-text-centered"><strong>Topics we're interested in include:</strong></p>
              <div className="columns">
                <div className="column is-6 is-offset-3">
                  <ul>
                    <li>Kubernetes and container orchestration</li>
                    <li>Cloud native architecture and patterns</li>
                    <li>Service mesh, observability, and monitoring</li>
                    <li>CI/CD and GitOps</li>
                    <li>Platform engineering and developer experience</li>
                    <li>Security and compliance</li>
                    <li>Case studies and real-world implementations</li>
                  </ul>
                </div>
              </div>
              <div className="has-text-centered mt-5">
                <button className="button is-light is-large" disabled>
                  <strong>CFP Closed!</strong>
                </button>
              </div>
            </div>
          </div>

          {/* Keynote Speaker */}
          <h2 className="title is-2 mt-6 mb-5 has-text-centered">Keynote Speaker</h2>
          <div className="columns is-centered mb-6">
            <div className="column is-4">
              <div className="card">
                <div className="card-content has-text-centered">
                  <div className="mb-4">
                    <figure className="image" style={{ width: "120px", height: "120px", margin: "0 auto" }}>
                      <img
                        src="/speakers/keynote/marylia.png"
                        alt="Marylia Gutierrez"
                        style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <p className="title is-4">Marylia Gutierrez</p>
                  <p className="subtitle is-6">Keynote Speaker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Speakers */}
          <h2 className="title is-2 mb-5 has-text-centered">Featured Speakers</h2>
          <p className="has-text-centered mb-6">More speaker announcements coming soon!</p>
          <div className="columns is-multiline">
            {[1, 2, 3].map((i) => (
              <div key={i} className="column is-4">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <div className="mb-4">
                      <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#326ce5",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        color: "white"
                      }}>
                        ?
                      </div>
                    </div>
                    <p className="title is-4">TBD</p>
                    <p className="subtitle is-6">Speaker</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SpeakersPage

export const Head = () => <title>Speakers - KCD Toronto 2026</title>
