const moodConfig = {
  Happy: {
    emoji: "😊",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Your pet is active and relaxed — everything looks great!",
  },
  Anxious: {
    emoji: "😰",
    color: "bg-red-100 text-red-800 border-red-300",
    description: "Stress indicators detected — consider a calming activity.",
  },
  Resting: {
    emoji: "😴",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Your pet is in a calm, low-energy state.",
  },
};

/**
 * Derives mood from the most recent HealthMetric data point.
 *   Anxious  → stressIndicator is true
 *   Resting  → activityLevel is "low" and no stress
 *   Happy    → everything else (moderate / high activity, no stress)
 */
function deriveMood(latestMetric) {
  if (!latestMetric) return "Resting";
  if (latestMetric.stressIndicator) return "Anxious";
  if (latestMetric.activityLevel === "low") return "Resting";
  return "Happy";
}

export default function MoodWidget({ latestMetric }) {
  const mood = deriveMood(latestMetric);
  const { emoji, color, description } = moodConfig[mood];

  return (
    <div className={`rounded-2xl border-2 p-6 ${color} transition-all duration-500`}>
      <div className="flex items-center gap-4">
        <span className="text-5xl">{emoji}</span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">
            Current Mood
          </p>
          <p className="text-3xl font-bold">{mood}</p>
        </div>
      </div>
      <p className="mt-3 text-sm opacity-80">{description}</p>

      {latestMetric && (
        <div className="mt-4 flex gap-4 text-xs font-medium opacity-70">
          <span>❤️ {latestMetric.heartRate} bpm</span>
          <span>🌡️ {latestMetric.temperature} °F</span>
          <span>⚡ {latestMetric.activityLevel}</span>
        </div>
      )}
    </div>
  );
}
