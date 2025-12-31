import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const VenuePage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Venue</h1>
            <p className="subtitle is-3">Getting to KCD Toronto</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-primary-light">
            <h2 className="title is-3 has-text-centered">The Quay - Toronto Region Board of Trade</h2>
            <p className="has-text-centered is-size-5 mb-4">
              <strong>100 Queens Quay E, Toronto, ON</strong>
            </p>
            <p className="has-text-centered mb-5">
              Join us on <strong>May 13, 2026</strong> at The Quay, a modern waterfront venue located in the heart of downtown Toronto
              with stunning views of Lake Ontario and excellent transit access.
            </p>

            {/* Venue Photo from Homepage */}
            <div className="photo-gallery-item mb-2">
              <StaticImage
                src="../images/homepage/IMG_7170.JPG"
                alt="The Quay Toronto Waterfront"
                placeholder="blurred"
              />
            </div>

            {/* Quay Venue Photos Gallery */}
            <h3 className="title is-4 has-text-centered mb-4 mt-5">Venue Spaces</h3>
            <div className="columns is-multiline">
              <div className="column is-6">
                <div className="photo-gallery-item">
                  <StaticImage
                    src="../images/venue/Gala-hall-v1.jpg"
                    alt="Gala Hall - Main Event Space"
                    placeholder="blurred"
                  />
                </div>
                <p className="has-text-centered mt-2 has-text-weight-semibold">Gala Hall - Main Event Space</p>
              </div>
              <div className="column is-6">
                <div className="photo-gallery-item">
                  <StaticImage
                    src="../images/venue/Gala-Lounge.jpg"
                    alt="Gala Lounge - Networking Area"
                    placeholder="blurred"
                  />
                </div>
                <p className="has-text-centered mt-2 has-text-weight-semibold">Gala Lounge - Networking Area</p>
              </div>
              <div className="column is-4">
                <div className="photo-gallery-item">
                  <StaticImage
                    src="../images/venue/Entrance.jpg"
                    alt="Venue Entrance"
                    placeholder="blurred"
                  />
                </div>
                <p className="has-text-centered mt-2 has-text-weight-semibold">Entrance</p>
              </div>
              <div className="column is-4">
                <div className="photo-gallery-item">
                  <StaticImage
                    src="../images/venue/Boardroom.jpg"
                    alt="Boardroom"
                    placeholder="blurred"
                  />
                </div>
                <p className="has-text-centered mt-2 has-text-weight-semibold">Boardroom</p>
              </div>
              <div className="column is-4">
                <div className="photo-gallery-item">
                  <StaticImage
                    src="../images/venue/Workshops1.jpg"
                    alt="Workshop Space"
                    placeholder="blurred"
                  />
                </div>
                <p className="has-text-centered mt-2 has-text-weight-semibold">Workshop Space</p>
              </div>
            </div>
          </div>

          <div className="content is-medium mt-6">
            <h2 className="title is-2">Getting to Toronto</h2>

            <div className="columns is-multiline">
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">By Air</h3>
                  <p>
                    <strong>Toronto Pearson International Airport (YYZ)</strong> serves the Greater Toronto Area
                    with connections worldwide. The UP Express train provides a direct link to downtown Toronto in 25 minutes.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">By Train</h3>
                  <p>
                    <strong>Union Station</strong> is Toronto's main railway station, served by VIA Rail and GO Transit
                    for regional connections.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Public Transit</h3>
                  <p>
                    Toronto has an extensive TTC system including subway, streetcar, and bus services.
                    A single ride costs $3.35 CAD.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">By Car</h3>
                  <p>
                    Parking in downtown Toronto can be limited and expensive. We recommend using public transit
                    or ride-sharing services.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="title is-2 mt-6">Explore Toronto</h2>
            <p>While you're in Toronto for KCD, take some time to explore Canada's largest city!</p>
            <ul>
              <li><strong>CN Tower:</strong> Iconic landmark with stunning city views</li>
              <li><strong>Ripley's Aquarium:</strong> World-class aquarium</li>
              <li><strong>St. Lawrence Market:</strong> Historic market with local food vendors</li>
              <li><strong>Distillery District:</strong> Pedestrian-only village with art galleries</li>
              <li><strong>Royal Ontario Museum:</strong> Canada's largest museum</li>
              <li><strong>Toronto Islands:</strong> Car-free islands with beaches and parks</li>
            </ul>
          </div>

          <div className="box has-background-light mt-6">
            <p>
              <strong>Questions about the venue or getting to Toronto?</strong> Contact us at{" "}
              <a href="mailto:toronto-org@kubernetescommunitydays.org">toronto-org@kubernetescommunitydays.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default VenuePage

export const Head = () => <title>Venue - KCD Toronto 2026</title>
