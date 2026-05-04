import * as React from "react"
import Layout from "../components/layout"

const logoBoxStyle = {
  padding: '2rem',
  backgroundColor: 'white',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const logoImgStyle = {
  maxHeight: '80px',
  maxWidth: '180px',
  width: 'auto',
  objectFit: 'contain',
}

const check = <span style={{ color: '#00c853', fontWeight: 'bold' }}>✓</span>
const dash = <span style={{ color: '#aaa' }}>—</span>

const SponsorsPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sponsors</h1>
            <p className="subtitle is-3">Support KCD Toronto 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Become a Sponsor CTA */}
          <div className="box has-background-info-light mb-6">
            <h2 className="title is-3 has-text-centered">Become a Sponsor</h2>
            <div className="content">
              <p className="has-text-centered is-size-5">
                KCD Toronto 2026 is made possible by the generous support of our sponsors. By sponsoring KCD Toronto,
                you'll connect with the Canadian cloud native community and showcase your commitment to open source innovation.
              </p>
              <div className="has-text-centered mt-5">
                <div className="buttons is-centered">
                  <a
                    href="/KCD Toronto 2026 Sponsor Prospectus v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-primary is-large"
                  >
                    <strong>Download Sponsorship Prospectus (PDF)</strong>
                  </a>
                  <a href="mailto:toronto-org@kubernetescommunitydays.org" className="button is-outlined is-primary is-large">
                    <strong>Contact Us</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Why Sponsor? */}
          <h2 className="title is-2 mt-6 mb-5">Why Sponsor?</h2>
          <div className="columns is-multiline mb-6">
            <div className="column is-6">
              <div className="box">
                <h3 className="title is-4">Brand Visibility</h3>
                <p>Get your brand in front of hundreds of cloud native professionals</p>
              </div>
            </div>
            <div className="column is-6">
              <div className="box">
                <h3 className="title is-4">Community Engagement</h3>
                <p>Connect directly with developers, architects, and decision-makers</p>
              </div>
            </div>
            <div className="column is-6">
              <div className="box">
                <h3 className="title is-4">Talent Acquisition</h3>
                <p>Meet potential candidates in the cloud native space</p>
              </div>
            </div>
            <div className="column is-6">
              <div className="box">
                <h3 className="title is-4">Thought Leadership</h3>
                <p>Position your company as a leader in cloud native technologies</p>
              </div>
            </div>
          </div>

          {/* Sponsorship Tiers Table */}
          <h2 className="title is-2 mt-6 mb-5 has-text-centered">Sponsorship Tiers</h2>
          <div className="table-container mb-6">
            <table className="table is-fullwidth is-bordered sponsor-tiers-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Spots</th>
                  <th>Booth</th>
                  <th>Tickets</th>
                  <th>Keynote</th>
                  <th>Guest Discount</th>
                  <th>Swag &amp; Branding</th>
                  <th>Website &amp; Video</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#326ce5' }}>💎 Diamond</strong></td>
                  <td>1 <span className="tag is-danger is-light ml-1">Filled</span></td>
                  <td>Exclusive</td>
                  <td>Custom</td>
                  <td>{check} Custom</td>
                  <td>{check}</td>
                  <td>{check}</td>
                  <td>{check} + Video</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#909090' }}>🏆 Platinum</strong></td>
                  <td>5 remaining</td>
                  <td>Extra Large</td>
                  <td>6</td>
                  <td>{check} 3-min keynote</td>
                  <td>30% off (10 tickets)</td>
                  <td>{check}</td>
                  <td>{check} + Video</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#b8860b' }}>🥇 Gold</strong></td>
                  <td>10</td>
                  <td>Large</td>
                  <td>4</td>
                  <td>Mention</td>
                  <td>30% off (10 tickets)</td>
                  <td>{check}</td>
                  <td>{check} + Video</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#707070' }}>🥈 Silver</strong></td>
                  <td>12</td>
                  <td>Medium</td>
                  <td>2</td>
                  <td>{dash}</td>
                  <td>30% off (4 tickets)</td>
                  <td>{check}</td>
                  <td>{check}</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#E91E63' }}>💜 Community</strong></td>
                  <td>Open</td>
                  <td>Zone presence</td>
                  <td>1</td>
                  <td>{dash}</td>
                  <td>{dash}</td>
                  <td>{dash}</td>
                  <td>{check}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interested in Sponsoring footer */}
          <div className="box mt-6">
            <h3 className="title is-4">Interested in Sponsoring?</h3>
            <p>
              Contact us to discuss custom opportunities including lunch sponsorship, coffee breaks, swag bags, and more.
            </p>
            <p className="mt-3">
              <strong>Email:</strong> <a href="mailto:toronto-org@kubernetescommunitydays.org">toronto-org@kubernetescommunitydays.org</a>
            </p>
          </div>

        </div>
      </section>

      {/* Our Sponsors Section */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-2 has-text-centered mb-6">Our Sponsors</h2>

          {/* Diamond */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">💎 Diamond / Committee Partner</h3>
            <div className="columns is-centered">
              <div className="column is-4 has-text-centered">
                <a href="https://www.rbc.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/RBC-logo.png" alt="RBC - Diamond/Committee Partner Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Platinum */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">🏆 Platinum Sponsors</h3>
            <div className="columns is-centered">
              <div className="column is-4 has-text-centered">
                <a href="https://clickhouse.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/Logo_Black_300dpi_FNL.png" alt="ClickHouse - Platinum Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Gold */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">🥇 Gold Sponsors</h3>
            <div className="columns is-centered">
              <div className="column is-4 has-text-centered">
                <a href="https://www.tigera.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/Tigera-logo-2026-black-text-vertical.png" alt="Tigera - Gold Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://goteleport.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/teleport-logo.svg" alt="Teleport - Gold Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Silver */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">🥈 Silver Sponsors</h3>
            <div className="columns is-multiline is-centered">
              <div className="column is-4 has-text-centered">
                <a href="https://tremolo.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/ts-logo-300w.png" alt="Tremolo Security - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://depot.dev" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/depot-logo-horizontal-on-light@3x.png" alt="Depot - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://komodor.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/komodor-logo-2024.svg" alt="Komodor - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://objectfirst.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/Object First Logo - Primary.png" alt="Object First - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://solo.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/solo.png" alt="Solo.io - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://edera.dev" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/690f9f5837bd1626bd388947_Edera Open Graph.png" alt="Edera - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://tridentconsulting.ca/" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/TC-Logo_Red-Variation-Final.png" alt="Trident Consulting - Silver Sponsor" style={logoImgStyle} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="mb-6">
            <h3 className="title is-4 has-text-centered mb-4">💜 Community Partners</h3>
            <div className="columns is-multiline is-centered">
              <div className="column is-4 has-text-centered">
                <a href="https://www.cncf.io" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/cncf-color.png" alt="CNCF - Community Partner" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://exampro.co" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/exampro.png" alt="ExamPro - Community Partner" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://sadservers.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/sadservers.png" alt="SadServers - Community Partner" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://devopsto.com" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/devopsto-logo.png" alt="DevOps Toronto - Community Partner" style={logoImgStyle} />
                  </div>
                </a>
              </div>
              <div className="column is-4 has-text-centered">
                <a href="https://devopsdays.org/events/2026-raleigh/welcome/" target="_blank" rel="noopener noreferrer" className="sponsor-logo-link">
                  <div className="box" style={logoBoxStyle}>
                    <img src="/sponsors/devopsdays-raleigh-logo.png" alt="DevOpsDays Raleigh - Community Partner" style={logoImgStyle} />
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  )
}

export default SponsorsPage

export const Head = () => <title>Sponsors - KCD Toronto 2026</title>
