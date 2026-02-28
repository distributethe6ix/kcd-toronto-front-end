import * as React from "react"

const SharedGraphics = ({ data }) => {
  const { downloadableGraphics } = data

  if (!downloadableGraphics || downloadableGraphics.length === 0) {
    return null
  }

  return (
    <div className="box mb-5">
      <h2 className="title is-3">Downloadable Graphics</h2>
      <p className="mb-4">Download these assets for your social media and marketing materials.</p>

      <div className="columns is-multiline">
        {downloadableGraphics.map((graphic, i) => (
          <div key={i} className="column is-4">
            <div className="card">
              <div className="card-image has-text-centered" style={{ padding: "1.5rem", backgroundColor: "#f5f5f5" }}>
                <img
                  src={graphic.url}
                  alt={graphic.name}
                  style={{ maxHeight: "100px", width: "auto" }}
                />
              </div>
              <div className="card-content has-text-centered">
                <p className="has-text-weight-semibold mb-2">{graphic.name}</p>
                <a
                  href={graphic.url}
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
    </div>
  )
}

export default SharedGraphics
