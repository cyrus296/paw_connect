import { useCallback, useEffect, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths broken by bundlers
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const POLL_INTERVAL_MS = 5000;
const DEFAULT_CENTER = [37.7749, -122.4194]; // San Francisco fallback

// ── Small helper that re-centres the map when the pet moves ──────────
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat != null && lng != null) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

// ── Main component ───────────────────────────────────────────────────
export default function PetTracking() {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe-zone radius in metres — user can customise
  const [safeRadius, setSafeRadius] = useState(200);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/health-metrics");
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      // API returns newest first — pick the first entry with GPS
      const withGps = data.find(
        (m) => m.gps && m.gps.latitude != null && m.gps.longitude != null
      );
      if (withGps) setLatest(withGps);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatest();
    const id = setInterval(fetchLatest, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchLatest]);

  const center =
    latest?.gps?.latitude != null
      ? [latest.gps.latitude, latest.gps.longitude]
      : DEFAULT_CENTER;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pet Tracking</h1>
        <p className="text-gray-500 mt-1">
          Live GPS location & safe-zone geofencing
        </p>
      </header>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium">Safe-zone radius:</span>
          <input
            type="range"
            min={50}
            max={1000}
            step={50}
            value={safeRadius}
            onChange={(e) => setSafeRadius(Number(e.target.value))}
            className="accent-emerald-500"
          />
          <span className="w-16 text-right font-semibold text-emerald-700">
            {safeRadius} m
          </span>
        </label>

        {latest && (
          <span className="text-xs text-gray-400">
            Last update:{" "}
            {new Date(latest.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        )}
      </div>

      {/* Map */}
      {loading ? (
        <div className="flex items-center justify-center h-96 text-gray-400 animate-pulse">
          Loading map…
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <MapContainer
            center={center}
            zoom={16}
            scrollWheelZoom={true}
            style={{ height: "520px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {latest && (
              <>
                <RecenterMap lat={center[0]} lng={center[1]} />

                {/* Pet marker */}
                <Marker position={center}>
                  <Popup>
                    <div className="text-sm leading-relaxed">
                      <p className="font-semibold">🐾 Pet Location</p>
                      <p>
                        Lat: {latest.gps.latitude.toFixed(6)}
                        <br />
                        Lng: {latest.gps.longitude.toFixed(6)}
                      </p>
                      <p className="mt-1 text-gray-500">
                        ❤️ {latest.heartRate} bpm &nbsp; 🌡️{" "}
                        {latest.temperature} °F
                      </p>
                    </div>
                  </Popup>
                </Marker>

                {/* Safe-zone geofence circle */}
                <Circle
                  center={center}
                  radius={safeRadius}
                  pathOptions={{
                    color: "#10b981",
                    fillColor: "#10b981",
                    fillOpacity: 0.12,
                    weight: 2,
                    dashArray: "6 4",
                  }}
                />
              </>
            )}
          </MapContainer>
        </div>
      )}

      {/* Info cards */}
      {latest && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <InfoCard
            icon="📍"
            label="Latitude"
            value={latest.gps.latitude.toFixed(6)}
          />
          <InfoCard
            icon="📍"
            label="Longitude"
            value={latest.gps.longitude.toFixed(6)}
          />
          <InfoCard
            icon="🛡️"
            label="Safe Zone"
            value={`${safeRadius} m radius`}
          />
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
