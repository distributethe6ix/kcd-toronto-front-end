import * as React from "react"

const BOOTH_SIZE = {
  silver:    "approximately 9 ft × 5 ft",
  community: "approximately 9 ft × 5 ft",
}
const DEFAULT_BOOTH_SIZE = "approximately 18 ft × 10 ft"

const SharedVenueInfo = ({ data, tier }) => {
  const { venueInfo } = data
  const boothSize = BOOTH_SIZE[tier] || DEFAULT_BOOTH_SIZE
  return (
    <div className="box mb-5">
      <h2 className="title is-4">Venue Information</h2>
      <div className="columns">
        <div className="column is-5">
          <h3 className="title is-6 mb-1">Location</h3>
          <p className="is-size-5 has-text-weight-semibold">{venueInfo.name}</p>
          <p>{venueInfo.address}</p>
          <p className="mb-3">{venueInfo.city}</p>
          <a href={venueInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="button is-small is-link is-outlined">
            Open in Google Maps
          </a>

          <h3 className="title is-6 mt-5 mb-2">Event Times</h3>
          <table className="table is-narrow is-fullwidth">
            <tbody>
              <tr><td><strong>Event Hours</strong></td><td>8:00AM – 8:00PM EDT</td></tr>
              <tr><td><strong>Sponsor Arrival &amp; Setup</strong></td><td>7:00AM – 8:00AM EDT</td></tr>
            </tbody>
          </table>

          <h3 className="title is-6 mt-4 mb-2">Booth Information</h3>
          <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>Comes with a table and two chairs</li>
            <li>Will have a black tablecloth / linen</li>
            <li>Table size: 24 in. W × 60 in. L × 29 in. H</li>
            <li>Booth size: {boothSize} with space for a pull-up banner behind your table</li>
          </ul>

          <h3 className="title is-6 mt-5 mb-2">Shipping Information</h3>
          <a
            href="https://drive.google.com/drive/folders/1twUC7vmi8t8FIjhMwgTpuNZ6R7WJOPw7?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="button is-info is-outlined is-small mb-4"
          >
            Download Shipping Forms
          </a>
          <div className="content is-size-7">
            <p>
              Please use the link above to download the shipping form (<strong>The Quay – Shipping Form</strong>, make a copy),
              fill it out, and return it to{" "}
              <a href="mailto:toronto-org@kubernetescommunitydays.org">toronto-org@kubernetescommunitydays.org</a>{" "}
              and{" "}
              <a href="mailto:emily.bazzano@oliverbonacini.com">emily.bazzano@oliverbonacini.com</a>.
              Please ensure all boxes have the shipping label attached (<strong>The Quay – Events Shipping Label.pdf</strong>)
              so the venue can identify where it needs to go.
            </p>
            <p>
              To minimize loss, all event materials must be shipped to the venue a maximum of{" "}
              <strong>2 business days in advance</strong>. The client acknowledges that any items shipped back after
              an event has occurred are their sole responsibility. O&amp;B will not organize return shipping for items
              left at the venue. Sponsors are responsible for shipping back their materials.
            </p>
          </div>

          <h3 className="title is-6 mt-4 mb-2">Key Contacts</h3>
          <table className="table is-narrow is-fullwidth is-striped">
            <thead>
              <tr><th>Role</th><th>Name</th><th>Email</th></tr>
            </thead>
            <tbody>
              {venueInfo.contacts.map((contact, i) => (
                <tr key={i}>
                  <td>{contact.role}</td>
                  <td>{contact.name}</td>
                  <td>
                    {contact.email.includes("@")
                      ? <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      : contact.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="column is-7">
          <a href={venueInfo.mapsUrl} target="_blank" rel="noopener noreferrer">
            <iframe
              title="Venue Map"
              src={venueInfo.mapsEmbed}
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: 6, display: "block" }}
              allowFullScreen
              loading="lazy"
            />
          </a>
          <p className="is-size-7 has-text-grey mt-1 has-text-centered">Click map to open in Google Maps</p>
        </div>
      </div>
    </div>
  )
}

export default SharedVenueInfo
