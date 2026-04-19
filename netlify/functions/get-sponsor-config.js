const { getStore } = require("@netlify/blobs")

exports.handler = async (event, context) => {
  const netlifyUser = context.clientContext?.user
  if (!netlifyUser) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) }
  }

  const siteID = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_ACCESS_TOKEN
  if (!siteID || !token) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured: missing env vars" }) }
  }

  const isAdmin = netlifyUser.app_metadata?.roles?.includes("admin")
  let domain

  if (isAdmin && event.body) {
    try {
      const body = JSON.parse(event.body)
      if (body.domain) domain = body.domain.toLowerCase()
    } catch {}
  }

  if (!domain) {
    domain = netlifyUser.email?.split("@")[1]?.toLowerCase()
  }

  if (!domain) {
    return { statusCode: 400, body: JSON.stringify({ error: "Could not determine domain" }) }
  }

  try {
    const store = getStore({ name: "sponsor-config", siteID, token })
    const config = await store.get(domain, { type: "json" })
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, config: config ?? null }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
