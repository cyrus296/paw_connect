import { useState } from "react";

const ESSENTIALS_CATALOG = [
  // Pet Food
  {
    id: "f1",
    category: "food",
    name: "NutriPaw Organic Dry Kibble (10kg)",
    description: "Grain-free, high-protein formula loaded with omega-3 fatty acids for shiny coat and joint health.",
    price: 42.99,
    tag: "Best Seller",
    icon: "🍖",
    inStock: true,
  },
  {
    id: "f2",
    category: "food",
    name: "Wild Alaskan Salmon & Sweet Potato",
    description: "Single-source novel protein, freeze-dried raw bites designed for pets with sensitive digestion.",
    price: 36.5,
    tag: "Hypoallergenic",
    icon: "🐟",
    inStock: true,
  },
  {
    id: "f3",
    category: "food",
    name: "Probiotic Immunity Daily Soft Chews (90ct)",
    description: "Veterinarian-formulated digestive enzymes and pumpkin fiber to settle upset stomachs.",
    price: 24.0,
    tag: "Gut Health",
    icon: "🦴",
    inStock: true,
  },

  // Clothes & Apparel
  {
    id: "c1",
    category: "clothes",
    name: "All-Weather Fleece Thermal Winter Coat",
    description: "Windproof and water-resistant shell with high-visibility reflective trim and belly guard.",
    price: 34.99,
    tag: "Winter Essential",
    icon: "🧥",
    inStock: true,
  },
  {
    id: "c2",
    category: "clothes",
    name: "Breathable Summer Evaporative Cooling Vest",
    description: "Activated water-cooling fabric that dissipates heat to prevent canine heatstroke during hot walks.",
    price: 29.5,
    tag: "Summer Gear",
    icon: "🦺",
    inStock: true,
  },
  {
    id: "c3",
    category: "clothes",
    name: "High-Visibility Rainy Day Waterproof Poncho",
    description: "Ultra-lightweight ripstop nylon with integrated leash portal and adjustable chest buckle.",
    price: 22.0,
    tag: "Rainproof",
    icon: "🌧️",
    inStock: true,
  },

  // Belts, Harnesses & Leashes
  {
    id: "b1",
    category: "belts",
    name: "Ergonomic No-Pull Padded Chest Harness",
    description: "Distributes pulling pressure across chest and shoulders to prevent tracheal damage and choking.",
    price: 28.99,
    tag: "Top Rated",
    icon: "🦮",
    inStock: true,
  },
  {
    id: "b2",
    category: "belts",
    name: "Reflective Glow-in-the-Dark Bungee Leash (6ft)",
    description: "Shock-absorbing elastic core that dampens abrupt lunges with padded neoprene handle.",
    price: 19.99,
    tag: "Night Safety",
    icon: "✨",
    inStock: true,
  },
  {
    id: "b3",
    category: "belts",
    name: "Hands-Free Jogging & Hiking Waist Belt",
    description: "Dual-bungee tether with zippered pouch for phone, keys, poop bags, and emergency treats.",
    price: 27.5,
    tag: "Outdoor Active",
    icon: "🏃",
    inStock: true,
  },

  // Toys & Enrichment
  {
    id: "t1",
    category: "toys",
    name: "Indestructible Natural Rubber Chew Bone",
    description: "Made from ultra-durable non-toxic natural rubber for aggressive chewers. Fillable with peanut butter.",
    price: 14.99,
    tag: "Durable",
    icon: "🎾",
    inStock: true,
  },
  {
    id: "t2",
    category: "toys",
    name: "Smart Treat-Dispensing IQ Puzzle Feeder",
    description: "Stimulates mental sharpness and slows down fast eaters to improve digestion and curb anxiety.",
    price: 21.5,
    tag: "Brain Game",
    icon: "🧩",
    inStock: true,
  },
  {
    id: "t3",
    category: "toys",
    name: "Automatic Rolling LED Laser Ball",
    description: "Self-rotating interactive ball with obstacle avoidance to keep cats and energetic dogs occupied.",
    price: 18.0,
    tag: "Interactive",
    icon: "⚡",
    inStock: true,
  },
];

export default function PetEssentials({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredItems =
    activeTab === "all"
      ? ESSENTIALS_CATALOG
      : ESSENTIALS_CATALOG.filter((i) => i.category === activeTab);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Food & Essentials Store</h1>
          <p className="text-gray-500 mt-1">
            Premium organic nutrition, protective clothes, ergonomic belts, harnesses, and interactive toys
          </p>
        </div>

        <button
          onClick={() => setShowCartModal(true)}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>🛒 Cart</span>
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
          <span className="text-emerald-400 font-mono">${totalAmount.toFixed(2)}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: "all", label: "🌟 All Products" },
          { key: "food", label: "🍖 Pet Food & Nutrition" },
          { key: "clothes", label: "🧥 Clothes & Apparel" },
          { key: "belts", label: "🦮 Belts, Harnesses & Leashes" },
          { key: "toys", label: "🎾 Toys & Enrichment" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{item.icon}</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.name}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{item.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
              <div>
                <span className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                <p className="text-[10px] text-emerald-600 font-semibold">✓ In Stock • Fast Dispatch</p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart & Checkout Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Your Pet Essentials Cart</h2>
              <button
                onClick={() => {
                  setShowCartModal(false);
                  setCheckoutComplete(false);
                }}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {checkoutComplete ? (
              <div className="py-8 text-center">
                <span className="text-5xl block mb-3">📦</span>
                <h3 className="text-xl font-bold text-gray-900">Order Placed Successfully!</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
                  Your pet food and supplies have been scheduled for priority delivery. Tracking details sent to your registered email!
                </p>
                <button
                  onClick={() => {
                    setCart([]);
                    setCheckoutComplete(false);
                    setShowCartModal(false);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Back to Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <span className="text-4xl block mb-2">🛒</span>
                <p className="text-sm font-semibold">Your cart is currently empty</p>
                <p className="text-xs text-gray-400 mt-1">Explore our nutritious food, clothes, and belts above!</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] text-gray-500">
                          ${item.price.toFixed(2)} × {item.qty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-900">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Standard Express Shipping</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-emerald-700">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutComplete(true)}
                  className="mt-4 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Complete Order & Fast Ship ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
