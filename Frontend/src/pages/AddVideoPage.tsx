import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";
import { videoSchema } from "../validation/videoSchema";
import { addVideo } from "../api/user";

export function AddVideoPage() {
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate data using Zod
    const validation = videoSchema.safeParse({
      title,
      youtube_url: youtubeLink, // <-- map your state to `youtube_url`
    });

    if (!validation.success) {
      alert(validation.error.format().title?._errors[0] ?? "Validation failed");
      return;
    }
    

    setLoading(true);

    try {
      // ✅ Send to backend (Axios handles JSON automatically)
      const response = await addVideo(validation.data);

      alert("✅ Video uploaded successfully!");
      setTitle("");
      setYoutubeLink("");
      navigate("/videos");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate("/videos")}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Videos
      </button>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Add New Video
            </h2>
            <p className="text-gray-400 text-sm">
              Upload your YouTube video details here
            </p>
          </div>
          <div className="p-3 bg-red-600/20 rounded-full">
            <Upload className="h-6 w-6 text-red-500" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-xl border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>

          {/* YouTube Link Field */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              YouTube Video Link
            </label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="Paste YouTube link here"
              className="w-full px-4 py-3 bg-zinc-800 text-white rounded-xl border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
            />
            <p className="text-gray-500 text-xs mt-1">
              Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)
            </p>
          </div>

          {/* Preview */}
          {youtubeLink && (
            <div className="mt-6">
              <h3 className="text-gray-300 text-sm mb-2">Preview</h3>
              <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
                <iframe
                  width="100%"
                  height="100%"
                  src={youtubeLink.replace("watch?v=", "embed/")}
                  title="Video Preview"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-red-500/30 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Video"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/videos")}
              className="flex-1 py-3 border border-zinc-700 hover:border-red-600 hover:text-red-400 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
