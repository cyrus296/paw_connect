import { useState } from "react";

const ADOPTION_PETS = [
  {
    id: "a1",
    name: "Barnaby",
    species: "Dog",
    breed: "Beagle & Hound Mix",
    age: "1.5 years",
    gender: "Male",
    avatar: "🐶",
    shelter: "Golden State Animal Rescue (San Francisco)",
    adoptionFee: 150,
    tags: ["Kid Friendly", "House Trained", "Energetic", "Loves Sniffing"],
    medical: "Neutered • Microchipped • Fully Vaccinated • Heartworm Negative",
    story: "Barnaby was found wandering near a regional park. He is extraordinarily sweet, loves other dogs, and will happily curl up on the sofa after a 30-minute sniffing walk.",
  },
  {
    id: "a2",
    name: "Luna & Stella (Bonded Pair)",
    species: "Cat",
    breed: "Domestic Shorthair (Tuxedo)",
    age: "2 years",
    gender: "Female",
    avatar: "🐱🐱",
    shelter: "Bay Area Feline Alliance (Oakland)",
    adoptionFee: 180,
    tags: ["Bonded Pair", "Purr Machine", "Indoor Only", "Lap Kitties"],
    medical: "Both Spayed • FeLV/FIV Negative • Up to Date on Vaccines",
    story: "Surrendered due to owner relocation. These sisters must be adopted together. They spend their days grooming each other and chirping at backyard birds through the window.",
  },
  {
    id: "a3",
    name: "Clover",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "8 months",
    gender: "Female",
    avatar: "🐇",
    shelter: "House Rabbit Society Rescue (Richmond)",
    adoptionFee: 65,
    tags: ["Litter Box Trained", "Gentle", "Vegetable Connoisseur"],
    medical: "Spayed • RHDV2 Vaccinated • Dental Health Checked",
    story: "Rescued from an overcrowded neglect situation. Clover has blossomed into a curious, gentle bunny who loves dandelion greens and soft forehead rubs.",
  },
  {
    id: "a4",
    name: "Diesel",
    species: "Dog",
    breed: "German Shepherd & Collie Mix",
    age: "3 years",
    gender: "Male",
    avatar: "🐕",
    shelter: "Silicon Valley Humane Society (San Jose)",
    adoptionFee: 125,
    tags: ["High Intelligence", "Agility Star", "Eager to Please"],
    medical: "Neutered • Fully Vaccinated • Strong Joint Health",
    story: "Brilliant, loyal working-line cross. Knows over 15 hand commands and will make the ultimate hiking and running buddy for an active outdoor family.",
  },
];

export default function PetAdoption() {
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "Alex Morgan",
    email: "alex@pawconnect.io",
    phone: "(415) 892-1029",
    housing: "House with Fenced Yard",
    experience: "Experienced Dog & Cat Owner (10+ years)",
    agreement: true,
  });

  const filtered =
    speciesFilter === "all"
      ? ADOPTION_PETS
      : ADOPTION_PETS.filter((p) => p.species === speciesFilter);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      const name = selectedPet.name;
      setSelectedPet(null);
      alert(`🎉 Adoption Application for "${name}" submitted to ${selectedPet.shelter}! A counselor will contact you within 24-48 hours.`);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">Pet Adoption Portal</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              🏡 Adopt, Don't Shop
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Give a second chance to rescued companions ready for their loving forever families
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
          🤝 Partnered with Verified Animal Shelters
        </span>
      </div>

      {/* Species Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: "all", label: "🐾 All Rescues" },
          { key: "Dog", label: "🐕 Dogs & Puppies" },
          { key: "Cat", label: "🐈 Cats & Kittens" },
          { key: "Rabbit", label: "🐇 Rabbits" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSpeciesFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              speciesFilter === tab.key
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl shadow-xs">
                    {pet.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-xs font-bold text-emerald-800">{pet.breed} • {pet.age} • {pet.gender}</p>
                    <p className="text-xs text-gray-400 mt-0.5">🏠 {pet.shelter}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">${pet.adoptionFee}</span>
                  <p className="text-[10px] text-gray-400">Adoption fee</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-xs text-gray-700 leading-relaxed mb-4">{pet.story}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pet.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Medical Cleared */}
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-800 font-medium">
                ✓ Medical: {pet.medical}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 mt-2">
              <button
                onClick={() => setSelectedPet(pet)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Apply to Adopt {pet.name} ➔
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Adoption Form Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-lg p-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏡</span>
                <h3 className="text-lg font-bold text-gray-900">
                  Adoption Application: {selectedPet.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPet(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="mt-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                <span className="text-3xl">{selectedPet.avatar}</span>
                <div className="text-xs">
                  <p className="font-bold text-gray-900">{selectedPet.name} ({selectedPet.breed})</p>
                  <p className="text-gray-600">{selectedPet.shelter} • Fee: ${selectedPet.adoptionFee}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={applicant.email}
                  onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Housing Situation
                </label>
                <select
                  value={applicant.housing}
                  onChange={(e) => setApplicant({ ...applicant, housing: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white text-gray-900 outline-none"
                >
                  <option value="House with Fenced Yard">House with Fenced Yard</option>
                  <option value="House without Yard">House without Yard</option>
                  <option value="Apartment / Condo">Apartment / Condo</option>
                  <option value="Farm / Rural Property">Farm / Rural Property</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Prior Pet Experience & Household Routine
                </label>
                <textarea
                  rows={3}
                  required
                  value={applicant.experience}
                  onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  required
                  checked={applicant.agreement}
                  onChange={(e) => setApplicant({ ...applicant, agreement: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span>I confirm that all household members agree to welcome this companion.</span>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedPet(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  {formSubmitted ? "Sending Application…" : "Submit Adoption Application ➔"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
