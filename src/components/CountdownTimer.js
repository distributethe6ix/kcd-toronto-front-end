import * as React from "react"

const EVENT_DATE = new Date("2026-05-13T09:00:00-04:00") // May 13, 2026, 9am EDT

function getTimeLeft() {
  const now = new Date()
  const diff = EVENT_DATE - now

  if (diff <= 0) return null

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

const pad = (n) => String(n).padStart(2, "0")

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft)

  React.useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return (
    <div style={{
      margin: "1.5rem auto 0",
      maxWidth: "600px",
      textAlign: "center",
    }}>
      <p style={{
        fontSize: "clamp(2rem, 6vw, 3rem)",
        fontWeight: 900,
        color: "#ffffff",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textShadow: "0 2px 20px rgba(0,0,0,0.4)",
      }}>
        Enjoy KCD Toronto!
      </p>
    </div>
  )

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div style={{
      margin: "1.5rem auto 0",
      maxWidth: "600px",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "16px",
      border: "2px solid rgba(255,255,255,0.35)",
      padding: "1rem 1.5rem",
    }}>
      <p style={{
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.75)",
        marginBottom: "0.5rem",
        textAlign: "center",
      }}>
        Days Until KCD Toronto
      </p>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        gap: "0.25rem",
        flexWrap: "wrap",
      }}>
        {/* Days */}
        <div style={{ textAlign: "center", minWidth: "4rem" }}>
          <span style={{
            display: "block",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            {days}
          </span>
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>
            days
          </span>
        </div>

        <span style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1,
          paddingBottom: "1rem",
          margin: "0 0.1rem",
        }}>:</span>

        {/* Hours */}
        <div style={{ textAlign: "center", minWidth: "3.5rem" }}>
          <span style={{
            display: "block",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            {pad(hours)}
          </span>
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>
            hrs
          </span>
        </div>

        <span style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1,
          paddingBottom: "1rem",
          margin: "0 0.1rem",
        }}>:</span>

        {/* Minutes */}
        <div style={{ textAlign: "center", minWidth: "3.5rem" }}>
          <span style={{
            display: "block",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            {pad(minutes)}
          </span>
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>
            min
          </span>
        </div>

        <span style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1,
          paddingBottom: "1rem",
          margin: "0 0.1rem",
        }}>:</span>

        {/* Seconds */}
        <div style={{ textAlign: "center", minWidth: "3.5rem" }}>
          <span style={{
            display: "block",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            {pad(seconds)}
          </span>
          <span style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>
            sec
          </span>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
