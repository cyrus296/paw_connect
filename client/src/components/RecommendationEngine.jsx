import { useMemo } from "react";

/**
 * Evaluates the last N readings and generates actionable health
 * recommendations. Each rule produces at most one card.
 *
 * Props:
 *   metrics      — full chronological array of HealthMetric objects
 *   onNavigate   — optional callback to switch pages (e.g. to marketplace)
 *   windowSize   — number of recent readings to evaluate (default 10)
 */
export default function RecommendationEngine({
  metrics,
  onNavigate,
  windowSize = 10,
}) {
  const recommendations = useMemo(
    () => evaluate(metrics, windowSize),
    [metrics, windowSize]
  );

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        💡 Personalised Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            rec={rec}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Evaluation logic                                                    */
/* ------------------------------------------------------------------ */

function evaluate(metrics, windowSize) {
  if (metrics.length === 0) return [];

  const window = metrics.slice(-windowSize);
  const recs = [];

  // — Averages --------------------------------------------------------
  const avgHR =
    window.reduce((s, m) => s + m.heartRate, 0) / window.length;
  const avgTemp =
    window.reduce((s, m) => s + m.temperature, 0) / window.length;

  // Count activity levels
  const activityCounts = { low: 0, moderate: 0, high: 0 };
  window.forEach((m) => {
    if (activityCounts[m.activityLevel] !== undefined)
      activityCounts[m.activityLevel]++;
  });

  const lowRatio = activityCounts.low / window.length;
  const stressCount = window.filter((m) => m.stressIndicator).length;
  const stressRatio = stressCount / window.length;

  // — Rule 1: Low activity ----------------------------------------
  if (lowRatio >= 0.4 || activityCounts.low >= Math.max(activityCounts.moderate, activityCounts.high)) {
    recs.push({
      id: "low-activity",
      icon: "🏃",
      color: "border-indigo-300 bg-indigo-50",
      title: "Personalized Activity Tips",
      description:
        `Pet activity level has been predominantly low in the last ${window.length} readings (${Math.round(lowRatio * 100)}% low). Regular movement promotes joint health and healthy weight.`,
      tips: [
        "Interactive Play: Try 10-15 minute fetch sessions or feather-wand play",
        "Sensory Stimulation: Hide healthy treats in a snuffle mat or puzzle feeder",
        "Outdoor Exploration: Introduce a new walking route with varied terrain",
      ],
      cta: null,
    });
  }

  // — Rule 2: Elevated temperature ---------------------------------
  if (avgTemp >= 101.5) {
    recs.push({
      id: "elevated-temp",
      icon: "🌡️",
      color: "border-amber-400 bg-amber-50",
      title: "Hydration Reminder & Early Illness Check",
      description:
        `Average temperature is ${avgTemp.toFixed(1)} °F over the last ${window.length} readings (slightly elevated). Watch for lethargy, panting, or reduced appetite.`,
      tips: [
        "Hydration Reminder: Ensure fresh, cold water is available in multiple spots; add ice cubes to encourage drinking",
        "Rest in Cool Area: Move bedding away from direct sunlight or heat sources",
        "Monitor Vitals: If temperature stays above 102.5 °F, contact your veterinary provider immediately",
      ],
      cta: { label: "Book Vet Checkup on Marketplace", page: "marketplace" },
    });
  }

  // — Rule 3: Elevated heart rate ----------------------------------
  if (avgHR > 110) {
    recs.push({
      id: "high-hr",
      icon: "❤️‍🔥",
      color: "border-red-300 bg-red-50",
      title: "Elevated Heart Rate",
      description:
        `Average heart rate is ${Math.round(avgHR)} bpm over the last ${window.length} readings. ` +
        "This could indicate stress, excitement, or an underlying condition. " +
        "Monitor closely and consult your vet if it persists.",
      tips: [
        "Create a calm, quiet environment for rest",
        "Check for environmental stressors (loud noises, new pets)",
        "Ensure adequate sleep — 12-14 hours for most dogs",
      ],
      cta: { label: "Book a Vet Checkup", page: "marketplace" },
    });
  }

  // — Rule 4: Persistent stress indicators --------------------------
  if (stressRatio >= 0.3) {
    recs.push({
      id: "stress",
      icon: "😰",
      color: "border-purple-300 bg-purple-50",
      title: "Stress Management",
      description:
        `Stress indicators have been flagged in ${Math.round(stressRatio * 100)}% of recent readings. ` +
        "Consider calming strategies and consult a veterinary behaviourist if the pattern continues.",
      tips: [
        "Try calming supplements or diffusers (e.g. Adaptil)",
        "Maintain a consistent daily routine",
        "Provide a safe, quiet retreat space",
      ],
      cta: { label: "Browse Services", page: "marketplace" },
    });
  }

  // — Rule 5: Everything looks good! --------------------------------
  if (recs.length === 0 && metrics.length >= windowSize) {
    recs.push({
      id: "all-good",
      icon: "✅",
      color: "border-emerald-300 bg-emerald-50",
      title: "All Clear!",
      description:
        "Your pet's vitals look great across the board. Keep up the good routine and regular checkups!",
      tips: [],
      cta: null,
    });
  }

  return recs;
}

/* ------------------------------------------------------------------ */
/* Card component                                                      */
/* ------------------------------------------------------------------ */

function RecommendationCard({ rec, onNavigate }) {
  return (
    <div
      className={`rounded-2xl border-2 ${rec.color} p-5 flex flex-col transition-shadow hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{rec.icon}</span>
        <h4 className="text-base font-bold text-gray-900">{rec.title}</h4>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {rec.description}
      </p>

      {/* Tips */}
      {rec.tips.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {rec.tips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="text-emerald-500 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {rec.cta && (
        <button
          onClick={() => onNavigate?.(rec.cta.page)}
          className="mt-auto self-start px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          {rec.cta.label} →
        </button>
      )}
    </div>
  );
}
