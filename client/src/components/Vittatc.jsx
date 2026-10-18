import { useCallback, useEffect, useState } from "react";
import AlertBanner from "./AlertBanner";
import HeartRateChart from "./HeartRateChart";
import MoodWidget from "./MoodWidget";
import RecommendationEngine from "./RecommendationEngine";
import TemperatureChart from "./TemperatureChart";

const POLL_INTERVAL_MS = 5000; // match the telemetry simulator interval

export default function Vittatc({ onNavigate }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch("/api/health-metrics");
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      // API returns newest-first; charts need chronological order
      setMetrics(data.reverse());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchMetrics();
    const id = setInterval(fetchMetrics, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchMetrics]);

  const latestMetric = metrics.length > 0 ? metrics[metrics.length - 1] : null;
  // Keep the most recent 30 data points for readable charts
  const chartSlice = metrics.slice(-30);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vittatc Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Real-time health & mood monitoring for your pet
        </p>
      </header>

      {/* Prominent dismissible Anomaly Alert Banner */}
      <AlertBanner metrics={metrics} />

      {/* Status bar */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          ⚠️ Failed to fetch metrics: {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 animate-pulse text-lg">
            Loading telemetry data…
          </p>
        </div>
      ) : (
        <>
          {/* Top row — summary cards + mood */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick stats */}
            <StatCard
              label="Heart Rate"
              value={latestMetric ? `${latestMetric.heartRate} bpm` : "—"}
              icon="❤️"
              accent="text-red-600"
            />
            <StatCard
              label="Temperature"
              value={latestMetric ? `${latestMetric.temperature} °F` : "—"}
              icon="🌡️"
              accent="text-amber-600"
            />
            <StatCard
              label="Data Points"
              value={metrics.length}
              icon="📈"
              accent="text-indigo-600"
            />
          </div>

          {/* Mood widget */}
          <div className="mb-8 max-w-md">
            <MoodWidget latestMetric={latestMetric} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <HeartRateChart data={chartSlice} />
            <TemperatureChart data={chartSlice} />
          </div>

          {/* Recommendation Engine */}
          <RecommendationEngine metrics={metrics} onNavigate={onNavigate} />

          {/* Anomaly log */}
          <AnomalyLog metrics={metrics} />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small helper components                                             */
/* ------------------------------------------------------------------ */

function StatCard({ label, value, icon, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className={`text-2xl font-bold ${accent}`}>{value}</p>
      </div>
    </div>
  );
}

function AnomalyLog({ metrics }) {
  const anomalies = metrics.filter((m) => m.anomalyType);
  if (anomalies.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        ⚠️ Anomaly Log
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-gray-500 border-b">
            <tr>
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Heart Rate</th>
              <th className="py-2 pr-4">Temp</th>
              <th className="py-2">Stress</th>
            </tr>
          </thead>
          <tbody>
            {anomalies
              .slice(-10)
              .reverse()
              .map((a) => (
                <tr key={a._id} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-gray-600">
                    {new Date(a.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        a.anomalyType === "fall"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.anomalyType.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-red-600 font-medium">
                    {a.heartRate} bpm
                  </td>
                  <td className="py-2 pr-4 text-amber-600 font-medium">
                    {a.temperature} °F
                  </td>
                  <td className="py-2">
                    {a.stressIndicator ? "🔴 Yes" : "🟢 No"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
