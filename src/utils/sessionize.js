export const SESSIONIZE_BASE = "https://sessionize.com/api/v2/9ddjd9rc/view"

// Parses GridSmart HTML — includes service sessions (breaks, lunch, etc.)
export const parseGridSmart = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-sessionid]")].map((el) => {
    const timeAttr = el.querySelector(".sz-session__time")?.getAttribute("data-sztz") || ""
    const parts = timeAttr.split("|")
    return {
      id: el.dataset.sessionid,
      title: el.querySelector(".sz-session__title")?.textContent?.trim(),
      room: el.querySelector(".sz-session__room")?.textContent?.trim(),
      roomId: el.querySelector(".sz-session__room")?.getAttribute("data-roomid"),
      timeDisplay: el.querySelector(".sz-session__time")?.textContent?.trim(),
      startsAt: parts[2] || null,
      endsAt: parts[3] || null,
      isService: el.classList.contains("sz-session--service"),
      speakers: [...el.querySelectorAll(".sz-session__speakers [data-speakerid]")].map((li) => ({
        id: li.dataset.speakerid,
        name: li.querySelector("a")?.textContent?.trim(),
      })),
      description: null,
      tags: [],
    }
  })
}

// Parses Sessions HTML — has descriptions and tags but no service sessions
export const parseSessionDetails = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return [...doc.querySelectorAll("[data-sessionid]")].map((el) => ({
    id: el.dataset.sessionid,
    description: el.querySelector(".sz-session__description")?.textContent?.trim(),
    tags: [...el.querySelectorAll(".sz-tag")].map((t) => ({
      category: t.getAttribute("data-categoryname"),
      name: t.textContent?.trim(),
    })),
  }))
}

export const formatTime = (isoString) => {
  if (!isoString) return ""
  try {
    return new Date(isoString).toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Toronto",
    })
  } catch {
    return isoString
  }
}
