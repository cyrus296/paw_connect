import { useState } from "react";

const INITIAL_POSTS = [
  {
    id: "p1",
    author: "Elena Rostova",
    handle: "@elena_tails",
    pet: "Kira (Siberian Husky)",
    avatar: "👩",
    time: "2 hours ago",
    category: "Cute Moments",
    title: "First time at the snow summit! ❄️",
    content: "Took Kira up to Tahoe this morning! Her PawConnect collar tracked a whopping 12.4 km of pure running. Safe zone alerts kept my mind completely at ease while she sprinted through the powder drifts!",
    imageEmoji: "🏔️🐶❄️",
    likes: 42,
    hasLiked: false,
    comments: [
      { author: "Mark C.", text: "Huskies in their natural habitat! What a beauty." },
      { author: "Sarah J.", text: "Make sure to check her paw pads for ice balls afterwards!" },
    ],
  },
  {
    id: "p2",
    author: "David Miller",
    handle: "@miller_dave",
    pet: "Cooper (French Bulldog)",
    avatar: "👨",
    time: "5 hours ago",
    category: "Health Tips",
    title: "PSA on Summer Walks & Heatstroke ☀️",
    content: "With temperatures hitting 85°F yesterday, Cooper's collar temperature sensor jumped up to 102.9°F in just 15 minutes of walking. Switched to early 6 AM walks and the cooling vest from the PawConnect store. Keep those short-snout pups cool everyone!",
    imageEmoji: "🐾🌡️🧊",
    likes: 68,
    hasLiked: true,
    comments: [
      { author: "Linda W.", text: "Crucial reminder! Pavement burns their paws too." },
    ],
  },
  {
    id: "p3",
    author: "Chloe Bennett",
    handle: "@chloeb_cats",
    pet: "Oliver (Ragdoll)",
    avatar: "👩‍🦰",
    time: "Yesterday",
    category: "Adoption & Rescue",
    title: "1-Year Gotcha Day Anniversary! 🎉",
    content: "Exactly 365 days ago, we brought Oliver home from the rescue portal. He went from a scared shelter kitty hiding behind the couch to our cuddliest family member. Adopt, don't shop!",
    imageEmoji: "🐈💖🎂",
    likes: 115,
    hasLiked: false,
    comments: [
      { author: "Elena R.", text: "Happy gotcha day Oliver! Ragdolls are pure love." },
    ],
  },
];

export default function PetCommunity() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Cute Moments",
    pet: "Buddy (Golden Retriever)",
    imageEmoji: "🐶✨",
  });
  const [newCommentInput, setNewCommentInput] = useState({});

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !p.hasLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = newCommentInput[postId]?.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { author: "You", text }],
          };
        }
        return p;
      })
    );
    setNewCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const created = {
      id: "post-" + Date.now(),
      author: "Alex Morgan",
      handle: "@alex_pawlover",
      pet: newPost.pet,
      avatar: "🧑",
      time: "Just now",
      category: newPost.category,
      title: newPost.title,
      content: newPost.content,
      imageEmoji: newPost.imageEmoji || "🐾❤️",
      likes: 1,
      hasLiked: true,
      comments: [],
    };

    setPosts([created, ...posts]);
    setShowCreateModal(false);
    setNewPost({
      title: "",
      content: "",
      category: "Cute Moments",
      pet: "Buddy (Golden Retriever)",
      imageEmoji: "🐶✨",
    });
  };

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PawConnect Community</h1>
          <p className="text-gray-500 mt-1">
            Connect with fellow pet lovers, share milestone moments, training wins, and advice
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          ✍️ Share a Pet Story / Post
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: "all", label: "🌟 All Stories" },
          { key: "Cute Moments", label: "🥰 Cute Moments" },
          { key: "Health Tips", label: "🩺 Health & Nutrition" },
          { key: "Adoption & Rescue", label: "🏡 Gotcha Days & Rescue" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === tab.key
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="max-w-2xl space-y-6">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Author Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{post.author}</span>
                    <span className="text-xs text-gray-400">{post.handle}</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold">{post.pet}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-600">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.time}</span>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="text-base font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {/* Media Snippet */}
            <div className="my-4 h-32 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-100/60 flex items-center justify-center text-4xl shadow-inner">
              {post.imageEmoji}
            </div>

            {/* Like & Comment Bar */}
            <div className="flex items-center gap-6 pt-3 border-t border-gray-100 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                  post.hasLiked ? "text-rose-600" : "text-gray-500 hover:text-rose-600"
                }`}
              >
                <span>{post.hasLiked ? "❤️" : "🤍"}</span>
                <span>{post.likes} Likes</span>
              </button>
              <span className="text-gray-400 font-medium">💬 {post.comments.length} Comments</span>
            </div>

            {/* Comments Thread */}
            {post.comments.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-50 space-y-2">
                {post.comments.map((c, i) => (
                  <div key={i} className="text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <strong className="text-gray-900">{c.author}:</strong>{" "}
                    <span className="text-gray-700">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Comment Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Leave a supportive comment..."
                value={newCommentInput[post.id] || ""}
                onChange={(e) =>
                  setNewCommentInput({ ...newCommentInput, [post.id]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddComment(post.id);
                }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-gray-300 text-xs text-gray-800 outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Share with the Pet Community</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white outline-none"
                >
                  <option value="Cute Moments">🥰 Cute Moments</option>
                  <option value="Health Tips">🩺 Health & Nutrition</option>
                  <option value="Adoption & Rescue">🏡 Gotcha Days & Rescue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hiking with Bella, or How we stopped leash pulling"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Story / Advice *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details, tips, or what your pet did today..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
