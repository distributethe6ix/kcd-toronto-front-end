import * as React from "react"
import Layout from "../components/layout"

const CFPPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Call for Proposals</h1>
            <p className="subtitle is-3">Share your cloud native expertise at KCD Toronto 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="box has-background-info-light mb-5">
                <h2 className="title is-3">We want to hear from you!</h2>
                <div className="content">
                  <p className="is-size-5">
                    Whether you're a Kubernetes expert, a cloud native practitioner, or have an interesting
                    story about your cloud native journey, we want to hear from you. KCD Toronto 2026 is
                    looking for speakers to share their knowledge and experiences with the community.
                  </p>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4">Topics We're Looking For</h3>
                <div className="content">
                  <ul>
                    <li><strong>Kubernetes and Container Orchestration</strong> - Best practices, advanced features, troubleshooting</li>
                    <li><strong>Cloud Native Architecture</strong> - Design patterns, microservices, distributed systems</li>
                    <li><strong>Service Mesh & Observability</strong> - Istio, Linkerd, monitoring, tracing, logging</li>
                    <li><strong>CI/CD and GitOps</strong> - Automation, deployment strategies, tools and workflows</li>
                    <li><strong>Platform Engineering</strong> - Developer experience, internal platforms, self-service</li>
                    <li><strong>Security & Compliance</strong> - Security best practices, policy enforcement, compliance</li>
                    <li><strong>Case Studies</strong> - Real-world implementations, lessons learned, success stories</li>
                  </ul>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4">Session Formats</h3>
                <div className="content">
                  <ul>
                    <li><strong>Standard Talk</strong> - 30 minutes presentation + 5 minutes Q&A</li>
                    <li><strong>Lightning Talk</strong> - 10 minutes presentation</li>
                    <li><strong>Workshop</strong> - 90 minutes hands-on session (limited availability)</li>
                  </ul>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4">Speaker Benefits</h3>
                <div className="content">
                  <ul>
                    <li>Free conference ticket</li>
                    <li>Promotion across our social media channels</li>
                    <li>Speaker swag</li>
                    <li>Recorded session (published on YouTube)</li>
                    <li>Networking opportunities with the cloud native community</li>
                  </ul>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4">Important Dates</h3>
                <div className="content">
                  <ul>
                    <li><strong>CFP Opens:</strong> TBA</li>
                    <li><strong>CFP Closes:</strong> TBA</li>
                    <li><strong>Speaker Notifications:</strong> TBA</li>
                    <li><strong>Event Date:</strong> May 13th, 2026</li>
                  </ul>
                  <p className="has-text-grey-light is-size-7 mt-3">
                    <em>Note: Dates will be updated once CFP timeline is confirmed</em>
                  </p>
                </div>
              </div>

              {/* Sessionize CFP Form Embed */}
              <div className="box has-background-primary-light">
                <h2 className="title is-3 has-text-centered mb-5">Submit Your Proposal</h2>
                <div className="content">
                  <div style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    borderRadius: "6px"
                  }}>
                    <iframe
                      src="https://sessionize.com/kcd-toronto-2026"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none"
                      }}
                      title="KCD Toronto 2026 Call for Proposals"
                    />
                  </div>
                  <p className="has-text-centered mt-4">
                    <a
                      href="https://sessionize.com/kcd-toronto-2026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button is-primary"
                    >
                      Open in New Window
                    </a>
                  </p>
                </div>
              </div>

              <div className="box has-background-light mt-5">
                <h3 className="title is-5">Questions about the CFP?</h3>
                <p>
                  If you have any questions about submitting a proposal or speaking at KCD Toronto,
                  please reach out to us at <a href="mailto:speakers@kcdtoronto.ca">speakers@kcdtoronto.ca</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CFPPage

export const Head = () => <title>Call for Proposals - KCD Toronto 2026</title>
