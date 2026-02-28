import * as React from "react"

const SharedVenueInfo = ({ data }) => {
  const { venueInfo } = data

  return (
    <div className="box mb-5">
      <h2 className="title is-3">Venue Information</h2>

      <div className="columns">
        <div className="column is-6">
          <h3 className="title is-5">Location</h3>
          <p className="is-size-5"><strong>{venueInfo.name}</strong></p>
          <p className="is-size-5">{venueInfo.address}</p>
        </div>
        <div className="column is-6">
          <h3 className="title is-5">Load-in / Load-out</h3>
          <table className="table is-fullwidth">
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
        </div>
      </div>

      <h3 className="title is-5 mt-4">Key Contacts</h3>
      <table className="table is-fullwidth is-striped">
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
  )
}

export default SharedVenueInfo
