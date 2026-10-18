import { useEffect, useRef, useState } from "react";

// Veterinary & Pet Care Knowledge Engine
const KNOWLEDGE_BASE = [
  {
    keywords: ["fever", "temperature", "temp", "hot", "warm", "102", "103", "104"],
    response: `🌡️ **Pet Body Temperature Guidelines:**
• **Normal Range:** 100.0°F – 102.5°F (38.0°C – 39.2°C) for both dogs and cats.
• **Mild Elevation:** 102.6°F – 103.5°F. Often caused by excitement, warm environment, or mild stress. Ensure access to cool water and shade.
• **High Fever:** Above 103.5°F is a medical fever. Above 105.0°F is a **life-threatening emergency (heatstroke)**.

💡 *Tip:* Check your pet's current live temperature reading on the **Vittatc Dashboard**. If it stays consistently high, please book a vet consultation via our **Marketplace**.`,
    suggestions: ["How to cool down a dog?", "Book a vet appointment", "Signs of heatstroke"],
  },
  {
    keywords: ["heart rate", "pulse", "bpm", "heart", "cardio", "tachycardia"],
    response: `❤️ **Pet Heart Rate Benchmarks:**
• **Dogs (Resting):**
  - Large breeds: 60 – 100 bpm
  - Medium breeds: 80 – 120 bpm
  - Puppies & Toy breeds: 100 – 140 bpm
• **Cats (Resting):** 140 – 220 bpm.

⚠️ Persistent resting heart rates above 130 bpm in adult dogs while relaxed can signify pain, anxiety, or cardiovascular strain. Our **PawConnect collar** continuously logs these vitals to detect spikes early!`,
    suggestions: ["Why is heart rate elevated?", "What causes pet anxiety?", "View vitals chart"],
  },
  {
    keywords: ["chocolate", "cocoa", "grapes", "raisin", "onion", "garlic", "toxic", "poison", "xylitol", "avocado"],
    response: `🚨 **EMERGENCY TOXICITY WARNING:**
The following common foods are **highly dangerous** to pets:
• **Chocolate & Cocoa:** Contains theobromine. Dark chocolate is especially lethal.
• **Grapes & Raisins:** Can trigger acute, irreversible kidney failure.
• **Xylitol / Birch Sugar:** Found in sugar-free gum & peanut butter; causes rapid hypoglycemia and liver necrosis.
• **Onions & Garlic:** Damages red blood cells, causing severe hemolytic anemia.
• **Lilies (Cats):** Even pollen or water from the vase can cause fatal feline kidney failure.

⚠️ *Action Required:* If ingested recently, contact an emergency vet or Pet Poison Helpline immediately. Do not induce vomiting without veterinary instructions!`,
    suggestions: ["Can dogs eat peanut butter?", "Safe human foods for pets", "Emergency vet near me"],
  },
  {
    keywords: ["food", "diet", "nutrition", "eat", "feed", "kibble", "hungry"],
    response: `🍖 **Pet Nutrition Best Practices:**
1. **Balanced Nutrition:** Look for foods meeting AAFCO standards tailored to your pet's life stage (puppy/kitten, adult, senior).
2. **Portion Control:** Follow package guidelines adjusted for activity level. High-activity pets burn 20-30% more calories.
3. **Hydration:** Always provide fresh water daily. Adding wet food or bone broth helps maintain urinary health.

🛒 Check out **NutriPaw Organic Blend** in our **Marketplace** for high-protein, omega-rich formulas!`,
    suggestions: ["NutriPaw food details", "How much water do pets need?", "Healthy treats"],
  },
  {
    keywords: ["exercise", "walk", "activity", "play", "energy", "lazy", "tired"],
    response: `🏃 **Daily Exercise Requirements:**
• **High-Energy Dogs (Golden Retrievers, Huskies, Shepherds):** 60 – 90 minutes of vigorous activity daily (fetch, running, agility).
• **Medium-Energy Dogs (Beagles, Poodles, Spaniels):** 30 – 60 minutes of brisk walking and play.
• **Low-Energy & Brachycephalic (Bulldogs, Pugs):** 20 – 30 minutes of gentle walks (avoid extreme heat).
• **Indoor Cats:** 15 – 30 minutes of interactive wand or laser chasing per day.

💡 If your pet's activity is marked **"low"** on the dashboard, check the **Recommendation Engine** for personalized exercise tips!`,
    suggestions: ["Indoor games for rainy days", "How to calm an active dog", "Senior pet exercise"],
  },
  {
    keywords: ["fall", "tamper", "alarm", "alert", "banner", "sensor", "anomaly"],
    response: `🚨 **PawConnect Edge Anomaly Detection:**
The wearable collar houses high-precision accelerometer and gyro sensors:
• **Fall Detection:** Triggers when extreme g-forces ($>10g$) followed by sudden inactivity are registered. Check your pet for limping, bruising, or shock.
• **Tamper Detection:** Fires when rapid irregular vibrations or collar displacement indicate the device has caught on something or is being pulled off.

When detected, a prominent red alert banner will flash on the **Vittatc Dashboard** with exact vitals at that second.`,
    suggestions: ["What to do if pet fell?", "Adjust safe-zone geofence", "View Vittatc Dashboard"],
  },
  {
    keywords: ["gps", "track", "tracking", "geofence", "safe zone", "lost", "location", "map"],
    response: `📍 **GPS Tracking & Geofencing:**
• The multi-sensor collar tag transmits live coordinates directly to your **Pet Tracking** map.
• The emerald circle represents your **Safe Zone** (customizable from 50m to 1000m radius).
• If the pet roams outside this perimeter, you can track their real-time trajectory with OpenStreetMap satellite pinpointing.`,
    suggestions: ["Open Pet Tracking map", "How to adjust safe zone", "GPS battery life"],
  },
  {
    keywords: ["vet", "doctor", "appointment", "clinic", "checkup", "grooming", "services"],
    response: `🩺 **Integrated Marketplace Services:**
PawConnect connects you directly with certified pet care professionals:
1. **Comprehensive Vet Exam:** Complete clinical examination, vaccine booster check, and lab review.
2. **Deluxe Grooming & Spa:** De-shedding wash, sanitary trim, ear cleaning, and nail care.
3. **NutriPaw Organic Food:** Doorstep grain-free nutrition delivery.

👉 Visit the **Marketplace** tab to book an appointment or purchase supplies with one click!`,
    suggestions: ["Go to Marketplace", "How often should pets visit the vet?", "Grooming frequency"],
  },
  {
    keywords: ["anxious", "stress", "scared", "fear", "panting", "shaking", "barking"],
    response: `😰 **Managing Pet Stress & Anxiety:**
Common triggers include loud noises (thunder/fireworks), separation, or routine changes.
• **Comfort Strategies:** Create a dark, quiet den with familiar blankets.
• **Pheromone Diffusers:** Products like Adaptil (dogs) or Feliway (cats) provide calming synthetic scent signals.
• **Physical Exercise:** A well-exercised pet has lower cortisol and rests more deeply.

💡 If our dashboard frequently flags **"Stress: High"**, review the **Recommendation Engine** for targeted calming routines.`,
    suggestions: ["Signs of separation anxiety", "Calming music for pets", "Book consultation"],
  },
  {
    keywords: ["hello", "hi", "hey", "who are you", "help", "start", "introduce"],
    response: `🐾 **Hello! I'm PawAI, your 24/7 Pet Care & Vitals Assistant.**

I can help you with:
• **Vitals Analysis:** Interpreting heart rate, body temp, and activity levels.
• **Health & Nutrition:** Dietary guidance, safe treats, and toxicity warnings.
• **Behavior & Exercise:** Training routines, anxiety tips, and breed traits.
• **PawConnect Support:** Geofencing, telemetry anomalies, and booking services.

What would you like to know about your pet today?`,
    suggestions: [
      "Is 102.8°F fever for a dog?",
      "Can dogs eat blueberries?",
      "How to set up a geofence?",
      "Why is my pet's heart rate high?",
    ],
  },
];

