import * as React from "react"
import { Link } from "gatsby"
import "bulma/css/bulma.min.css"
import "./layout.css"

const Layout = ({ children }) => {
  const [isActive, setIsActive] = React.useState(false)

  return (
    <div className="site-wrapper">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img
                src="/toronto-cncf-kcd-wide.png"
                alt="KCD Toronto 2026"
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>

            <button
              className={`navbar-burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={isActive}
              onClick={() => setIsActive(!isActive)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
            <div className="navbar-end">
              <Link to="/about" className="navbar-item has-text-white has-text-weight-bold">
                About
              </Link>
              <Link to="/schedule" className="navbar-item has-text-white has-text-weight-bold">
                Schedule
              </Link>
              <Link to="/sessions" className="navbar-item has-text-white has-text-weight-bold">
                Sessions
              </Link>
              <Link to="/speakers" className="navbar-item has-text-white has-text-weight-bold">
                Speakers
              </Link>
              <Link to="/sponsors" className="navbar-item has-text-white has-text-weight-bold">
                Sponsors
              </Link>
              <Link to="/community" className="navbar-item has-text-white has-text-weight-bold">
                Community
              </Link>
              <Link to="/venue" className="navbar-item has-text-white has-text-weight-bold">
                Venue
              </Link>
              <Link to="/team" className="navbar-item has-text-white has-text-weight-bold">
                Team
              </Link>
              <Link to="/code-of-conduct" className="navbar-item has-text-white has-text-weight-bold">
                Code of Conduct
              </Link>
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-danger is-light" disabled>
                    <strong>Sold Out</strong>
                  </button>
                  <Link to="/sponsor-portal" className="button is-light is-outlined">
                    Sponsor Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main id="main-content">{children}</main>

      <footer className="footer has-background-primary has-text-white-ter">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <h4 className="title is-5 has-text-white">KCD Toronto 2026</h4>
              <p>
                Kubernetes Community Days Toronto is a community-organized event
                bringing together the cloud native community.
              </p>
            </div>
            <div className="column is-4">
              <h4 className="title is-5 has-text-white">Quick Links</h4>
              <ul>
                <li><Link to="/about" className="has-text-white-ter">About</Link></li>
                <li><Link to="/speakers" className="has-text-white-ter">Speakers</Link></li>
                <li><Link to="/sponsors" className="has-text-white-ter">Sponsors</Link></li>
                <li><Link to="/code-of-conduct" className="has-text-white-ter">Code of Conduct</Link></li>
                <li><Link to="/getting-here" className="has-text-white-ter">Getting Here</Link></li>
                <li><Link to="/sponsor-portal" className="has-text-white-ter">Sponsor Portal</Link></li>
              </ul>
            </div>
            <div className="column is-4">
              <h4 className="title is-5 has-text-white">Contact</h4>
              <p>
                Email: <a href="mailto:toronto-org@kubernetescommunitydays.org" className="has-text-white-ter">toronto-org@kubernetescommunitydays.org</a>
              </p>
              <h4 className="title is-5 has-text-white mt-4">Follow Us</h4>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <a
                  href="https://www.linkedin.com/company/kcdtoronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="has-text-white-ter"
                  style={{ fontSize: "1.5rem" }}
                  aria-label="Follow us on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ verticalAlign: "middle" }}
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  {" "}LinkedIn
                </a>
                <a
                  href="https://x.com/kcdtoronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="has-text-white-ter"
                  style={{ fontSize: "1.5rem" }}
                  aria-label="Follow us on Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ verticalAlign: "middle" }}
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  {" "}Twitter
                </a>
                <a
                  href="https://www.instagram.com/kcd_toronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="has-text-white-ter"
                  style={{ fontSize: "1.5rem" }}
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ verticalAlign: "middle" }}
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {" "}Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="content has-text-centered mt-5">
            <p className="has-text-white-ter">
              &copy; 2026 KCD Toronto. Part of the{" "}
              <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer" className="has-text-white">
                CNCF
              </a>{" "}
              Kubernetes Community Days program.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
