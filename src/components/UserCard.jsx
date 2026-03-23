import { ROLE_COLORS, STATUS_COLORS } from "../data/users";
import { useInsight } from "../hooks/useInsight";
import styles from "./UserCard.module.css";

export default function UserCard({ user }) {
  const { insight, loading, error, retries, generate } = useInsight(user);
  const roleStyle = ROLE_COLORS[user.role] || ROLE_COLORS.Viewer;
  const initials  = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div
      className={styles.card}
      style={{ "--role-border": roleStyle.border, "--role-bg": roleStyle.bg }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ background: roleStyle.bg, border: `1.5px solid ${roleStyle.border}`, color: roleStyle.text }}
        >
          {initials}
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.sub}>
            <span className={styles.badge} style={{ color: roleStyle.text, background: roleStyle.bg, border: `1px solid ${roleStyle.border}` }}>
              {user.role}
            </span>
            <span className={styles.dept}>{user.department}</span>
          </div>
        </div>
        <div className={styles.statusBlock}>
          <span className={styles.statusDot} style={{ background: STATUS_COLORS[user.status] }} />
          <span className={styles.statusLabel} style={{ color: STATUS_COLORS[user.status] }}>{user.status}</span>
        </div>
      </div>

      {/* Chips */}
      <div className={styles.chips}>
        <span className={styles.chip}>🌐 {user.language}</span>
        <span className={styles.chip}>📅 {user.joined}</span>
        <span className={styles.chip}>✉️ {user.email}</span>
      </div>

      {/* Insight */}
      <div className={styles.insightArea}>
        {!insight && !loading && !error && (
          <button className={styles.btnGenerate} onClick={() => generate(false)}>
            <span>✦</span> Generate Insights
          </button>
        )}
        {loading && (
          <div className={styles.loading}>
            <span className={styles.spinner} />
            <span>Analysing profile<span className={styles.dots} /></span>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <span>⚠ {error}</span>
            <button className={styles.btnRetry} onClick={() => generate(false)}>
              Retry {retries > 1 ? `(${retries})` : ""}
            </button>
          </div>
        )}
        {insight && !loading && (
          <div className={styles.result}>
            <div className={styles.resultLabel}>
              <span className={styles.pulseDot} /> AI Insight
            </div>
            <p className={styles.resultText}>{insight}</p>
            <button className={styles.btnRegen} onClick={() => generate(true)}>↻ Regenerate</button>
          </div>
        )}
      </div>
    </div>
  );
}
