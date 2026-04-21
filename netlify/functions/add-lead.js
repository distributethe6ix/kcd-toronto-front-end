exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) }
  }

  const netlifyUser = context.clientContext?.user
  if (!netlifyUser) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) }
  }

  const scriptUrl = process.env.LEADS_SCRIPT_URL
  if (!scriptUrl) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured: missing LEADS_SCRIPT_URL" }) }
  }

  let contact
  try {
    contact = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) }
  }

  const payload = {
    ...contact,
    scannedBy: netlifyUser.email,
    scannedAt: new Date().toISOString(),
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    if (!res.ok) {
      throw new Error(`Apps Script returned HTTP ${res.status}`)
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    }
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
