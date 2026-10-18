import { useCallback, useEffect, useState } from "react";

// Predefined breed lists grouped by species
const BREED_DIRECTORY = {
  Dog: [
    "Golden Retriever",
    "Labrador Retriever",
    "German Shepherd",
    "French Bulldog",
    "Beagle",
    "Poodle",
    "Siberian Husky",
    "Rottweiler",
    "Boxer",
    "Dachshund",
    "Pomeranian",
    "Shih Tzu",
    "Border Collie",
    "Australian Shepherd",
    "Great Dane",
    "Pembroke Welsh Corgi",
    "Yorkshire Terrier",
    "Chihuahua",
    "Doberman Pinscher",
    "Bernese Mountain Dog",
    "Mixed Breed",
    "Other",
  ],
  Cat: [
    "Domestic Shorthair",
    "Persian",
    "Maine Coon",
    "Siamese",
    "Bengal",
    "British Shorthair",
    "Ragdoll",
    "Sphynx",
    "Scottish Fold",
    "Abyssinian",
    "Birman",
    "Russian Blue",
    "Norwegian Forest Cat",
    "Burmese",
    "Mixed Breed",
    "Other",
  ],
  Bird: [
    "Budgerigar (Budgie)",
    "Cockatiel",
    "Canary",
    "Lovebird",
    "African Grey Parrot",
    "Macaw",
    "Cockatoo",
    "Conure",
    "Finch",
    "Amazon Parrot",
    "Other",
  ],
  Rabbit: [
    "Holland Lop",
    "Netherland Dwarf",
    "Mini Rex",
    "Lionhead",
    "Flemish Giant",
    "English Angora",
    "Dutch Rabbit",
    "Mini Lop",
    "Other",
  ],
  Other: ["Other"],
};

const SPECIES_ICONS = {
  Dog: "🐕",
  Cat: "🐈",
  Bird: "🦜",
  Rabbit: "🐇",
  Other: "🐾",
};

