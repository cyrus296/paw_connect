import { useState } from "react";

export default function LocateMyPet({ onNavigate }) {
  const [selectedSize, setSelectedSize] = useState("Medium (15-40 lbs)");
  const [selectedColor, setSelectedColor] = useState("Emerald Green");
  const [orderSuccess, setOrderSuccess] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-gray-950 via-gray-900 to-emerald-950 text-white p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            📡 Next-Gen IoT Wearable
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            PawConnect IoT Smart Belt: <br />
            <span className="text-emerald-400">Never Lose Your Companion Again.</span>
          </h1>
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            Continuous real-time GPS tracking, 4G cellular telemetry, geofenced escape alarms, and edge AI fall detection packed into an ultra-durable, waterproof collar belt.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => onNavigate?.("tracking")}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>📍 View Live Collar Map</span>
            </button>
            <a
              href="#specs"
              className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 text-white font-semibold text-sm transition-all"
            >
              Explore Device Specs ↓
            </a>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center flex-col text-center p-6 backdrop-blur-xs">
          <span className="text-6xl mb-2">🛰️</span>
          <span className="text-xs font-mono font-bold text-emerald-400">4G LTE-M + GPS</span>
          <span className="text-[10px] text-gray-400 mt-1">100% Submersible IP68</span>
        </div>
      </div>

      {/* Connected Collar Status Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl">
              🐶
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">Buddy's Connected IoT Collar</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Stream
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Device ID: PC-IOT-7749 • Firmware v2.4.1</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Battery Level</span>
              <span className="text-sm font-bold text-emerald-600">🔋 88% (11 Days left)</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Cellular Signal</span>
              <span className="text-sm font-bold text-gray-900">📶 4G LTE (Strong)</span>
            </div>
            <button
              onClick={() => onNavigate?.("tracking")}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Open Live Tracker ➔
            </button>
          </div>
        </div>
      </div>

      {/* Hardware Features Grid */}
      <div id="specs" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">📍</span>
          <h3 className="text-base font-bold text-gray-900">Global Satellite Positioning</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Multi-constellation GPS, GLONASS, and Galileo support with accurate 2.5-meter radius pinpointing.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">🛡️</span>
          <h3 className="text-base font-bold text-gray-900">Smart Geofence Escape Alert</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Draw custom safe zones around your home or park. Receive an instant phone push notification the second your pet leaves.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">🌊</span>
          <h3 className="text-base font-bold text-gray-900">Military-Grade IP68 Waterproof</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Submersible in up to 3 meters of water for 30 minutes. Mud, lake swimming, and torrential rain ready.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">⚡</span>
          <h3 className="text-base font-bold text-gray-900">Edge AI Fall & Impact Detection</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Embedded 3-axis accelerometer & gyroscope calculates edge inference to alert you immediately if your pet falls or is trapped.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">💡</span>
          <h3 className="text-base font-bold text-gray-900">Remote Night Search Beacon</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Ultra-bright high-lumens LED light toggleable directly from the app to spot your pet in pitch-dark conditions up to 300 meters away.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <span className="text-3xl block mb-3">🔋</span>
          <h3 className="text-base font-bold text-gray-900">14-Day Rechargeable Battery</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Smart power optimization switches to standby when pet is resting. Fast magnetic snap-on charger included.
          </p>
        </div>
      </div>

      {/* Product Purchase Box */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-8 shadow-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800">
              Limited Founder Edition
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              Order PawConnect IoT Belt
            </h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Package includes: 1× Smart Belt Collar with Tracker Module, 1× Magnetic USB-C Quick Charger, and 1-Year complimentary cellular data plan.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Small (Up to 15 lbs)", "Medium (15-40 lbs)", "Large (40+ lbs)"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === s
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {s.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Collar Color
                </label>
                <div className="flex gap-2">
                  {[
                    { name: "Emerald Green", color: "bg-emerald-600" },
                    { name: "Midnight Black", color: "bg-gray-900" },
                    { name: "Sunset Coral", color: "bg-rose-500" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                        selectedColor === c.name
                          ? "border-gray-900 bg-gray-50 text-gray-900 font-bold"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${c.color}`}></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">$89.00</span>
                <span className="text-sm line-through text-gray-400">$129.00</span>
                <span className="text-xs text-emerald-600 font-bold">Save $40</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 mt-4">
                <li>✓ Free 1-Year Global 4G LTE-M Cellular Telemetry</li>
                <li>✓ Live GPS Tracking & Safe-Zone Geofencing</li>
                <li>✓ Built-in Temperature & Heart Rate Monitors</li>
                <li>✓ Free Express 2-Day Shipping</li>
                <li>✓ 30-Day Money-Back Guarantee</li>
              </ul>
            </div>

            {orderSuccess ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-center text-xs font-bold text-emerald-900">
                🎉 Pre-Order Received! Delivery dispatched in 24 hours.
              </div>
            ) : (
              <button
                onClick={() => setOrderSuccess(true)}
                className="mt-6 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Purchase IoT Smart Belt ($89) ➔
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
