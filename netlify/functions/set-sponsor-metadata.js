exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  // Netlify Identity injects the authenticated user into clientContext
  const user = context.clientContext?.user
  const roles = user?.app_metadata?.roles || []
  if (!roles.includes("admin")) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) }
  }

  const { userEmail, sponsorData } = JSON.parse(event.body)
  if (!userEmail || !sponsorData) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing userEmail or sponsorData" }) }
  }

  const siteId = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_ACCESS_TOKEN
  if (!siteId || !token) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured: missing env vars" }) }
  }

  // Find the user by email
  const listRes = await fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/identity/users?per_page=100`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!listRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: "Failed to fetch users from Netlify" }) }
  }
  const { users } = await listRes.json()
  const target = users?.find(
    (u) => u.email.toLowerCase() === userEmail.toLowerCase()
  )
  if (!target) {
    return { statusCode: 404, body: JSON.stringify({ error: `No Netlify Identity user found for ${userEmail}` }) }
  }

  // Merge roles: always include "sponsor", preserve any existing roles
  const existingRoles = target.app_metadata?.roles || []
  const mergedRoles = Array.from(new Set([...existingRoles, "sponsor"]))

  const patchRes = await fetch(
    `https://api.netlify.com/api/v1/sites/${siteId}/identity/users/${target.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_metadata: { ...sponsorData, roles: mergedRoles },
      }),
    }
  )
  if (!patchRes.ok) {
    const err = await patchRes.text()
    return { statusCode: 502, body: JSON.stringify({ error: `Netlify API error: ${err}` }) }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, userId: target.id }),
  }
}
