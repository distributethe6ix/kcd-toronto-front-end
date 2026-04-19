exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const user = context.clientContext?.user
  const roles = user?.app_metadata?.roles || []
  if (!roles.includes("admin")) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) }
  }

  const { userEmail } = JSON.parse(event.body)
  if (!userEmail) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing userEmail" }) }
  }

  const siteId = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_ACCESS_TOKEN
  if (!siteId || !token) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured: missing env vars" }) }
  }

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

  return {
    statusCode: 200,
    body: JSON.stringify({
      email: target.email,
      app_metadata: target.app_metadata || {},
    }),
  }
}