function generateResponse(query) {
  const normalized = query.toLowerCase();

  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return {
        text: item.response,
        suggestions: item.suggestions,
      };
    }
  }

  // Fallback intelligent response
  return {
    text: `🐾 **PawAI Assistant:**
Thank you for your question about *"**${query.replace(/[*_#]/g, "")}**"*.

Here are good general veterinary guidelines:
1. **Monitor Vitals:** Check your pet's current resting vitals on the **Vittatc Dashboard**. Normal temperature is 100°F–102.5°F and resting heart rate is 70–120 bpm.
2. **Watch Behavior:** Observe appetite, hydration, bathroom habits, and energy level. Sudden behavioral changes often precede physical symptoms.
3. **Professional Care:** If symptoms persist for more than 24 hours, schedule an exam with a licensed veterinarian via our **Marketplace**.

Can I help you check specific vitals, toxic ingredients, or exercise recommendations?`,
    suggestions: [
      "Check normal temperature range",
      "List toxic foods for pets",
      "Book a vet checkup",
      "How does GPS tracking work?",
    ],
  };
}

export default function AIAssistant({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: `👋 **Welcome to PawAI!** I'm your pet health assistant. Ask me anything about your pet's vitals, diet, behavior, emergency first aid, or how to use the PawConnect collar features!`,
      timestamp: new Date(),
      suggestions: [
        "🌡️ What is a normal pet temperature?",
        "🍫 What foods are toxic to dogs and cats?",
        "🏃 How much exercise does my pet need?",
        "🛒 How do I book a vet checkup?",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const { text, suggestions } = generateResponse(query);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text,
        suggestions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "fresh",
        sender: "bot",
        text: "✨ Chat cleared. How can I help you and your pet today?",
        timestamp: new Date(),
        suggestions: [
          "Check normal vitals",
          "What foods are toxic?",
          "How to handle pet anxiety?",
        ],
      },
    ]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8 flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-sm">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">PawAI Assistant</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Ask questions on vitals, diet, behavior, symptoms, or collar features
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`flex gap-3 max-w-2xl ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0 mt-1">
                    🐾
                  </div>
                )}

                <div
                  className={`rounded-2xl px-5 py-3.5 shadow-xs text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {m.text}

                  {/* Context Action Links inside bot message */}
                  {!isUser && m.text.includes("Marketplace") && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => onNavigate?.("marketplace")}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-800 underline cursor-pointer"
                      >
                        👉 Browse Services on Marketplace
                      </button>
                    </div>
                  )}

                  {!isUser && m.text.includes("Pet Tracking") && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => onNavigate?.("tracking")}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-800 underline cursor-pointer"
                      >
                        👉 Open Live GPS Tracking Map
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {new Date(m.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              {/* Suggestions chips below bot message */}
              {!isUser && m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-2xl pl-11">
                  {m.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1 rounded-full text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm shrink-0">
              🐾
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
              <span className="text-xs text-gray-400 ml-2">PawAI is typing…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-3 shrink-0"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pet vitals, toxic foods, symptoms, training, or safe zones..."
            className="w-full pl-4 pr-24 py-3.5 rounded-2xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-40"
          >
            Send ➔
          </button>
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-2">
          PawAI provides guidance based on veterinary principles. In urgent medical emergencies, immediately contact an emergency veterinarian.
        </p>
      </form>
    </div>
  );
}
