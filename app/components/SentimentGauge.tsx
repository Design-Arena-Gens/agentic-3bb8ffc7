import type { SentimentBreakdown } from "../lib/analysis";

const toneColor: Record<SentimentBreakdown["tone"], string> = {
  bullish: "linear-gradient(135deg, rgba(34,197,94,0.85), rgba(187,247,208,0.3))",
  bearish: "linear-gradient(135deg, rgba(248,113,113,0.85), rgba(254,202,202,0.25))",
  neutral: "linear-gradient(135deg, rgba(148,163,184,0.7), rgba(226,232,240,0.2))"
};

export function SentimentGauge({ sentiment }: { sentiment: SentimentBreakdown }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid rgba(148, 163, 184, 0.12)",
        background: "rgba(15,23,42,0.75)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="card-title">{sentiment.title}</span>
        <span className="badge" style={{ textTransform: "capitalize" }}>
          {sentiment.tone}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: "12px",
          borderRadius: "999px",
          background: "rgba(148, 163, 184, 0.18)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${sentiment.score}%`,
            height: "100%",
            borderRadius: "inherit",
            background: toneColor[sentiment.tone],
            transition: "width 0.3s ease"
          }}
        />
      </div>
      <div className="subtle">{sentiment.context}</div>
    </div>
  );
}
