import * as React from "react"

const CopyButton = ({ text }) => {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      className={`button is-small ${copied ? "is-success" : "is-light"}`}
      onClick={handleCopy}
      style={{ marginLeft: "0.5rem" }}
      aria-label={`Copy ${text}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

const Pending = ({ label }) => (
  <p className="has-text-grey">
    <em>
      {label} will appear here once your portal is fully set up. Contact{" "}
      <a href="mailto:toronto-org@kubernetescommunitydays.org">
        toronto-org@kubernetescommunitydays.org
      </a>{" "}
      if you have questions.
    </em>
  </p>
)

export const SponsorHeader = ({ sponsor }) => {
  const { id, name, tier, promo_url } = sponsor
  const tierLabel = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : null
  const logoSrc = id ? `/sponsors/${id}.png` : null
  const [logoError, setLogoError] = React.useState(false)

  return (
    <div className="box mb-5">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {logoSrc && !logoError && (
              <figure className="image mr-4" style={{ maxWidth: 120 }}>
                <img
                  src={logoSrc}
                  alt={`${name} logo`}
                  style={{ objectFit: "contain", maxHeight: 60 }}
                  onError={() => setLogoError(true)}
                />
              </figure>
            )}
            <div>
              <h2 className="title is-4 mb-1">{name}</h2>
              {tierLabel && (
                <span className="tag is-primary is-medium">{tierLabel} Sponsor</span>
              )}
            </div>
          </div>
        </div>
        {promo_url && (
          <div className="level-right">
            <div className="level-item">
              <a href={promo_url} download className="button is-primary is-outlined">
                <strong>Download Your Promo Image</strong>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const IncludedTicketCodes = ({ sponsor }) => {
  const { ticket_code, ticket_quantity } = sponsor
  return (
    <div className="box mb-5">
      <h2 className="title is-4">Included Ticket Code</h2>
      {ticket_code ? (
        <>
          <p className="mb-3">
            Your sponsorship includes{" "}
            <strong>
              {ticket_quantity || 1} complimentary ticket
              {(ticket_quantity || 1) !== 1 ? "s" : ""}
            </strong>
            . Use this code at checkout.
          </p>
          <div className="is-flex is-align-items-center">
            <div
              className="has-background-light px-5 py-3 is-flex is-align-items-center"
              style={{ borderRadius: 6, border: "2px dashed #23d160" }}
            >
              <span
                className="is-size-4 has-text-weight-bold has-text-success"
                style={{ letterSpacing: "0.1em" }}
              >
                {ticket_code}
              </span>
              <CopyButton text={ticket_code} />
            </div>
          </div>
          <p className="mt-3 is-size-7 has-text-grey">
            This code can be used up to {ticket_quantity || 1} time{(ticket_quantity || 1) !== 1 ? "s" : ""}. Contact us if you need replacements.
          </p>
        </>
      ) : (
        <Pending label="Your included ticket code" />
      )}
    </div>
  )
}

export const AdditionalTicketsDiscountCode = ({ sponsor }) => {
  const { discount_code, discount_percent } = sponsor
  return (
    <div className="box mb-5">
      <h2 className="title is-4">Additional Tickets Discount Code</h2>
      {discount_code ? (
        <>
          <p className="mb-3">
            Share this code with your team and network — it gives{" "}
            <strong>{discount_percent}% off</strong> additional ticket purchases
            for KCD Toronto 2026.
          </p>
          <div className="is-flex is-align-items-center">
            <div
              className="has-background-light px-5 py-3 is-flex is-align-items-center"
              style={{ borderRadius: 6, border: "2px dashed #326ce5" }}
            >
              <span
                className="is-size-4 has-text-weight-bold has-text-primary"
                style={{ letterSpacing: "0.1em" }}
              >
                {discount_code}
              </span>
              <CopyButton text={discount_code} />
            </div>
          </div>
          <p className="mt-3 is-size-7 has-text-grey">
            Tickets can be purchased at the KCD Toronto registration page.
          </p>
        </>
      ) : (
        <Pending label="Your additional tickets discount code" />
      )}
    </div>
  )
}

export const SponsorAgreement = ({ sponsor }) => {
  const { agreement_pdf } = sponsor
  return (
    <div className="box mb-5">
      <h2 className="title is-4">Signed Agreement</h2>
      {agreement_pdf ? (
        <a
          href={agreement_pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="button is-link"
        >
          View Agreement (PDF)
        </a>
      ) : (
        <Pending label="Your signed agreement" />
      )}
    </div>
  )
}
