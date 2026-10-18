import { useCallback, useEffect, useState } from "react";

const typeConfig = {
  vet: {
    icon: "🩺",
    accent: "border-blue-300 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
    cta: "Book Now",
  },
  grooming: {
    icon: "✂️",
    accent: "border-purple-300 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700",
    cta: "Book Now",
  },
  food: {
    icon: "🍖",
    accent: "border-amber-300 bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    button: "bg-amber-600 hover:bg-amber-700",
    cta: "Purchase",
  },
};

export default function Marketplace() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filtered =
    filterType === "all"
      ? services
      : services.filter((s) => s.type === filterType);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <p className="text-gray-500 mt-1">
          Integrated services — vet appointments, grooming &amp; food delivery
        </p>
      </header>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          ⚠️ Failed to load services: {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "vet", "grooming", "food"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              filterType === type
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {type === "all"
              ? "All Services"
              : `${typeConfig[type].icon} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-400 animate-pulse text-lg">
          Loading services…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <span className="text-4xl mb-3">📭</span>
          <p>No services found. Add some via the API!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Service Card                                                        */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }) {
  const cfg = typeConfig[service.type] ?? typeConfig.vet;

  const handleAction = () => {
    alert(
      `${cfg.cta === "Purchase" ? "Purchasing" : "Booking"}: ${service.name}\n\nThis would integrate with a payment / scheduling flow.`
    );
  };

  return (
    <div
      className={`rounded-2xl border-2 ${cfg.accent} p-6 flex flex-col justify-between transition-shadow hover:shadow-md`}
    >
      <div>
        {/* Badge + icon */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${cfg.badge}`}
          >
            {service.type}
          </span>
          <span className="text-3xl">{cfg.icon}</span>
        </div>

        {/* Name & description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {service.description || "No description provided."}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
        <span className="text-2xl font-bold text-gray-900">
          ${service.price.toFixed(2)}
        </span>
        <button
          onClick={handleAction}
          className={`px-5 py-2 rounded-xl text-sm font-semibold text-white transition-colors cursor-pointer ${cfg.button}`}
        >
          {cfg.cta}
        </button>
      </div>
    </div>
  );
}
