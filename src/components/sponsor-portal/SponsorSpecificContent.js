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

const SponsorSpecificContent = ({ sponsor }) => {
  const tierLabel = sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)

  return (
    <div>
      {/* Sponsor header */}
      <div className="box mb-5">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              {sponsor.logoUrl && (
                <figure className="image mr-4" style={{ maxWidth: 120 }}>
                  <img src={sponsor.logoUrl} alt={`${sponsor.name} logo`} style={{ objectFit: "contain", maxHeight: 60 }} />
                </figure>
              )}
              <div>
                <h2 className="title is-4 mb-1">{sponsor.name}</h2>
                <span className="tag is-primary is-medium">{tierLabel} Sponsor</span>
              </div>
            </div>
          </div>
          {sponsor.logoUrl && (
            <div className="level-right">
              <div className="level-item">
                <a
                  href={sponsor.logoUrl}
                  download
                  className="button is-primary is-outlined"
                >
                  Download Your Logo
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discount code */}
      {sponsor.discountCode && (
        <div className="box mb-5">
          <h2 className="title is-4">Attendee Discount Code</h2>
          <p className="mb-3">
            Share this code with your team and network — it gives{" "}
            <strong>{sponsor.discountPercent}% off</strong> ticket purchases for KCD Toronto 2026.
          </p>
          <div className="is-flex is-align-items-center">
            <div
              className="has-background-light px-5 py-3 is-flex is-align-items-center"
              style={{ borderRadius: 6, border: "2px dashed #326ce5" }}
            >
              <span className="is-size-4 has-text-weight-bold has-text-primary" style={{ letterSpacing: "0.1em" }}>
                {sponsor.discountCode}
              </span>
              <CopyButton text={sponsor.discountCode} />
            </div>
          </div>
          <p className="mt-3 is-size-7 has-text-grey">
            Tickets can be purchased at the KCD Toronto registration page.
          </p>
        </div>
      )}

      {/* Complimentary ticket codes */}
      {sponsor.ticketCodes && sponsor.ticketCodes.length > 0 && (
        <div className="box mb-5">
          <h2 className="title is-4">Complimentary Ticket Codes</h2>
          <p className="mb-4">
            Your sponsorship includes <strong>{sponsor.ticketCodes.length} complimentary ticket{sponsor.ticketCodes.length !== 1 ? "s" : ""}</strong>. Each code below can be redeemed once.
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
                {sponsor.ticketCodes.map((code, i) => (
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
        </div>
      )}

      {/* Signed agreement */}
      <div className="box mb-5">
        <h2 className="title is-4">Signed Agreement</h2>
        {sponsor.agreementPdf ? (
          <a
            href={sponsor.agreementPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="button is-link"
          >
            View Agreement (PDF)
          </a>
        ) : (
          <p className="has-text-grey">No agreement uploaded yet. Contact us if you need a copy.</p>
        )}
      </div>

      {/* Sponsor-specific graphics */}
      {sponsor.graphics && sponsor.graphics.length > 0 && (
        <div className="box mb-5">
          <h2 className="title is-4">Your Social Media Graphics</h2>
          <div className="columns is-multiline">
            {sponsor.graphics.map((url, i) => (
              <div key={i} className="column is-4">
                <div className="card">
                  <div className="card-image has-text-centered" style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
                    <img
                      src={url}
                      alt={`${sponsor.name} graphic ${i + 1}`}
                      style={{ maxHeight: "150px", width: "auto" }}
                    />
                  </div>
                  <div className="card-content has-text-centered">
                    <a href={url} download className="button is-primary is-small">
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SponsorSpecificContent
