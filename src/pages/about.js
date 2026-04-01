import * as React from "react"
import Layout from "../components/layout"

const AboutPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">About KCD Toronto</h1>
            <p className="subtitle is-3">Learn about Kubernetes Community Days</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content is-medium">
            <h2 className="title is-2">What is Kubernetes Community Days?</h2>
            <p>
              Kubernetes Community Days (KCD) are community-organized events supported by the Cloud Native Computing Foundation (CNCF).
              These events bring together adopters and technologists from open source and cloud native communities to share knowledge,
              collaborate, and network.
            </p>
            <p>
              KCD events are designed to be accessible, community-driven, and focused on education and collaboration.
              They feature a mix of keynotes, technical talks, lightning talks, and workshops from local and international speakers.
            </p>

            <h2 className="title is-2 mt-6">KCD Toronto 2026</h2>
            <p>
              KCD Toronto 2026 will be Toronto's premier cloud native community event, bringing together developers, DevOps engineers,
              platform engineers, and technology enthusiasts from across Canada and beyond. Our mission is to foster learning,
              collaboration, and innovation within the Canadian cloud native community. This year's program includes talks on
              AI in cloud native, GPU workloads on Kubernetes, and the future of intelligent infrastructure.
            </p>

            <h2 className="title is-2 mt-6">Event Highlights</h2>
            <div className="columns is-multiline">
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Expert Speakers</h3>
                  <p>Learn from industry leaders and practitioners who are building cloud native solutions</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Technical Workshops</h3>
                  <p>Hands-on sessions covering Kubernetes, containers, service mesh, observability, and more</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Networking</h3>
                  <p>Connect with peers, potential employers, and the broader cloud native community</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Community Focus</h3>
                  <p>Celebrate and contribute to open source projects that power modern infrastructure</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">AI &amp; Cloud Native</h3>
                  <p>Explore the intersection of AI, machine learning, and cloud native infrastructure — including GPU workloads on Kubernetes</p>
                </div>
              </div>
            </div>

            <h2 className="title is-2 mt-6">Who Should Attend?</h2>
            <div className="content">
              <ul>
                <li>Platform Engineers and DevOps professionals</li>
                <li>Software Developers working with containers and Kubernetes</li>
                <li>Cloud Architects and Infrastructure Engineers</li>
                <li>Tech Leaders evaluating cloud native technologies</li>
                <li>AI/ML Engineers and data scientists working with cloud native infrastructure</li>
                <li>Students and newcomers interested in learning about cloud native</li>
                <li>Anyone passionate about open source and community-driven innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage

export const Head = () => <title>About - KCD Toronto 2026</title>
