import { useState } from "react";

export default function AlertsManager({ onNavigate }) {
  const [alerts, setAlerts] = useState([
    {
      id: "a1",
      category: "vaccine",
      title: "Bordetella (Kennel Cough) Booster",
      pet: "Buddy",
      dueDate: "In 12 days (May 1, 2026)",
      severity: "high",
      completed: false,
      notes: "Required for pet boarding and dog park facilities.",
      cta: { label: "Book Clinic Booster", page: "vet" },
    },
    {
      id: "a2",
      category: "food",
      title: "Low Food Alert: NutriPaw Kibble (1.2 kg remaining)",
      pet: "Buddy",
      dueDate: "Supply will run out in ~3 days",
      severity: "high",
      completed: false,
      notes: "Based on Buddy's 350g/day feeding schedule from the smart collar.",
      cta: { label: "Reorder Food on Marketplace", page: "marketplace" },
    },
    {
      id: "a3",
      category: "feeding",
      title: "Daily Breakfast Feeding (Morning Bowl)",
      pet: "Buddy",
      dueDate: "Daily at 08:00 AM",
      severity: "medium",
      completed: true,
      notes: "1.5 cups NutriPaw kibble + 1 spoon omega salmon oil.",
      cta: null,
    },
    {
      id: "a4",
      category: "feeding",
      title: "Evening Dinner & Hydration Refresh",
      pet: "Buddy",
      dueDate: "Daily at 06:30 PM",
      severity: "medium",
      completed: false,
      notes: "1.5 cups kibble with fresh cool water refill.",
      cta: null,
    },
    {
      id: "a5",
      category: "vaccine",
      title: "DHPP Annual Immunity Check",
      pet: "Buddy",
      dueDate: "In 2 months (June 15, 2026)",
      severity: "low",
      completed: false,
      notes: "Core 5-in-1 vaccine schedule.",
      cta: { label: "Schedule Checkup", page: "vet" },
    },
    {
      id: "a6",
      category: "medication",
      title: "NexGard Flea & Tick Monthly Chewable",
      pet: "Buddy",
      dueDate: "1st of every month",
      severity: "medium",
      completed: true,
      notes: "Administer after dinner with a treat.",
      cta: null,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    category: "vaccine",
    pet: "Buddy",
    dueDate: "",
    severity: "medium",
    notes: "",
  });

  const toggleComplete = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newAlert.title.trim()) return;

    setAlerts((prev) => [
      {
        ...newAlert,
        id: Date.now().toString(),
        completed: false,
        cta:
          newAlert.category === "vaccine"
            ? { label: "Book Vet", page: "vet" }
            : newAlert.category === "food"
            ? { label: "Order Food", page: "marketplace" }
            : null,
      },
      ...prev,
    ]);
    setShowAddModal(false);
    setNewAlert({
      title: "",
      category: "vaccine",
      pet: "Buddy",
      dueDate: "",
      severity: "medium",
      notes: "",
    });
  };

  const filteredAlerts =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.category === filter);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vaccination & Food Alerts</h1>
          <p className="text-gray-500 mt-1">
            Never miss a vaccine booster, daily meal schedule, or food re-order window
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          + Create Custom Alert
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All Alerts", count: alerts.length },
          { key: "vaccine", label: "💉 Vaccine Alerts", count: alerts.filter((a) => a.category === "vaccine").length },
          { key: "food", label: "🍖 Food Reorder Alerts", count: alerts.filter((a) => a.category === "food").length },
          { key: "feeding", label: "⏰ Feeding Times", count: alerts.filter((a) => a.category === "feeding").length },
          { key: "medication", label: "💊 Medication", count: alerts.filter((a) => a.category === "medication").length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === t.key
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400">
            <span className="text-4xl block mb-2">🎉</span>
            <p className="font-semibold text-gray-700">No active alerts in this category!</p>
            <p className="text-xs text-gray-400 mt-1">All vaccinations and feeding schedules are up to date.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border-2 p-5 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.completed
                  ? "bg-gray-100/60 border-gray-200 opacity-60"
                  : alert.severity === "high"
                  ? "bg-red-50/50 border-red-200"
                  : alert.severity === "medium"
                  ? "bg-amber-50/50 border-amber-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={alert.completed}
                  onChange={() => toggleComplete(alert.id)}
                  className="w-5 h-5 mt-1 accent-emerald-600 rounded cursor-pointer"
                  title="Mark as completed"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        alert.category === "vaccine"
                          ? "bg-blue-100 text-blue-800"
                          : alert.category === "food"
                          ? "bg-amber-100 text-amber-800"
                          : alert.category === "feeding"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {alert.category}
                    </span>
                    <h3
                      className={`text-base font-bold ${
                        alert.completed ? "line-through text-gray-500" : "text-gray-900"
                      }`}
                    >
                      {alert.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pet: <strong className="text-gray-700">{alert.pet}</strong> • Due:{" "}
                    <span className="font-semibold text-emerald-700">{alert.dueDate}</span>
                  </p>
                  {alert.notes && <p className="text-xs text-gray-600 mt-1">{alert.notes}</p>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                {alert.cta && !alert.completed && (
                  <button
                    onClick={() => onNavigate?.(alert.cta.page)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    {alert.cta.label} ➔
                  </button>
                )}
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors text-sm cursor-pointer"
                  title="Delete alert"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Create Reminder Alert</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Alert Category
                </label>
                <select
                  value={newAlert.category}
                  onChange={(e) => setNewAlert({ ...newAlert, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white outline-none"
                >
                  <option value="vaccine">💉 Vaccination Booster</option>
                  <option value="food">🍖 Food Reorder Supply</option>
                  <option value="feeding">⏰ Daily Meal Schedule</option>
                  <option value="medication">💊 Medication / Deworming</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rabies vaccine booster, Dinner feeding"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Due Time / Frequency *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily at 07:30 PM, In 14 days, Every 1st of month"
                  value={newAlert.dueDate}
                  onChange={(e) => setNewAlert({ ...newAlert, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Additional instructions..."
                  value={newAlert.notes}
                  onChange={(e) => setNewAlert({ ...newAlert, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
