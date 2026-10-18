import { useState } from "react";

const VIDEOS_LIBRARY = [
  {
    id: "v1",
    category: "grooming",
    title: "Mastering At-Home Dog Bath & Coat De-Shedding",
    duration: "14:20",
    instructor: "Elena Rostova (Master Groomer)",
    views: "34.2K",
    difficulty: "Beginner",
    thumbnail: "🚿",
    description: "Learn professional bathing techniques, proper water temperatures, and how to use undercoat rakes without scratching skin.",
    steps: [
      "Brush out mats thoroughly before wetting the coat.",
      "Check water temperature (lukewarm, never hot).",
      "Dilute shampoo 1:5 with water for even lather.",
      "Thoroughly dry with a high-velocity towel, paying special attention to armpits and ears.",
    ],
  },
  {
    id: "v2",
    category: "grooming",
    title: "Stress-Free Nail Trimming & Quick Avoidance",
    duration: "08:45",
    instructor: "Elena Rostova (Master Groomer)",
    views: "52.1K",
    difficulty: "Intermediate",
    thumbnail: "✂️",
    description: "How to identify the pink blood quick, hold paws securely, and use positive treat reinforcement to eliminate nail-trim fear.",
    steps: [
      "Desensitize the paw by touching toes and rewarding with peanut butter.",
      "Locate the quick under good lighting (cut at a 45-degree angle).",
      "Trim millimeter by millimeter; look for the gray dot in the center.",
      "Keep styptic powder or cornstarch handy in case of accidental bleeds.",
    ],
  },
  {
    id: "v3",
    category: "training",
    title: "Perfect Loose-Leash Walking in 3 Simple Drills",
    duration: "18:10",
    instructor: "Marcus Vance (CPDT-KA Certified Trainer)",
    views: "89.4K",
    difficulty: "Beginner",
    thumbnail: "🐕",
    description: "Stop pulling immediately using the 'Red Light / Green Light' method and high-value focal boundary rewards.",
    steps: [
      "Stop dead in your tracks the instant leash tension is felt.",
      "Wait for pet to look back or step toward you.",
      "Click/mark and reward immediately at your side seam.",
      "Practice in low-distraction environments first before neighborhood walks.",
    ],
  },
  {
    id: "v4",
    category: "first-aid",
    title: "Canine & Feline CPR / Emergency Choking Rescue",
    duration: "11:35",
    instructor: "Dr. Sarah Jenkins, DVM",
    views: "104K",
    difficulty: "Crucial / All Owners",
    thumbnail: "🩺",
    description: "Step-by-step life-saving veterinary protocol for airway clearance and chest compressions during sudden respiratory distress.",
    steps: [
      "Check responsiveness and verify airway obstruction with finger sweep.",
      "Perform modified Heimlich: 5 sharp upward abdominal thrusts behind ribs.",
      "Position pet on right side; compress chest 100-120 bpm (1/3 chest width).",
      "Provide 2 rescue breaths into nose for every 30 compressions.",
    ],
  },
  {
    id: "v5",
    category: "nutrition",
    title: "DIY Nutrient-Dense Bone Broth & Meal Toppers",
    duration: "12:50",
    instructor: "Chef Julian Ortiz (Pet Nutritionist)",
    views: "27.8K",
    difficulty: "Beginner",
    thumbnail: "🍲",
    description: "Brewing collagen-rich broth from beef marrow bones and apple cider vinegar to soothe gut inflammation and joint stiffness.",
    steps: [
      "Roast marrow bones for 25 minutes at 400°F.",
      "Simmer in slow cooker with water + 2 tbsp apple cider vinegar for 24 hours.",
      "Discard all cooked bones; skim fat layer after chilling.",
      "Pour into silicone molds and freeze for daily meal toppers.",
    ],
  },
  {
    id: "v6",
    category: "grooming",
    title: "Feline Gentle Ear Cleaning & Teeth Brushing Guide",
    duration: "09:15",
    instructor: "Elena Rostova (Master Groomer)",
    views: "19.3K",
    difficulty: "Intermediate",
    thumbnail: "🐱",
    description: "Keep cat ears free of black yeast buildup and introduce enzymatic poultry-flavored toothpaste without stress.",
    steps: [
      "Warm veterinary ear solution to body temperature.",
      "Apply 2-3 drops into ear canal; gently massage ear base (listen for squish).",
      "Wipe excess debris with a soft cotton pad (never use Q-tips deep in ear).",
      "Introduce toothbrush gradually using chicken-flavored veterinary paste.",
    ],
  },
];

export default function VideoAcademy() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filtered =
    activeCategory === "all"
      ? VIDEOS_LIBRARY
      : VIDEOS_LIBRARY.filter((v) => v.category === activeCategory);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pet Care & Grooming Video Academy</h1>
          <p className="text-gray-500 mt-1">
            Certified video masterclasses covering grooming, positive training, canine first-aid, and nutrition
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
          🎓 Free for PawConnect Members
        </span>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: "all", label: "🌟 All Masterclasses" },
          { key: "grooming", label: "✂️ Bathing & Grooming" },
          { key: "training", label: "🐕 Obedience & Training" },
          { key: "first-aid", label: "🏥 First Aid & Safety" },
          { key: "nutrition", label: "🍲 Nutrition & Cooking" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.key
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="h-44 bg-gradient-to-br from-emerald-900 via-gray-900 to-gray-950 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform">{video.thumbnail}</span>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-gray-900 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[11px] font-bold">
                  {video.duration}
                </span>
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-wider">
                  {video.category}
                </span>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span className="font-medium text-gray-700">{video.instructor.split("(")[0]}</span>
              <span>👁️ {video.views}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Mock Player Screen */}
            <div className="bg-gray-950 text-white h-72 flex flex-col items-center justify-center relative p-6 text-center">
              <span className="text-6xl mb-3 animate-pulse">{selectedVideo.thumbnail}</span>
              <p className="font-bold text-lg text-emerald-400">{selectedVideo.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                Instructor: {selectedVideo.instructor} • Duration: {selectedVideo.duration}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => alert("Simulating HD Video Playback! Step-by-step instructions loaded below.")}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  ▶ Play Full Lesson (HD)
                </button>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Steps & Takeaways */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  Step-by-Step Training Protocol
                </h4>
                <div className="mt-3 space-y-2.5">
                  {selectedVideo.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <strong>💡 Pro Veterinary Advice:</strong> Always pair new grooming or training experiences with high-value treats to create positive associative memory!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
