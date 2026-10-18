import { useState } from "react";

export default function PetHealth({ onNavigate }) {
  const [selectedPet, setSelectedPet] = useState("Buddy");
  const [activeTab, setActiveTab] = useState("vaccines");
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample vaccination records
  const [vaccinations, setVaccinations] = useState([
    {
      id: "v1",
      name: "Rabies 3-Year",
      dateGiven: "2025-04-10",
      nextDue: "2028-04-10",
      status: "Up to Date",
      veterinarian: "Dr. Sarah Jenkins",
      batch: "RB-99824",
    },
    {
      id: "v2",
      name: "DHPP (Distemper / Parvo)",
      dateGiven: "2025-06-15",
      nextDue: "2026-06-15",
      status: "Up to Date",
      veterinarian: "Dr. Sarah Jenkins",
      batch: "DH-1049",
    },
    {
      id: "v3",
      name: "Bordetella (Kennel Cough)",
      dateGiven: "2025-11-01",
      nextDue: "2026-05-01",
      status: "Due Soon",
      veterinarian: "Dr. Mark Cooper",
      batch: "BD-4421",
    },
    {
      id: "v4",
      name: "Leptospirosis",
      dateGiven: "2024-09-12",
      nextDue: "2025-09-12",
      status: "Overdue",
      veterinarian: "Dr. Sarah Jenkins",
      batch: "LP-8812",
    },
  ]);

  // Sickness & clinical history
  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: "m1",
      condition: "Mild Gastrointestinal Upset",
      diagnosedDate: "2025-12-04",
      status: "Resolved",
      treatment: "Probiotics & Bland Rice/Chicken Diet (3 days)",
      vet: "Dr. Mark Cooper",
      notes: "Recovered fully within 48 hours. Vitals normalized.",
    },
    {
      id: "m2",
      condition: "Seasonal Canine Atopy (Skin Allergy)",
      diagnosedDate: "2025-08-18",
      status: "Managed",
      treatment: "Apoquel 16mg as needed & Oatmeal Medicated Shampoo",
      vet: "Dr. Sarah Jenkins",
      notes: "Triggered by summer pollen. Recommended air purifier and paw wiping.",
    },
  ]);

  // Modal form state
  const [recordType, setRecordType] = useState("vaccine");
  const [formData, setFormData] = useState({
    name: "",
    dateGiven: "",
    nextDue: "",
    condition: "",
    treatment: "",
    veterinarian: "Dr. Sarah Jenkins",
    notes: "",
  });

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (recordType === "vaccine") {
      const newVac = {
        id: Date.now().toString(),
        name: formData.name,
        dateGiven: formData.dateGiven,
        nextDue: formData.nextDue,
        status: "Up to Date",
        veterinarian: formData.veterinarian,
        batch: "BATCH-" + Math.floor(1000 + Math.random() * 9000),
      };
      setVaccinations((prev) => [newVac, ...prev]);
    } else {
      const newMed = {
        id: Date.now().toString(),
        condition: formData.condition,
        diagnosedDate: formData.dateGiven,
        status: "Active",
        treatment: formData.treatment,
        vet: formData.veterinarian,
        notes: formData.notes,
      };
      setMedicalHistory((prev) => [newMed, ...prev]);
    }
    setShowAddModal(false);
    setFormData({
      name: "",
      dateGiven: "",
      nextDue: "",
      condition: "",
      treatment: "",
      veterinarian: "Dr. Sarah Jenkins",
      notes: "",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Pet Health & Medical Log</h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              🐾 {selectedPet}
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Complete records of past vitals, vaccinations, illnesses, and prescriptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate?.("dashboard")}
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors cursor-pointer"
          >
            📊 Live Vitals Stream
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          >
            + Add Health Record
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Vaccine Status</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">3 Up to Date</p>
          <p className="text-xs text-amber-600 font-medium mt-1">⚠️ 1 Overdue Booster</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Clinical History</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{medicalHistory.length} Recorded</p>
          <p className="text-xs text-gray-500 mt-1">1 Managed Condition</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Primary Vet</p>
          <p className="text-lg font-bold text-gray-900 mt-1">Dr. Sarah Jenkins</p>
          <p className="text-xs text-emerald-600 mt-1">Bay Paws Animal Clinic</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Bloodwork & Tests</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">All Clear</p>
          <p className="text-xs text-gray-500 mt-1">Last screened: Nov 2025</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab("vaccines")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "vaccines"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          💉 Vaccinations ({vaccinations.length})
        </button>
        <button
          onClick={() => setActiveTab("illness")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "illness"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          🩺 Sickness & Medical History ({medicalHistory.length})
        </button>
        <button
          onClick={() => setActiveTab("allergies")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "allergies"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          🌿 Allergies & Dietary Restrictions
        </button>
      </div>

      {/* Tab 1: Vaccinations */}
      {activeTab === "vaccines" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Vaccine Passport & Immunization Logs</h3>
            <button
              onClick={() => onNavigate?.("alerts")}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              🔔 Manage Vaccine Alerts →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-gray-500 bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-6">Vaccine Name</th>
                  <th className="py-3.5 px-6">Administered Date</th>
                  <th className="py-3.5 px-6">Next Due Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Veterinarian</th>
                  <th className="py-3.5 px-6">Batch ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vaccinations.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2">
                      <span>💉</span> {v.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{v.dateGiven}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{v.nextDue}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          v.status === "Up to Date"
                            ? "bg-emerald-100 text-emerald-800"
                            : v.status === "Due Soon"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{v.veterinarian}</td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-400">{v.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Sickness & Clinical History */}
      {activeTab === "illness" && (
        <div className="space-y-4">
          {medicalHistory.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{m.condition}</h4>
                    <p className="text-xs text-gray-500">
                      Diagnosed on {m.diagnosedDate} by {m.vet}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold self-start ${
                    m.status === "Resolved"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                <p className="font-semibold text-gray-700">Prescribed Treatment / Medication:</p>
                <p className="text-gray-600 mt-0.5">{m.treatment}</p>
                <p className="font-semibold text-gray-700 mt-2">Veterinary Clinical Notes:</p>
                <p className="text-gray-600 mt-0.5">{m.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Allergies & Dietary Restrictions */}
      {activeTab === "allergies" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Identified Allergies & Intolerances</h3>
            <p className="text-xs text-gray-500">
              Collar alerts will cross-reference food ingredients against these documented allergens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/60">
              <div className="flex items-center gap-2 font-bold text-red-800 text-sm mb-1">
                <span>🚫</span> Beef & Dairy Intolerance
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                Causes dermatitis and digestive upset. Avoid treats containing beef meal or cow milk derivatives.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
              <div className="flex items-center gap-2 font-bold text-amber-800 text-sm mb-1">
                <span>🌿</span> Summer Grass & Pollen Sensitivity
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Moderate paw-licking and redness in July-August. Wipe paws with damp cloth after walks.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-600">Need allergen-safe food?</span>
            <button
              onClick={() => onNavigate?.("marketplace")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Browse Hypoallergenic Food on Marketplace ➔
            </button>
          </div>
        </div>
      )}

      {/* Add Health Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Pet Health Entry</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Record Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRecordType("vaccine")}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                      recordType === "vaccine"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    💉 Vaccine
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecordType("illness")}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                      recordType === "illness"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    🩺 Sickness / Clinical Note
                  </button>
                </div>
              </div>

              {recordType === "vaccine" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Vaccine Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lyme Disease, Rabies, FVRCP"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Given Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateGiven}
                        onChange={(e) => setFormData({ ...formData, dateGiven: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Next Due Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.nextDue}
                        onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Condition / Diagnosis *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ear Infection, Sprained Paw"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Prescribed Treatment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Antibiotic ear drops 2x daily"
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Clinical details, observations, follow-up instructions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Administering Veterinarian
                </label>
                <input
                  type="text"
                  value={formData.veterinarian}
                  onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  Save to Health Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
