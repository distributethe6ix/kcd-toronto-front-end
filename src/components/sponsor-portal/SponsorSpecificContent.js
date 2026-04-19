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
  const { name, tier, logo_url } = sponsor
  const tierLabel = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : null

  return (
    <div className="box mb-5">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {logo_url && (
              <figure className="image mr-4" style={{ maxWidth: 120 }}>
                <img
                  src={logo_url}
                  alt={`${name} logo`}
                  style={{ objectFit: "contain", maxHeight: 60 }}
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
        {logo_url && (
          <div className="level-right">
            <div className="level-item">
              <a href={logo_url} download className="button is-primary is-outlined">
                Download Your Logo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const IncludedTicketCodes = ({ sponsor }) => {
  const { ticket_codes } = sponsor
  return (
    <div className="box mb-5">
      <h2 className="title is-4">Included Ticket Codes</h2>
      {ticket_codes && ticket_codes.length > 0 ? (
        <>
          <p className="mb-4">
            Your sponsorship includes{" "}
            <strong>
              {ticket_codes.length} complimentary ticket
              {ticket_codes.length !== 1 ? "s" : ""}
            </strong>
            . Each code below can be redeemed once.
          </p>
          <div className="table-container">
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ticket Code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ticket_codes.map((code, i) => (
                  <tr key={i}>
                    <td className="has-text-grey">{i + 1}</td>
                    <td>
                      <code className="has-text-weight-semibold">{code}</code>
                    </td>
                    <td>
                      <CopyButton text={code} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="is-size-7 has-text-grey">
            Codes are single-use. Contact us if you need replacements.
          </p>
        </>
      ) : (
        <Pending label="Your included ticket codes" />
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