export default function MyPets({ onNavigate }) {
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "Golden Retriever",
    customBreed: "",
    age: "",
    ownerId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [foodOrderingPet, setFoodOrderingPet] = useState(null);
  const [foodOrderSuccess, setFoodOrderSuccess] = useState(false);

  // Fetch pets and owners
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [petsRes, usersRes] = await Promise.all([
        fetch("/api/pets"),
        fetch("/api/users"),
      ]);

      if (!petsRes.ok) throw new Error("Failed to load pets list");
      const petsData = await petsRes.json();
      setPets(petsData);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
        if (usersData.length > 0 && !formData.ownerId) {
          setFormData((prev) => ({ ...prev, ownerId: usersData[0]._id }));
        }
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [formData.ownerId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Species Change and update available breeds
  const handleSpeciesChange = (newSpecies) => {
    const availableBreeds = BREED_DIRECTORY[newSpecies] || ["Other"];
    setFormData((prev) => ({
      ...prev,
      species: newSpecies,
      breed: availableBreeds[0],
      customBreed: "",
    }));
  };

  // Submit New Pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError("Pet name is required.");
      return;
    }
    if (formData.age === "" || isNaN(formData.age) || Number(formData.age) < 0) {
      setFormError("Please enter a valid age (0 or higher).");
      return;
    }

    const finalBreed =
      formData.breed === "Other"
        ? formData.customBreed.trim() || "Mixed / Other"
        : formData.breed;

    const payload = {
      name: formData.name.trim(),
      species: formData.species,
      breed: finalBreed,
      age: Number(formData.age),
      ownerId: formData.ownerId || (users[0] ? users[0]._id : undefined),
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create pet");
      }

      const newPet = await res.json();
      setPets((prev) => [newPet, ...prev]);
      setShowModal(false);
      setSuccessMessage(`🐾 "${newPet.name}" successfully registered!`);
      setTimeout(() => setSuccessMessage(null), 4000);

      // Reset form
      setFormData({
        name: "",
        species: "Dog",
        breed: "Golden Retriever",
        customBreed: "",
        age: "",
        ownerId: users[0]?._id || "",
      });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a pet
  const handleDelete = async (petId, petName) => {
    if (!window.confirm(`Are you sure you want to remove "${petName}"?`)) return;

    try {
      const res = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete pet");
      setPets((prev) => prev.filter((p) => p._id !== petId));
    } catch (err) {
      alert(err.message);
    }
  };

  const breedsList = BREED_DIRECTORY[formData.species] || ["Other"];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
          <p className="text-gray-500 mt-1">
            Manage your companion profiles, breed info, and connected smart collars
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <span className="text-lg leading-none">+</span> Add New Pet
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-center justify-between">
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-600 hover:text-emerald-900 text-xs font-bold"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Quick Overview Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <span className="text-3xl">🐾</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Pets
            </p>
            <p className="text-2xl font-bold text-gray-900">{pets.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <span className="text-3xl">📡</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Active Collars
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {pets.length > 0 ? "1 Connected" : "None"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <span className="text-3xl">🛡️</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Safe Zones Active
            </p>
            <p className="text-2xl font-bold text-indigo-600">200m Radius</p>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-400 animate-pulse text-lg">
          Loading pet profiles…
        </div>
      ) : pets.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
          <span className="text-5xl block mb-3">🐶</span>
          <h3 className="text-lg font-bold text-gray-800">No Pets Registered Yet</h3>
          <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
            Add your first pet to start tracking continuous heart rate, temperature,
            GPS location, and activity metrics!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm cursor-pointer shadow-sm"
          >
            + Add Your Pet Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => {
            const icon = SPECIES_ICONS[pet.species] || "🐾";
            return (
              <div
                key={pet._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Species and Delete */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl">
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {pet.name}
                        </h3>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mt-0.5">
                          {pet.species}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(pet._id, pet.name)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm p-1 cursor-pointer"
                      title="Remove pet"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Attributes */}
                  <div className="space-y-2.5 text-sm py-3 border-y border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Breed:</span>
                      <span className="font-medium text-gray-800">
                        {pet.breed || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Age:</span>
                      <span className="font-medium text-gray-800">
                        {pet.age} {pet.age === 1 ? "year old" : "years old"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Owner:</span>
                      <span className="font-medium text-gray-800">
                        {pet.ownerId?.name || "Alex Morgan"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="mt-5 pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate?.("dashboard")}
                    className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-white transition-colors cursor-pointer text-center"
                  >
                    📊 Vitals
                  </button>
                  <button
                    onClick={() => onNavigate?.("tracking")}
                    className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer text-center"
                  >
                    📍 Live GPS
                  </button>
                  <button
                    onClick={() => setFoodOrderingPet(pet)}
                    className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors cursor-pointer text-center"
                  >
                    🍖 Order Food
                  </button>
                  <button
                    onClick={() => onNavigate?.("health")}
                    className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors cursor-pointer text-center"
                  >
                    🏥 Health Log
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Pet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🐾</span>
                <h2 className="text-xl font-bold text-gray-900">Add New Pet</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Error in modal */}
            {formError && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                ⚠️ {formError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Pet Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Pet Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luna, Milo, Rocky"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                />
              </div>

              {/* Species Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Species *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["Dog", "Cat", "Bird", "Rabbit"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => handleSpeciesChange(s)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                        formData.species === s
                          ? "border-emerald-500 bg-emerald-50/60 font-semibold text-emerald-900"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                      }`}
                    >
                      <span className="text-2xl mb-1">{SPECIES_ICONS[s]}</span>
                      <span className="text-xs">{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Breed Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Breed *
                </label>
                <select
                  value={formData.breed}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, breed: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 bg-white"
                >
                  {breedsList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                {/* If "Other" selected, allow custom breed entry */}
                {formData.breed === "Other" && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      placeholder="Specify custom breed name..."
                      value={formData.customBreed}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customBreed: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                    />
                  </div>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Age (years) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  required
                  placeholder="e.g. 2.5"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, age: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                />
              </div>

              {/* Owner Selector */}
              {users.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Owner
                  </label>
                  <select
                    value={formData.ownerId}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, ownerId: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900 bg-white"
                  >
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Saving Pet…" : "Save Pet Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Pet Food Modal directly in My Pets */}
      {foodOrderingPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍖</span>
                <h3 className="text-lg font-bold text-gray-900">
                  Order Tailored Food for {foodOrderingPet.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setFoodOrderingPet(null);
                  setFoodOrderSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {foodOrderSuccess ? (
              <div className="py-8 text-center">
                <span className="text-5xl block mb-3">🚚</span>
                <h4 className="text-xl font-bold text-emerald-900">Food Order Dispatched!</h4>
                <p className="text-xs text-gray-600 mt-2 max-w-xs mx-auto">
                  Priority express delivery scheduled for {foodOrderingPet.name}. A notification has been logged in your Alerts manager.
                </p>
                <button
                  onClick={() => {
                    setFoodOrderingPet(null);
                    setFoodOrderSuccess(false);
                  }}
                  className="mt-6 px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs">
                  <p className="font-bold text-amber-900">
                    Recommended formula for {foodOrderingPet.name} ({foodOrderingPet.breed || foodOrderingPet.species}):
                  </p>
                  <p className="text-amber-800 mt-0.5">
                    Grain-free high-protein kibble balanced with joint glucosamine and real salmon oil.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="foodPlan" defaultChecked className="accent-emerald-600 w-4 h-4" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">NutriPaw Organic Dry Kibble (10kg Bag)</p>
                        <p className="text-[11px] text-gray-500">~30 Days Supply for {foodOrderingPet.name}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-800">$42.99</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="foodPlan" className="accent-emerald-600 w-4 h-4" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Freeze-Dried Salmon Raw Bites (500g)</p>
                        <p className="text-[11px] text-gray-500">Digestive high-protein topper</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$28.50</span>
                  </label>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-600">Auto-Ship Delivery:</span>
                  <span className="text-emerald-700 font-bold">Every 4 Weeks (Save 10%)</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t text-sm font-bold">
                  <span>Total Amount</span>
                  <span className="text-emerald-700 text-lg">$42.99</span>
                </div>

                <button
                  type="button"
                  onClick={() => setFoodOrderSuccess(true)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Place Food Order Now ($42.99) ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
