import { PriceChart } from "./components/PriceChart";
import { SentimentGauge } from "./components/SentimentGauge";
import {
  getMarketSnapshot,
  getPriceSeries
} from "./lib/analysis";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1
  }).format(value);

const formatChange = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export default function Home() {
  const snapshot = getMarketSnapshot();
  const series = getPriceSeries();

  return (
    <main>
      <section>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="tag">Edukasi &amp; Analisa</div>
          <h1>Dashboard Analisa Forex Gold (XAU/USD)</h1>
          <p className="subtle">
            Ringkasan teknikal dan fundamental emas versi edukasi. Gunakan sebagai bahan
            belajar dan bukan sinyal eksekusi langsung. Selalu kombinasikan dengan
            rencana trading personal.
          </p>
          <div className="alert">
            <strong>Peringatan Risiko:</strong>
            <span>
              Trading forex dan emas memiliki risiko tinggi. Informasi di halaman ini bukan
              rekomendasi keuangan.
            </span>
          </div>
        </div>
      </section>

      <section>
        <div className="grid three">
          <article>
            <div className="card-title">Harga Spot</div>
            <div className="card-value">{formatCurrency(snapshot.currentPrice)}</div>
            <div className="subtle">Update harian berdasarkan data penutupan terakhir.</div>
          </article>
          <article>
            <div className="card-title">Perubahan 1 Hari</div>
            <div
              className="card-value"
              style={{ color: snapshot.change1d >= 0 ? "#4ade80" : "#f87171" }}
            >
              {formatChange(snapshot.change1d)}
            </div>
            <div className="subtle">Dibanding penutupan sesi sebelumnya.</div>
          </article>
          <article>
            <div className="card-title">Bias Tren</div>
            <div className="card-value" style={{ textTransform: "capitalize" }}>
              {snapshot.trendBias}
            </div>
            <div className="subtle">Berdasarkan struktur harga &amp; moving average.</div>
          </article>
        </div>
      </section>

      <section>
        <div className="card-title">Pergerakan Harga</div>
        <div style={{ marginBottom: "16px" }} className="subtle">
          Visualisasi harga penutupan 6 minggu terakhir. Gunakan untuk mengidentifikasi
          momentum dan area konsolidasi.
        </div>
        <PriceChart candles={series} />
      </section>

      <section>
        <h2>Insight Kunci</h2>
        <div className="grid two">
          <article>
            <div className="card-title">Ringkasan Pasar</div>
            <p className="subtle" style={{ lineHeight: 1.6 }}>
              {snapshot.narrative}
            </p>
            <ul className="list">
              <li>
                <strong>MA 20:</strong> {snapshot.sma20.toFixed(2)} | <strong>MA 50:</strong>{" "}
                {snapshot.sma50.toFixed(2)}
              </li>
              <li>
                <strong>RSI 14:</strong> {snapshot.rsi14.toFixed(2)} ➜ {snapshot.rsi14 > 55 ? "momentum bullish" : snapshot.rsi14 < 45 ? "momentum melemah" : "netral"}
              </li>
              <li>
                <strong>ATR 14:</strong> {snapshot.averageTrueRange.toFixed(2)} (~
                {snapshot.volatilityPct.toFixed(2)}%)
              </li>
            </ul>
          </article>
          <article>
            <div className="card-title">Level Teknikal</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Harga</th>
                  <th>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.structureLevels.map((level) => (
                  <tr key={level.label}>
                    <td>{level.label}</td>
                    <td>{formatCurrency(level.level)}</td>
                    <td className="subtle">{level.narrative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>

      <section>
        <h2>Sentimen &amp; Indikator</h2>
        <div className="grid two" style={{ alignItems: "stretch" }}>
          <div className="grid">
            {snapshot.sentiment.map((item) => (
              <SentimentGauge key={item.title} sentiment={item} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {snapshot.indicatorSignals.map((indicator) => (
              <div
                key={indicator.name}
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(148, 163, 184, 0.14)",
                  padding: "18px",
                  background: "rgba(15, 23, 42, 0.78)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="card-title">{indicator.name}</span>
                  <span className="badge" style={{ textTransform: "capitalize" }}>
                    {indicator.bias}
                  </span>
                </div>
                <div className="highlight">{indicator.reading}</div>
                <div className="subtle">{indicator.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Ide Strategi (Edukasi)</h2>
        <div className="grid two">
          {snapshot.strategyIdeas.map((idea) => (
            <article key={idea.name} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="card-title">{idea.name}</div>
                <span className="badge" style={{ textTransform: "capitalize" }}>
                  {idea.bias}
                </span>
              </div>
              <div className="subtle">
                <strong>Setup:</strong> {idea.setup}
              </div>
              <div className="subtle">
                <strong>Invalidasi:</strong> {idea.invalidation}
              </div>
              <div className="subtle">
                <strong>Timeframe:</strong> {idea.timeFrame}
              </div>
              <ul className="list">
                {idea.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="subtle" style={{ marginTop: "16px" }}>
          Catatan: Ide strategi ini hanya contoh edukasi. Tidak boleh digunakan sebagai
          sinyal trading tanpa uji ulang mandiri dan manajemen risiko ketat.
        </p>
      </section>

      <section>
        <h2>Kalender Makro</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Event</th>
              <th>Fokus</th>
              <th>Dampak Potensial</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.macroCalendar.map((event) => (
              <tr key={event.date + event.event}>
                <td>{event.date}</td>
                <td>{event.event}</td>
                <td>{event.focus}</td>
                <td className="subtle">{event.potentialImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Manajemen Risiko</h2>
        <ul className="list">
          {snapshot.riskHighlights.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
