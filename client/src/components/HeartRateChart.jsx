import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function HeartRateChart({ data }) {
  // data = array of HealthMetric objects with { timestamp, heartRate }
  const chartData = data.map((d) => ({
    time: new Date(d.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    heartRate: d.heartRate,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        ❤️ Heart Rate History
      </h3>

      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 py-12 text-center">
          No data yet — waiting for telemetry…
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[50, 220]}
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              unit=" bpm"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                fontSize: "13px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3, fill: "#ef4444" }}
              activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
              name="Heart Rate (bpm)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
