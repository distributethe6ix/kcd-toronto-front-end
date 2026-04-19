import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SharedVenueInfo from "../components/sponsor-portal/SharedVenueInfo"
import SharedGraphics from "../components/sponsor-portal/SharedGraphics"
import SponsorSpecificContent from "../components/sponsor-portal/SponsorSpecificContent"
import sponsorData from "../data/sponsors.json"

const matchSponsorByDomain = (email) => {
  if (!email) return null
  const domain = email.split("@")[1]?.toLowerCase()
  if (!domain) return null
  return sponsorData.sponsors.find(
    (s) => s.domain && s.domain.toLowerCase() === domain
  ) || null
}

const SponsorPortal = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // Admin preview mode: ?admin_preview=rbc shows that sponsor's portal view
  const adminPreviewId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("admin_preview")
      : null

  React.useEffect(() => {
    const netlifyIdentity = require("netlify-identity-widget")
    netlifyIdentity.init()

    const currentUser = netlifyIdentity.currentUser()
    if (currentUser) setUser(currentUser)
    setLoading(false)

    const onLogin = (u) => { setUser(u); netlifyIdentity.close() }
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

  const isAdmin = user?.app_metadata?.roles?.includes("admin")

  // Admin preview: look up the sponsor by ID from sponsors.json
  const previewSponsor = adminPreviewId
    ? sponsorData.sponsors.find((s) => s.id === adminPreviewId)
    : null

  // Normal flow: match by email domain + merge with app_metadata
  const domainSponsor = matchSponsorByDomain(user?.email)
  const appMeta = user?.app_metadata || {}

  const sponsor = (() => {
    if (isAdmin && previewSponsor) {
      // Admin preview mode: show sponsor's domain-matched data (app_metadata pending until set)
      return {
        name: previewSponsor.name,
        tier: previewSponsor.tier,
        discount_code: null,
        discount_percent: null,
        ticket_codes: null,
        logo_url: null,
        agreement_pdf: null,
      }
    }
    if (domainSponsor) {
      return {
        name: appMeta.sponsor_name || domainSponsor.name,
        tier: appMeta.sponsor_tier || domainSponsor.tier,
        discount_code: appMeta.discount_code,
        discount_percent: appMeta.discount_percent,
        ticket_codes: appMeta.ticket_codes,
        logo_url: appMeta.logo_url,
        agreement_pdf: appMeta.agreement_pdf,
      }
    }
    return null
  })()

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
      {/* Admin preview banner */}
      {isAdmin && previewSponsor && (
        <div className="notification is-dark mb-0" style={{ borderRadius: 0, margin: 0 }}>
          <div className="container is-flex is-align-items-center is-justify-content-space-between">
            <span>
              <strong>Admin Preview</strong> — viewing as <strong>{previewSponsor.name}</strong>.
              Sensitive data (discount codes, ticket codes) will show as pending until set via the admin page.
            </span>
            <Link to="/sponsor-admin" className="button is-light is-small ml-4">
              ← Back to Admin
            </Link>
          </div>
        </div>
      )}

      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sponsor Portal</h1>
            <p className="subtitle is-3">
              Welcome{sponsor ? `, ${sponsor.name}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!(isAdmin && previewSponsor) && (
            <div className="has-text-right mb-4">
              <span className="mr-3 has-text-grey">{user.email}</span>
              <button className="button is-light" onClick={handleLogout}>Log Out</button>
            </div>
          )}

          <SharedVenueInfo data={sponsorData.shared} />
          <SharedGraphics data={sponsorData.shared} />

          {sponsor ? (
            <SponsorSpecificContent sponsor={sponsor} />
          ) : (
            <div className="notification is-warning">
              <p>
                <strong>Your email domain is not linked to a sponsor account.</strong>
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
