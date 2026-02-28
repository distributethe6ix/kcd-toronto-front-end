import * as React from "react"

const SponsorSpecificContent = ({ sponsor }) => {
  return (
    <div className="box mb-5">
      <h2 className="title is-3">Your Sponsor Materials</h2>

      {/* Agreement */}
      <div className="mb-5">
        <h3 className="title is-5">Signed Agreement</h3>
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

      {/* Sponsor-specific Graphics */}
      <div>
        <h3 className="title is-5">Your Social Media Graphics</h3>
        {sponsor.graphics && sponsor.graphics.length > 0 ? (
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
                    <a
                      href={url}
                      download
                      className="button is-primary is-small"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="has-text-grey">Social media graphics will be available here once they're ready.</p>
        )}
      </div>
    </div>
  )
}

export default SponsorSpecificContent
