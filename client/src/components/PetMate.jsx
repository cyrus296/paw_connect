import { useState } from "react";

const MATING_PROFILES = [
  {
    id: "m1",
    name: "Sir Winston",
    species: "Dog",
    breed: "Golden Retriever",
    gender: "Male",
    age: "3.5 years",
    avatar: "🐕",
    pedigree: "AKC Champion Bloodline",
    location: "San Francisco, CA (4.2 miles)",
    owner: "Marcus Vance",
    healthClearance: "OFA Hips Excellent • Eyes & Heart Certified Clear",
    temperament: "Gentle, Affectionate, Highly Trainable",
    description: "Athletic, dark golden coat with calm disposition. Has produced two healthy litters of therapy assistance prospects.",
  },
  {
    id: "m2",
    name: "Princess Cleo",
    species: "Dog",
    breed: "Golden Retriever",
    gender: "Female",
    age: "2.8 years",
    avatar: "🦮",
    pedigree: "AKC Registered",
    location: "San Jose, CA (18 miles)",
    owner: "Jessica Lin",
    healthClearance: "Full Embark Genetic DNA Clear (No PRA/Ichthyosis)",
    temperament: "Playful, Loving, Great with Children",
    description: "Beautiful medium-golden female in peak physical health. Regular agility training and pristine vet records.",
  },
  {
    id: "m3",
    name: "Apollo Storm",
    species: "Dog",
    breed: "Siberian Husky",
    gender: "Male",
    age: "4 years",
    avatar: "🐺",
    pedigree: "CKC Registered",
    location: "Oakland, CA (8.5 miles)",
    owner: "Elena Rostova",
    healthClearance: "SHOR Eye Clearance • Hip Dysplasia Negative",
    temperament: "High Stamina, Friendly, Vocal",
    description: "Striking bi-eyed silver/white husky with strong sled-dog lineage and friendly pack demeanor.",
  },
  {
    id: "m4",
    name: "Duchess Mia",
    species: "Cat",
    breed: "Persian",
    gender: "Female",
    age: "2.5 years",
    avatar: "🐈",
    pedigree: "CFA Registered Grand Champion",
    location: "Berkeley, CA (6.1 miles)",
    owner: "Sophia Laurent",
    healthClearance: "PKD Negative • FeLV/FIV Negative",
    temperament: "Quiet, Sweet, Lap Cat",
    description: "Doll-faced white Persian with copper eyes. Indoor only, raised on raw nutrition with immaculate coat.",
  },
];

export default function PetMate() {
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchRequestSent, setMatchRequestSent] = useState(false);
  const [requestMessage, setRequestMessage] = useState(
    "Hi! I love your pet's pedigree and gentle temperament. I would love to connect and share Buddy's health and pedigree certificates."
  );

  const filtered = MATING_PROFILES.filter((p) => {
    if (speciesFilter !== "all" && p.species !== speciesFilter) return false;
    if (selectedBreed !== "all" && p.breed !== selectedBreed) return false;
    return true;
  });

  const handleSendMatch = (e) => {
    e.preventDefault();
    setMatchRequestSent(true);
    setTimeout(() => {
      setMatchRequestSent(false);
      setSelectedProfile(null);
      alert(`🎉 Match request and pedigree files sent to ${selectedProfile.owner}! You will receive an alert once accepted.`);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">Pet Mate Matchmaker</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              💕 Verified Breeding
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Connect with verified pedigreed companion breeders and matches with health screenings and temperament checks
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
          🛡️ DNA & Health Clearances Verified
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2">
          {["all", "Dog", "Cat"].map((s) => (
            <button
              key={s}
              onClick={() => setSpeciesFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                speciesFilter === s
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {s === "all" ? "🐾 All Species" : s === "Dog" ? "🐕 Dogs" : "🐈 Cats"}
            </button>
          ))}
        </div>

        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white text-gray-800 outline-none"
        >
          <option value="all">All Breeds</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Siberian Husky">Siberian Husky</option>
          <option value="Persian">Persian</option>
        </select>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-4xl shadow-xs">
                    {profile.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                      <span className="text-xs font-semibold text-rose-600">
                        {profile.gender === "Male" ? "♂ Male" : "♀ Female"}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-800">{profile.breed} • {profile.age}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📍 {profile.location}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-900 border border-amber-200">
                  {profile.pedigree}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{profile.description}</p>

              {/* Health & Temperament badges */}
              <div className="space-y-2 text-xs py-3 border-y border-gray-100">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Health Screenings</span>
                  <span className="font-semibold text-emerald-700">✓ {profile.healthClearance}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Temperament</span>
                  <span className="text-gray-700">{profile.temperament}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Guardian Owner</span>
                  <span className="text-gray-700">{profile.owner}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 mt-2">
              <button
                onClick={() => setSelectedProfile(profile)}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>💌 Send Match / Mating Request</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Match Request Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💌</span>
                <h3 className="text-lg font-bold text-gray-900">
                  Request Connection with {selectedProfile.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendMatch} className="mt-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3">
                <span className="text-3xl">{selectedProfile.avatar}</span>
                <div className="text-xs">
                  <p className="font-bold text-gray-900">{selectedProfile.name} ({selectedProfile.breed})</p>
                  <p className="text-gray-600">Owner: {selectedProfile.owner} • {selectedProfile.location}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Select Your Registered Pet to Mate
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs bg-white text-gray-900 outline-none">
                  <option value="buddy">Buddy (Golden Retriever • 3 years • Male)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Introduction & Pedigree Notes
                </label>
                <textarea
                  rows={4}
                  required
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500">
                🔒 Your pet's vaccination passport and genetic test reports will be safely shared with {selectedProfile.owner}.
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={matchRequestSent}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer"
                >
                  {matchRequestSent ? "Submitting Request…" : "Transmit Match Request ➔"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
