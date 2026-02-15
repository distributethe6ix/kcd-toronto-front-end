import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      {/* Hero Section with Banner */}
      <section className="hero is-primary is-medium hero-with-banner" style={{
        backgroundImage: "url('/IMG_7165.JPG')"
      }}>
        <div className="hero-body" style={{ position: 'relative', zIndex: 1 }}>
          <div className="container has-text-centered">
            <h1 className="title is-1 is-spaced">
              Kubernetes Community Days
              <br />
              Toronto 2026
            </h1>
            <p className="subtitle is-3">
              Join the cloud native community for a day of learning, networking, and collaboration
            </p>
            <div className="box mt-5" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <p className="is-size-4 has-text-dark">
                <strong>Date:</strong> May 13, 2026 | <strong>Location:</strong> The Quay, Toronto
              </p>
            </div>
            <div className="buttons is-centered mt-5">
              <a href="https://community.cncf.io/events/details/cncf-kcd-toronto-presents-kcd-toronto-2026/" target="_blank" rel="noopener noreferrer" className="button is-light is-large">
                <strong>Get Tickets Here!</strong>
              </a>
              <a href="/sponsors" className="button is-outlined is-light is-large">
                <strong>Become a Sponsor</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="section has-background-white" style={{ padding: '3rem 1.5rem' }}>
        <div className="container has-text-centered">
          <img
            src="/toronto-cncf-horizontal-transparent.png"
            alt="KCD Toronto Logo"
            style={{ maxWidth: '600px', width: '100%', height: 'auto' }}
          />
        </div>
      </section>

      {/* About Section with Photo */}
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-6">
              <h2 className="title is-2">About KCD Toronto</h2>
              <div className="content is-medium">
                <p>
                  Kubernetes Community Days (KCD) are community-organized events that gather adopters
                  and technologists from open source and cloud native communities for education,
                  collaboration, and networking. KCD Toronto 2026 will bring together the Canadian
                  cloud native community for an exciting day of talks, workshops, and networking
                  opportunities.
                </p>
              </div>
            </div>
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_1196.jpeg"
                  alt="CNCF Toronto Community"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">What to Expect</h2>
          <div className="columns is-multiline">
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Expert Talks</h3>
                    <p>
                      Technical talks from industry experts and practitioners sharing real-world experiences
                      and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Hands-on Workshops</h3>
                    <p>
                      Interactive workshops and tutorials where you can learn by doing with guidance from
                      experienced instructors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Networking</h3>
                    <p>
                      Connect with the cloud native community, meet potential employers, and build lasting
                      professional relationships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Cloud Native Technologies</h3>
                    <p>
                      Learn about Kubernetes, containers, service mesh, observability, and the latest
                      cloud native innovations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Local & International Speakers</h3>
                    <p>
                      Hear from both local practitioners and international experts in the cloud native
                      ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <h3 className="title is-4">Community Driven</h3>
                    <p>
                      Celebrate and contribute to open source projects that power modern cloud
                      infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Photos Section - Woven Design */}
      <section className="section">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-5">Our Community</h2>
          <p className="has-text-centered is-size-5 mb-6">
            The Toronto cloud native community comes together regularly at our CNCF meetups to share, learn, and grow together.
          </p>

          {/* First Row - 2 Photos */}
          <div className="columns mb-4">
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_0820.jpeg"
                  alt="Attendees networking and socializing at CNCF Toronto meetup"
                  placeholder="blurred"
                />
              </div>
            </div>
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_4087.jpeg"
                  alt="Community members engaged in discussion at CNCF Toronto event"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>

          {/* Second Row - 2 Photos with Text */}
          <div className="columns is-vcentered mb-4">
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_8439.jpeg"
                  alt="Speaker presenting to audience at CNCF Toronto meetup"
                  placeholder="blurred"
                />
              </div>
            </div>
            <div className="column is-6">
              <div className="content">
                <h3 className="title is-3">Building Together</h3>
                <p className="is-size-5">
                  From monthly meetups to annual conferences, our community is passionate about
                  cloud native technologies and helping each other grow.
                </p>
              </div>
            </div>
          </div>

          {/* Third Row - Text with 2 Photos */}
          <div className="columns is-vcentered mb-4">
            <div className="column is-6">
              <div className="content">
                <h3 className="title is-3">Learning & Sharing</h3>
                <p className="is-size-5">
                  Join developers, platform engineers, and cloud architects sharing real-world
                  experiences in vendor-neutral, community-driven sessions.
                </p>
              </div>
            </div>
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_9132.jpeg"
                  alt="Group photo of CNCF Toronto community members and organizers"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>

          {/* Fourth Row - 2 Photos */}
          <div className="columns">
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_9503.jpeg"
                  alt="Workshop session with participants collaborating on cloud native technologies"
                  placeholder="blurred"
                />
              </div>
            </div>
            <div className="column is-6">
              <div className="photo-gallery-item">
                <StaticImage
                  src="../images/homepage/IMG_9708.jpeg"
                  alt="Community members mingling and networking during CNCF Toronto event break"
                  placeholder="blurred"
                />
              </div>
            </div>
          </div>

          <div className="has-text-centered mt-6">
            <a href="/community" className="button is-primary is-medium">
              <strong>View More Photos</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Sponsors Showcase Section */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-5">Our Sponsors</h2>
          <p className="has-text-centered is-size-5 mb-6">
            Thank you to our sponsors for making KCD Toronto 2026 possible. Interested in sponsoring? View our prospectus for more details.
          </p>

          {/* Diamond/Committee Partner */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">Diamond / Committee Partner</h3>
            <div className="columns is-centered">
              <div className="column is-3 has-text-centered">
                <a href="https://www.rbc.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={{ padding: '2rem', backgroundColor: 'white', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/sponsors/RBC-logo.png" alt="RBC - Diamond/Committee Partner Sponsor" style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Silver Partners */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">Silver Partners</h3>
            <div className="columns is-centered">
              <div className="column is-3 has-text-centered">
                <a href="https://tremolo.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={{ padding: '2rem', backgroundColor: 'white', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/sponsors/ts-logo-300w.png" alt="Tremolo Security - Silver Partner" style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
                  </div>
                </a>
              </div>
              <div className="column is-3 has-text-centered">
                <a href="https://depot.dev" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={{ padding: '2rem', backgroundColor: 'white', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/sponsors/depot-logo-horizontal-on-light@3x.png" alt="Depot - Silver Partner" style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Community Partners */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">Community Partners</h3>
            <div className="columns is-centered">
              <div className="column is-3 has-text-centered">
                <a href="https://www.cncf.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={{ padding: '2rem', backgroundColor: 'white', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/sponsors/cncf-color.png" alt="CNCF - Community Partner" style={{ maxWidth: '200px', width: '100%', height: 'auto' }} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="has-text-centered mt-6">
            <a href="/sponsors" className="button is-primary is-large">
              <strong>View All Sponsors & Opportunities</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="register" className="section">
        <div className="container">
          <div className="box has-background-primary-light">
            <div className="columns is-vcentered">
              <div className="column is-8">
                <h3 className="title is-3">Ready to Join Us?</h3>
                <p className="subtitle is-5">
                  Be part of Toronto's premier cloud native community event. Register today to secure your spot!
                </p>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://community.cncf.io/events/details/cncf-kcd-toronto-presents-kcd-toronto-2026/" target="_blank" rel="noopener noreferrer" className="button is-primary is-large">
                  <strong>Get Tickets Here!</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>KCD Toronto 2026 - Kubernetes Community Days</title>
