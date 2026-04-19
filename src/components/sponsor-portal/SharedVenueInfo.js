import * as React from "react"

const SharedVenueInfo = ({ data }) => {
  const { venueInfo } = data

  return (
    <div className="box mb-5">
      <h2 className="title is-4">Venue Information</h2>

      <div className="columns">
        <div className="column is-5">
          <h3 className="title is-6 mb-1">Location</h3>
          <p className="is-size-5 has-text-weight-semibold">{venueInfo.name}</p>
          <p>{venueInfo.address}</p>
          <p className="mb-3">{venueInfo.city}</p>
          <a
            href={venueInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button is-small is-link is-outlined"
          >
            Open in Google Maps
          </a>

          <h3 className="title is-6 mt-5 mb-1">Load-in / Load-out</h3>
          <table className="table is-narrow is-fullwidth">
            <tbody>
              <tr>
                <td><strong>Load-in Date</strong></td>
                <td>{venueInfo.loadInDate}</td>
              </tr>
              <tr>
                <td><strong>Load-in Time</strong></td>
                <td>{venueInfo.loadInTime}</td>
              </tr>
              <tr>
                <td><strong>Load-out Date</strong></td>
                <td>{venueInfo.loadOutDate}</td>
              </tr>
              <tr>
                <td><strong>Load-out Time</strong></td>
                <td>{venueInfo.loadOutTime}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="title is-6 mt-4 mb-2">Key Contacts</h3>
          <table className="table is-narrow is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {venueInfo.contacts.map((contact, i) => (
                <tr key={i}>
                  <td>{contact.role}</td>
                  <td>{contact.name}</td>
                  <td>
                    {contact.email.includes("@") ? (
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    ) : (
                      contact.email
                    )}
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
