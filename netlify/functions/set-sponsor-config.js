const { getStore } = require("@netlify/blobs")

exports.handler = async (event, context) => {
  const netlifyUser = context.clientContext?.user
  if (!netlifyUser?.app_metadata?.roles?.includes("admin")) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden: admin only" }) }
  }

  const siteID = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_ACCESS_TOKEN
  if (!siteID || !token) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured: missing env vars" }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) }
  }

  const { domain, sponsorData } = body
  if (!domain) {
    return { statusCode: 400, body: JSON.stringify({ error: "domain is required" }) }
  }

  try {
    const store = getStore({ name: "sponsor-config", siteID, token })
    await store.setJSON(domain.toLowerCase(), sponsorData)
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
