import { useState } from "react";

const BOARDING_SUITES = [
  {
    id: "s1",
    name: "Standard Cozy Den",
    pricePerNight: 38,
    icon: "🏠",
    tag: "Budget Friendly",
    description: "Comfortable climate-controlled private den with orthopedic bedding, 3 daily walks, and evening cuddle check.",
    features: ["Orthopedic Fleece Bed", "3× Daily Guided Walks", "Nightly Sleep Check", "Nutrient Water Bowls"],
  },
  {
    id: "s2",
    name: "Deluxe Sunshine Suite",
    pricePerNight: 58,
    icon: "🛋️",
    tag: "Most Popular",
    description: "Spacious private suite with indoor/outdoor garden access, social group play, and daily photo & video WhatsApp updates.",
    features: ["Private Grass Patio", "4× Walks + Dog Park Play", "Daily Photo/Video Updates", "Gourmet Bedtime Treat"],
  },
  {
    id: "s3",
    name: "VIP Royal Penthouse Villa",
    pricePerNight: 88,
    icon: "👑",
    tag: "Luxury All-Inclusive",
    description: "Ultra-luxurious suite featuring 24/7 personal webcam live-stream directly to your PawConnect app, heated floors, and private splash pool play.",
    features: ["24/7 Live HD Webcam Stream", "Unlimited Play Sessions", "Private Splash Pool", "Departure Grooming Bath"],
  },
];

export default function PetBoarding() {
  const [selectedSuite, setSelectedSuite] = useState(BOARDING_SUITES[1]);
  const [dropoffDate, setDropoffDate] = useState("2026-05-10");
  const [pickupDate, setPickupDate] = useState("2026-05-14");
  const [petName, setPetName] = useState("Buddy");
  const [addOnGrooming, setAddOnGrooming] = useState(true);
  const [addOnMeds, setAddOnMeds] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Calculate nights
  const d1 = new Date(dropoffDate);
  const d2 = new Date(pickupDate);
  const diffTime = Math.max(1, d2 - d1);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = nights * selectedSuite.pricePerNight;
  const groomingPrice = addOnGrooming ? 45 : 0;
  const medsPrice = addOnMeds ? 15 : 0;
  const totalPrice = basePrice + groomingPrice + medsPrice;

  const handleBook = (e) => {
    e.preventDefault();
    setBookingConfirmed({
      bookingCode: "PAW-STAY-" + Math.floor(10000 + Math.random() * 90000),
      suite: selectedSuite.name,
      pet: petName,
      dates: `${dropoffDate} to ${pickupDate} (${nights} nights)`,
      total: totalPrice,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Boarding & Luxury Daycare</h1>
          <p className="text-gray-500 mt-1">
            5-star safe pet hotel accommodations with 24/7 supervision, grass play yards, and live webcams
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
          🛡️ Vet-Supervised & Licensed Facility
        </span>
      </div>

      {bookingConfirmed ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 max-w-xl mx-auto shadow-md text-center">
          <span className="text-6xl block mb-3">🏨</span>
          <h2 className="text-2xl font-bold text-gray-900">Boarding Reservation Confirmed!</h2>
          <p className="font-mono text-sm text-emerald-700 font-bold mt-1">{bookingConfirmed.bookingCode}</p>

          <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-xs space-y-2">
            <p><strong>Companion Pet:</strong> {bookingConfirmed.pet}</p>
            <p><strong>Suite Type:</strong> {bookingConfirmed.suite}</p>
            <p><strong>Duration:</strong> {bookingConfirmed.dates}</p>
            <p><strong>Total Stay Cost:</strong> ${bookingConfirmed.total} (Includes selected add-ons)</p>
            <p className="text-emerald-700 font-semibold pt-1">
              ✓ 24/7 Collar Telemetry will link automatically to the facility dashboard.
            </p>
          </div>

          <button
            onClick={() => setBookingConfirmed(null)}
            className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
          >
            Book Another Boarding Stay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suite Options */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Choose Your Pet's Suite</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BOARDING_SUITES.map((suite) => {
                const isSelected = selectedSuite.id === suite.id;
                return (
                  <div
                    key={suite.id}
                    onClick={() => setSelectedSuite(suite)}
                    className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{suite.icon}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-700">
                          {suite.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-gray-900">{suite.name}</h4>
                      <p className="text-xl font-extrabold text-emerald-700 mt-1">
                        ${suite.pricePerNight} <span className="text-xs font-normal text-gray-500">/ night</span>
                      </p>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{suite.description}</p>

                      <ul className="space-y-1.5 text-xs text-gray-600 mt-4 pt-3 border-t border-gray-100">
                        {suite.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className={`mt-4 w-full py-2 rounded-xl text-xs font-bold ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {isSelected ? "Selected Suite ✓" : "Select Suite"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reservation Sidebar Form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Reservation Details</h3>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Pet to Board
                  </label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      required
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs space-y-2">
                  <p className="font-semibold text-gray-700">Optional Care Add-Ons:</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnGrooming}
                      onChange={(e) => setAddOnGrooming(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span>Departure Bath & Nail Trim (+$45)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnMeds}
                      onChange={(e) => setAddOnMeds(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span>Medication Administration Daily (+$15)</span>
                  </label>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>{selectedSuite.name} ({nights} nights)</span>
                    <span>${basePrice}</span>
                  </div>
                  {addOnGrooming && (
                    <div className="flex justify-between text-gray-500">
                      <span>Departure Bath Add-on</span>
                      <span>+$45</span>
                    </div>
                  )}
                  {addOnMeds && (
                    <div className="flex justify-between text-gray-500">
                      <span>Medication Care Add-on</span>
                      <span>+$15</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
                    <span>Total Amount</span>
                    <span className="text-emerald-700">${totalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Reserve Boarding Stay ➔
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
