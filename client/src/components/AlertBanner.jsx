import { useEffect, useState } from "react";

/**
 * Scans the metrics array for any anomaly events that haven't been dismissed
 * yet. Renders a stacked set of prominent red warning banners at the top of
 * the page, each individually dismissible.
 *
 * Props:
 *   metrics — full chronological array of HealthMetric objects
 */
export default function AlertBanner({ metrics }) {
  // Track which anomaly _ids the user has dismissed this session
  const [dismissed, setDismissed] = useState(new Set());
  // Track which banner is currently "flashing" (entrance animation)
  const [flashIds, setFlashIds] = useState(new Set());

  const anomalies = metrics.filter(
    (m) => m.anomalyType && !dismissed.has(m._id)
  );

  // Flash new anomalies when they first appear
  useEffect(() => {
    const newIds = anomalies
      .map((a) => a._id)
      .filter((id) => !flashIds.has(id));
    if (newIds.length > 0) {
      setFlashIds((prev) => {
        const next = new Set(prev);
        newIds.forEach((id) => next.add(id));
        return next;
      });
      // Remove flash class after the animation completes
      const timer = setTimeout(() => {
        setFlashIds((prev) => {
          const next = new Set(prev);
          newIds.forEach((id) => next.delete(id));
          return next;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [anomalies.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (anomalies.length === 0) return null;

  const dismiss = (id) =>
    setDismissed((prev) => new Set(prev).add(id));

  const dismissAll = () =>
    setDismissed(
      (prev) => new Set([...prev, ...anomalies.map((a) => a._id)])
    );

  return (
    <div className="mb-6 space-y-3">
      {/* Dismiss-all shortcut when multiple alerts are stacked */}
      {anomalies.length > 1 && (
        <div className="flex justify-end">
          <button
            onClick={dismissAll}
            className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
          >
            Dismiss all ({anomalies.length})
          </button>
        </div>
      )}

      {anomalies.slice(-5).reverse().map((a) => (
        <div
          key={a._id}
          className={`flex items-start gap-4 rounded-xl border-2 border-red-500 bg-red-50 px-5 py-4 shadow-lg transition-all duration-300 ${
            flashIds.has(a._id) ? "animate-pulse" : ""
          }`}
        >
          {/* Icon */}
          <span className="text-3xl mt-0.5">
            {a.anomalyType === "fall" ? "🚨" : "⚠️"}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-600 text-white">
                CRITICAL ALERT
              </span>
              <p className="text-sm font-bold uppercase tracking-wide text-red-800">
                {a.anomalyType === "fall"
                  ? "Fall Detected"
                  : "Tamper / Tag Detachment Detected"}
              </p>
            </div>
            <p className="text-sm text-red-900 font-medium mt-1">
              {a.anomalyType === "fall"
                ? "A sudden impact and vital spike were detected — your pet may have fallen. Please check on them immediately!"
                : "Irregular tag vibration and elevated vitals detected — possible tamper, collision, or collar removal attempt."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
              <span>
                🕐{" "}
                {new Date(a.timestamp).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>❤️ {a.heartRate} bpm</span>
              <span>🌡️ {a.temperature} °F</span>
              {a.stressIndicator && (
                <span className="text-red-600 font-semibold">
                  Stress: High
                </span>
              )}
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => dismiss(a._id)}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer mt-1"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
