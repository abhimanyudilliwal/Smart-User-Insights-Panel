import "./styles/global.css";
import { USERS } from "./data/users";
import UserCard from "./components/UserCard";

export default function App() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px 80px" }}>
      <header style={{ marginBottom: 48 }}>

        <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, lineHeight: 1.1, color: "#f8fafc", letterSpacing: "-0.02em" }}>
          Smart User<br /><span style={{ color: "var(--green)" }}>Insights</span> Panel
        </h1>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          AI-powered profile analysis · llama-3.3-70b-versatile
        </p>
        <div style={{ marginTop: 24, height: 1, background: "linear-gradient(90deg,#22c55e33,transparent)" }} />
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {USERS.map((user) => <UserCard key={user.id} user={user} />)}
      </div>

      <footer style={{ marginTop: 48, fontFamily: "var(--font-mono)", fontSize: 11, color: "#1e2d3d", textAlign: "center", letterSpacing: "0.1em" }}>
        — insights cached in localStorage · no duplicate api calls —
      </footer>
    </div>
  );
}
