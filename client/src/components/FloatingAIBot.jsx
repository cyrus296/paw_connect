import { useEffect, useRef, useState } from "react";

export default function FloatingAIBot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "bot",
      text: "👋 Hi! I'm PawAI. Ask me anything about your pet's vitals, symptoms, diet, or behavior!",
      suggestions: ["Is 102.8°F normal?", "List toxic foods", "How to calm an anxious dog?"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text) => {
    const query = (text || input).trim();
    if (!query) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: query },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const q = query.toLowerCase();

      if (q.includes("temp") || q.includes("fever") || q.includes("hot") || q.includes("102") || q.includes("103")) {
        reply = "🌡️ Normal pet temperature is 100.0°F – 102.5°F. Readings above 103.5°F represent a fever. Above 105°F is a heatstroke emergency! Ensure cool water and ventilation.";
      } else if (q.includes("heart") || q.includes("bpm") || q.includes("pulse")) {
        reply = "❤️ Resting heart rate for dogs is 70–120 bpm (cats: 140–220 bpm). Spikes above 140 bpm during rest can indicate stress, heat exhaustion, or acute pain.";
      } else if (q.includes("chocolate") || q.includes("grape") || q.includes("onion") || q.includes("toxic") || q.includes("poison")) {
        reply = "🚨 EMERGENCY: Chocolate, grapes, raisins, onions, garlic, and xylitol (birch sugar) are highly toxic. Contact an emergency vet immediately if ingested!";
      } else if (q.includes("food") || q.includes("diet") || q.includes("kibble") || q.includes("eat")) {
        reply = "🍖 Feed a complete, balanced formula matching your pet's life stage. Check our Marketplace for NutriPaw Organic Grain-Free Blend!";
      } else if (q.includes("anxious") || q.includes("stress") || q.includes("calm") || q.includes("scared")) {
        reply = "😰 For stress/anxiety, create a quiet dimly-lit retreat, try calming pheromones (Adaptil/Feliway), and avoid sudden loud noises.";
      } else {
        reply = `🐾 Regarding "${query}": Monitor your pet's resting vitals on the Vittatc dashboard. If abnormal signs or lethargy persist over 24 hours, schedule a vet checkup!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: reply,
          suggestions: ["Normal vitals?", "Book vet checkup", "Safe human foods"],
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="mb-4 w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-bold text-sm leading-tight">PawAI Assistant</p>
                <p className="text-[10px] text-emerald-100">Live Pet Health & Vitals Q&A</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.("ai");
                }}
                className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-1 rounded-md transition-colors cursor-pointer"
                title="Expand to Full Page"
              >
                Expand ↗
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white p-1 text-base font-bold leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-xs">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>

                  {!isUser && m.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-1.5 max-w-[85%]">
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-2xl rounded-tl-none px-3 py-2 text-gray-400 max-w-[50%]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your pet..."
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-40"
            >
              ➔
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer group hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🤖</span>
        <span>Ask PawAI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
      </button>
    </div>
  );
}
