import { useState } from "react";

const VET_DOCTORS = [
  {
    id: "v1",
    name: "Dr. Sarah Jenkins, DVM",
    specialty: "General Wellness & Preventive Medicine",
    clinic: "Bay Paws Animal Hospital",
    rating: 4.9,
    reviews: 142,
    fee: 65,
    avatar: "👩‍⚕️",
    experience: "12 years",
    availability: "Today, 02:30 PM",
  },
  {
    id: "v2",
    name: "Dr. Mark Cooper, BVSc",
    specialty: "Canine Orthopedics & Sports Medicine",
    clinic: "MetroVet Specialist Care",
    rating: 4.8,
    reviews: 98,
    fee: 80,
    avatar: "👨‍⚕️",
    experience: "15 years",
    availability: "Tomorrow, 10:00 AM",
  },
  {
    id: "v3",
    name: "Dr. Lisa Wong, DVM, DACVD",
    specialty: "Dermatology & Allergy Management",
    clinic: "Pacific Pet Dermatology",
    rating: 5.0,
    reviews: 86,
    fee: 90,
    avatar: "👩‍⚕️",
    experience: "9 years",
    availability: "Today, 04:15 PM",
  },
];

export default function PetVet({ onNavigate }) {
  const [activeMode, setActiveMode] = useState("clinic"); // "clinic" | "online" | "chat"

  // Booking Form State
  const [selectedDoctor, setSelectedDoctor] = useState(VET_DOCTORS[0]);
  const [bookingDate, setBookingDate] = useState("2026-05-02");
  const [bookingTime, setBookingTime] = useState("02:30 PM");
  const [visitReason, setVisitReason] = useState("Annual Wellness Check & Telemetry Review");
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Live Vet Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m1",
      sender: "vet",
      doctor: "Dr. Emily Watson (DVM - Online Duty)",
      text: "👋 Hello! I am Dr. Emily Watson, on-duty emergency veterinary consultant. How is your pet feeling right now? Please share any symptoms, recent vitals, or behavioral changes.",
      time: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed({
      id: "BK-" + Math.floor(100000 + Math.random() * 900000),
      doctor: selectedDoctor.name,
      clinic: selectedDoctor.clinic,
      date: bookingDate,
      time: bookingTime,
      reason: visitReason,
      mode: activeMode === "clinic" ? "In-Person Clinic Visit" : "HD Online Video Consultation",
      fee: selectedDoctor.fee,
    });
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: chatInput.trim(),
      time: "Just now",
    };
    setChatMessages((prev) => [...prev, userMsg]);
    const query = chatInput.toLowerCase();
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      if (query.includes("vomit") || query.includes("diarrhea") || query.includes("throw up")) {
        reply = "Thank you for the update. With acute GI upset, withhold food for 6-8 hours while ensuring small sips of fresh water. If there is blood, lethargy, or inability to keep water down, this requires an immediate emergency clinic visit.";
      } else if (query.includes("scratch") || query.includes("itch") || query.includes("ear") || query.includes("skin")) {
        reply = "Frequent scratching or head shaking commonly indicates an ear yeast infection or environmental atopic allergy. Avoid OTC human creams. I recommend booking an in-person otoscopic exam with Dr. Lisa Wong so we can prescribe targeted antibacterial or antifungal drops.";
      } else if (query.includes("limp") || query.includes("leg") || query.includes("hurt") || query.includes("pain")) {
        reply = "Please inspect the paw pads for thorns, cuts, or torn nails. Restrict jumping and running for the next 24 hours. If weight-bearing does not improve by tomorrow morning, an orthopedic radiograph (X-ray) is recommended.";
      } else {
        reply = `I have logged this clinical symptom. Looking at your pet's recent telemetry on PawConnect, vitals appear steady. Keep monitoring resting respiration and temperature. If symptoms worsen, use the 'Book Appointment' tab to reserve an in-clinic exam.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "vet",
          doctor: "Dr. Emily Watson (DVM - Online Duty)",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Vet Care</h1>
          <p className="text-gray-500 mt-1">
            Book certified veterinary clinics, schedule online video visits, or consult instantly via live chat
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-200/80 self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveMode("clinic");
              setBookingConfirmed(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === "clinic" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            🏥 In-Clinic Visit
          </button>
          <button
            onClick={() => {
              setActiveMode("online");
              setBookingConfirmed(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === "online" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📹 Online Video Vet
          </button>
          <button
            onClick={() => setActiveMode("chat")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === "chat" ? "bg-emerald-600 text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            💬 Instant Live Chat
          </button>
        </div>
      </div>

      {/* Mode 1 & 2: Clinic & Video Consult Booking */}
      {(activeMode === "clinic" || activeMode === "online") && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {activeMode === "clinic" ? "Available Certified Clinics & Doctors" : "Online Video Telehealth Doctors"}
            </h3>

            {VET_DOCTORS.map((doc) => {
              const isSelected = selectedDoctor.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl shrink-0">
                      {doc.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-gray-900">{doc.name}</h4>
                        <span className="text-xs text-amber-500 font-bold">★ {doc.rating}</span>
                        <span className="text-xs text-gray-400">({doc.reviews})</span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-800 mt-0.5">{doc.specialty}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        📍 {doc.clinic} • {doc.experience} exp
                      </p>
                      <p className="text-xs text-indigo-700 font-medium mt-1">
                        ⚡ Next Available: {doc.availability}
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:pl-6 border-gray-100 flex sm:flex-col items-center sm:items-end justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${doc.fee}</span>
                      <p className="text-[11px] text-gray-400">Consultation fee</p>
                    </div>
                    <button
                      className={`mt-2 px-4 py-1.5 rounded-xl text-xs font-bold ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {isSelected ? "Selected ✓" : "Select"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Booking Summary Panel */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {activeMode === "clinic" ? "🏥 Clinic Appointment" : "📹 Video Telehealth Booking"}
              </h3>

              {bookingConfirmed ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-4xl block mb-2">🎉</span>
                  <h4 className="text-base font-bold text-emerald-900">Appointment Confirmed!</h4>
                  <p className="font-mono text-xs text-emerald-700 font-bold mt-1">{bookingConfirmed.id}</p>
                  <div className="text-left text-xs text-gray-600 mt-4 space-y-1.5 border-t border-emerald-200/60 pt-3">
                    <p><strong>Doctor:</strong> {bookingConfirmed.doctor}</p>
                    <p><strong>Type:</strong> {bookingConfirmed.mode}</p>
                    <p><strong>Date & Time:</strong> {bookingConfirmed.date} at {bookingConfirmed.time}</p>
                    <p><strong>Fee:</strong> ${bookingConfirmed.fee} (Paid via PawConnect)</p>
                  </div>
                  <button
                    onClick={() => setBookingConfirmed(null)}
                    className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 cursor-pointer"
                  >
                    Book Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Doctor Selected
                    </label>
                    <p className="text-sm font-bold text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-xs text-gray-500">{selectedDoctor.clinic}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 bg-white outline-none"
                    >
                      <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                      <option value="11:30 AM">11:30 AM - 12:00 PM</option>
                      <option value="02:30 PM">02:30 PM - 03:00 PM</option>
                      <option value="04:15 PM">04:15 PM - 04:45 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                      Reason for Visit
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annual exam, limping, fever"
                      value={visitReason}
                      onChange={(e) => setVisitReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Consultation Fee</span>
                    <span className="text-xl font-bold text-gray-900">${selectedDoctor.fee}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
                  >
                    Confirm & Reserve Appointment ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Instant Live Vet Chat */}
      {activeMode === "chat" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="px-6 py-4 bg-emerald-700 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👩‍⚕️</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">Dr. Emily Watson, DVM</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Live Now
                  </span>
                </div>
                <p className="text-xs text-emerald-100">Licensed Emergency Triage & General Pet Physician</p>
              </div>
            </div>
            <div className="text-xs text-emerald-100 text-right">
              <p>Connected Pet: <strong>Buddy (Golden Retriever)</strong></p>
              <p className="text-[10px] text-emerald-200">Collar Vitals Synchronized</p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 text-sm">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-xl rounded-2xl px-5 py-3.5 shadow-2xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {!isUser && (
                      <p className="text-xs font-bold text-emerald-700 mb-1">{msg.doctor}</p>
                    )}
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-xs text-xs text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                <span className="ml-1">Dr. Emily is reviewing vitals…</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-gray-100 flex gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type symptoms, behaviors, or questions for Dr. Emily Watson..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors cursor-pointer disabled:opacity-40"
            >
              Send Message ➔
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
