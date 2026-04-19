import * as React from "react"

const SharedGraphics = ({ data }) => {
  const { downloadableGraphics } = data
  const kcdLogos = (downloadableGraphics || []).filter(
    (g) => g.name !== "Sponsor Promo Image"
  )
  if (kcdLogos.length === 0) return null
  return (
    <div className="box mb-5">
      <h2 className="title is-4">KCD Toronto Logos</h2>
      <p className="mb-4">Download official event logos to use in your marketing materials, social posts, and website.</p>
      <div className="columns is-multiline">
        {kcdLogos.map((graphic, i) => (
          <div key={i} className="column is-6">
            <div className="card" style={{ height: "100%" }}>
              <div
                className="card-image has-text-centered"
                style={{ padding: "1.5rem", backgroundColor: "#f5f5f5", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img src={graphic.url} alt={graphic.name} style={{ maxHeight: "80px", maxWidth: "100%", width: "auto" }} />
              </div>
              <div className="card-content has-text-centered">
                <p className="has-text-weight-semibold mb-3" style={{ fontSize: "0.9rem" }}>{graphic.name}</p>
                <a href={graphic.url} download className="button is-primary is-small is-fullwidth">Download</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharedGraphics
