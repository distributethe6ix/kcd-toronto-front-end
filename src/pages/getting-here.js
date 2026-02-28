import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const GettingHerePage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Getting Here</h1>
            <p className="subtitle is-3">How to reach KCD Toronto 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-primary-light mb-6">
            <h2 className="title is-4 has-text-centered">The Quay - Toronto Region Board of Trade</h2>
            <p className="has-text-centered is-size-5">
              <strong>100 Queens Quay E, Toronto, ON</strong>
            </p>
            <p className="has-text-centered mt-2">
              <Link to="/venue" className="has-text-primary">View venue details &amp; photos</Link>
            </p>
          </div>

          {/* Public Transit */}
          <h2 className="title is-2">By Public Transit (TTC)</h2>
          <div className="content is-medium mb-6">
            <div className="columns is-multiline">
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">From Union Station (Streetcar)</h3>
                  <p>The most direct route from downtown:</p>
                  <ol>
                    <li>Exit Union Station to the south (Front Street)</li>
                    <li>Walk south to Queens Quay</li>
                    <li>Take the <strong>509 Harbourfront</strong> or <strong>510 Spadina</strong> streetcar eastbound</li>
                    <li>Get off at <strong>Queens Quay East / Cooper St</strong></li>
                    <li>The venue is a short walk east at 100 Queens Quay E</li>
                  </ol>
                  <p className="mt-2"><strong>Estimated time:</strong> ~15 minutes from Union Station</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">From Union Subway Station (Walking)</h3>
                  <p>If you prefer to walk from Union Station:</p>
                  <ol>
                    <li>Exit Union Station and head south on Bay Street</li>
                    <li>Continue south past the Gardiner Expressway</li>
                    <li>Turn left (east) onto Queens Quay</li>
                    <li>Walk east along the waterfront to 100 Queens Quay E</li>
                  </ol>
                  <p className="mt-2"><strong>Estimated time:</strong> ~15-20 minute walk</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">From King Subway Station</h3>
                  <ol>
                    <li>Take the <strong>504 King</strong> streetcar eastbound or westbound to Bay Street</li>
                    <li>Walk south on Bay Street to Queens Quay (~10 min)</li>
                    <li>Turn left (east) to 100 Queens Quay E</li>
                  </ol>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">From Pearson Airport (YYZ)</h3>
                  <ol>
                    <li>Take the <strong>UP Express</strong> train to Union Station (~25 min)</li>
                    <li>Follow the Union Station directions above</li>
                  </ol>
                  <p className="mt-2"><strong>UP Express fare:</strong> $12.35 one-way / $24.70 return</p>
                </div>
              </div>
            </div>
            <div className="notification is-info is-light">
              <p><strong>TTC Fare:</strong> $3.35 CAD per ride. Use a PRESTO card or contactless payment (credit/debit tap) at fare readers.</p>
            </div>
          </div>

          {/* Driving & Parking */}
          <h2 className="title is-2">By Car &amp; Parking</h2>
          <div className="content is-medium mb-6">
            <p>If you're driving downtown, several parking options are available near the venue:</p>
            <div className="columns is-multiline">
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Green P - Queens Quay Terminal</h3>
                  <p>207 Queens Quay W</p>
                  <p><strong>Rate:</strong> ~$4-6/hr, daily max varies</p>
                  <p>Short walk along the waterfront to the venue.</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Impark - 10 Lower Jarvis St</h3>
                  <p>10 Lower Jarvis St</p>
                  <p><strong>Rate:</strong> ~$15-25/day</p>
                  <p>Very close to the venue, just steps away.</p>
                </div>
              </div>
            </div>
            <div className="notification is-warning is-light">
              <p><strong>Tip:</strong> Downtown Toronto parking can be expensive and lots fill up quickly. We recommend public transit or ride-sharing when possible.</p>
            </div>
          </div>

          {/* Hotels */}
          <h2 className="title is-2">Hotels Nearby</h2>
          <div className="content is-medium mb-6">
            <div className="notification is-info is-light">
              <p><strong>Hotel recommendations coming soon!</strong> We're working on securing group rates at nearby hotels. Check back for updates.</p>
            </div>
          </div>

          <div className="box has-background-light mt-6">
            <p>
              <strong>Need help getting to the venue?</strong> Contact us at{" "}
              <a href="mailto:toronto-org@kubernetescommunitydays.org">toronto-org@kubernetescommunitydays.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default GettingHerePage

export const Head = () => <title>Getting Here - KCD Toronto 2026</title>
