import * as React from "react"
import Layout from "../components/layout"

const CFPPage = () => {
  return (
    <Layout>
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">Call for Speakers</h1>
            <p className="subtitle is-3">Join Toronto's largest CNCF-supported Kubernetes event</p>
            <p className="subtitle is-5">May 13, 2026 • The Quay, Toronto</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="box has-background-info-light mb-5">
                <h2 className="title is-3 has-text-centered">We Want to Hear From You!</h2>
                <div className="content">
                  <p className="is-size-5 has-text-centered">
                    Kubernetes Community Days Toronto will gather over <strong>350 developers, platform engineers,
                    architects, leaders and IT professionals</strong> for a full day dedicated to cloud-native
                    technology and open source innovation.
                  </p>
                  <p className="is-size-5 has-text-centered mt-4">
                    With <strong>25+ speakers and 20+ sessions</strong>, we're creating a vendor-neutral,
                    learning-focused environment where the community shares real-world experiences.
                  </p>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4 has-text-centered">What We're Looking For</h3>
                <div className="content">
                  <p className="has-text-centered mb-4">
                    We seek <strong>practical, real lessons — not product pitches</strong>. Share your successes,
                    failures, and everything you learned along the way.
                  </p>
                  <div className="columns is-multiline">
                    <div className="column is-6">
                      <ul>
                        <li><strong>Platform Engineering</strong> - Internal platforms, developer experience</li>
                        <li><strong>Kubernetes Operations</strong> - Scaling, troubleshooting, best practices</li>
                        <li><strong>AI/ML/MLOps</strong> - Machine learning on cloud native infrastructure</li>
                        <li><strong>Application Development</strong> - Cloud native patterns and practices</li>
                        <li><strong>Security</strong> - Zero trust, policy enforcement, compliance</li>
                        <li><strong>Networking</strong> - Service mesh, ingress, network policies</li>
                      </ul>
                    </div>
                    <div className="column is-6">
                      <ul>
                        <li><strong>Observability</strong> - Monitoring, logging, tracing</li>
                        <li><strong>Data & Storage</strong> - Stateful workloads, databases</li>
                        <li><strong>Community Experiences</strong> - Building cloud native communities</li>
                        <li><strong>Beginner Foundations</strong> - Getting started with Kubernetes</li>
                        <li><strong>Diversity Initiatives</strong> - Inclusive cloud native communities</li>
                        <li><strong>Emerging Technologies</strong> - WebAssembly, eBPF, and more</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4 has-text-centered">Session Formats</h3>
                <div className="content">
                  <div className="columns">
                    <div className="column is-4">
                      <div className="has-text-centered">
                        <p className="title is-5">⚡ Lightning Demos</p>
                        <p className="subtitle is-6">10 minutes</p>
                        <p>Quick technical walkthroughs showcasing concepts or emerging tech</p>
                      </div>
                    </div>
                    <div className="column is-4">
                      <div className="has-text-centered">
                        <p className="title is-5">💡 Standard Talks</p>
                        <p className="subtitle is-6">25 minutes</p>
                        <p>Case studies, best practices, architectural patterns, and lessons learned</p>
                      </div>
                    </div>
                    <div className="column is-4">
                      <div className="has-text-centered">
                        <p className="title is-5">🛠️ Workshops</p>
                        <p className="subtitle is-6">50 minutes</p>
                        <p>Hands-on sessions where attendees build or practice tangible skills</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box mb-5 has-background-light">
                <h3 className="title is-4 has-text-centered">Why Speak at KCD Toronto?</h3>
                <div className="content">
                  <div className="columns">
                    <div className="column is-4 has-text-centered">
                      <p className="title is-1 has-text-primary">🎟️</p>
                      <p className="mt-3"><strong>Free Event Access</strong></p>
                      <p>Complimentary admission for all speakers</p>
                    </div>
                    <div className="column is-4 has-text-centered">
                      <p className="title is-1 has-text-primary">👥</p>
                      <p className="mt-3"><strong>Community Platform</strong></p>
                      <p>Share knowledge in a vendor-neutral, learning-focused environment</p>
                    </div>
                    <div className="column is-4 has-text-centered">
                      <p className="title is-1 has-text-primary">📹</p>
                      <p className="mt-3"><strong>Recorded Sessions</strong></p>
                      <p>Your talk published on YouTube for the community</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box mb-5">
                <h3 className="title is-4 has-text-centered">Important Dates</h3>
                <div className="content">
                  <div className="columns has-text-centered">
                    <div className="column is-4">
                      <p className="title is-6">CFP Opens</p>
                      <p className="subtitle is-5">December 29, 2025</p>
                      <p className="has-text-grey">9:00 PM EST</p>
                    </div>
                    <div className="column is-4">
                      <p className="title is-6">CFP Closes</p>
                      <p className="subtitle is-5">February 16, 2026</p>
                      <p className="has-text-grey">11:59 PM EST</p>
                    </div>
                    <div className="column is-4">
                      <p className="title is-6">Event Date</p>
                      <p className="subtitle is-5">May 13, 2026</p>
                      <p className="has-text-grey">The Quay, Toronto</p>
                    </div>
                  </div>
                  <div className="notification is-success is-light has-text-centered mt-4">
                    <strong>CFP is now open!</strong> Submit your proposal before February 16, 2026
                  </div>
                </div>
              </div>

              {/* Sessionize CFP Form Link */}
              <div className="box has-background-primary-light">
                <h2 className="title is-2 has-text-centered mb-4">Ready to Share Your Story?</h2>
                <div className="content has-text-centered">
                  <p className="is-size-5 mb-5">
                    Join 25+ speakers in sharing practical, real-world cloud native experiences with Toronto's community.
                  </p>
                  <a
                    href="https://sessionize.com/kcd-toronto-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-primary is-large"
                  >
                    <strong>Submit Your Proposal Now</strong>
                  </a>
                  <p className="mt-4 has-text-grey">
                    <small>Submissions managed through Sessionize • Closes February 16, 2026</small>
                  </p>
                </div>
              </div>

              <div className="box has-background-light mt-5">
                <h3 className="title is-5 has-text-centered">Need Help or Have Questions?</h3>
                <p className="has-text-centered">
                  We're here to help! Reach out to our speaker team at{" "}
                  <a href="mailto:speakers@kcdtoronto.ca"><strong>speakers@kcdtoronto.ca</strong></a>
                </p>
                <p className="has-text-centered mt-3 has-text-grey">
                  <small>
                    Remember: We're looking for clear learning outcomes, technical depth, and real experiences —
                    both successes and failures.
                  </small>
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
