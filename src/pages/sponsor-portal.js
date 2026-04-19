import * as React from "react"
import Layout from "../components/layout"
import SharedVenueInfo from "../components/sponsor-portal/SharedVenueInfo"
import SharedGraphics from "../components/sponsor-portal/SharedGraphics"
import SponsorSpecificContent from "../components/sponsor-portal/SponsorSpecificContent"
import sponsorData from "../data/sponsors.json"

const SponsorPortal = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.init()

    const currentUser = netlifyIdentity.currentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)

    const onLogin = (loggedInUser) => {
      setUser(loggedInUser)
      netlifyIdentity.close()
    }

    const onLogout = () => setUser(null)

    netlifyIdentity.on("login", onLogin)
    netlifyIdentity.on("logout", onLogout)

    return () => {
      netlifyIdentity.off("login", onLogin)
      netlifyIdentity.off("logout", onLogout)
    }
  }, [])

  const handleLogin = () => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.open("login")
  }

  const handleLogout = () => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.logout()
  }

  // Sponsor-specific data comes from app_metadata set via Netlify Identity admin API.
  // Nothing sensitive lives in the repo.
  const appMeta = user?.app_metadata || {}
  const sponsorName = appMeta.sponsor_name
  const isValidSponsor = !!sponsorName

  if (loading) {
    return (
      <Layout>
        <section className="section">
          <div className="container has-text-centered">
            <p className="is-size-4">Loading...</p>
          </div>
        </section>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Sponsor Portal</h1>
              <p className="subtitle is-3">Access your sponsor resources</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="box has-text-centered" style={{ maxWidth: 500, margin: "0 auto" }}>
              <h2 className="title is-4">Sponsor Login</h2>
              <p className="mb-4">
                Log in with your sponsor email to access venue details, load-in information, contacts, and downloadable materials.
              </p>
              <button className="button is-primary is-large" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sponsor Portal</h1>
            <p className="subtitle is-3">
              Welcome{sponsorName ? `, ${sponsorName}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="has-text-right mb-4">
            <span className="mr-3 has-text-grey">{user.email}</span>
            <button className="button is-light" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <SharedVenueInfo data={sponsorData.shared} />
          <SharedGraphics data={sponsorData.shared} />

          {isValidSponsor ? (
            <SponsorSpecificContent appMeta={appMeta} />
          ) : (
            <div className="notification is-warning">
              <p>
                <strong>Your account ({user.email}) is not linked to a sponsor profile.</strong>
              </p>
              <p>
                Please contact{" "}
                <a href="mailto:toronto-org@kubernetescommunitydays.org">
                  toronto-org@kubernetescommunitydays.org
                </a>{" "}
                if you believe this is an error.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default SponsorPortal

export const Head = () => <title>Sponsor Portal - KCD Toronto 2026</title>
