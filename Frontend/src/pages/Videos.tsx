import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import { getAllVideos } from "../api/user";

interface Video {
  _id: string;
  title: string;
  youtube_url: string;
}

export function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllVideos();
        console.log(response,"here is the respodne")
        setVideos(response.data.data || []); // assuming API returns { success, data: [...] }
      } catch (err: any) {
        setError(err.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    console.log("first")
    fetchVideos();
    console.log("second")
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-400">Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-400">No videos uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">My Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="relative group bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-zinc-800 hover:border-red-600"
          >
            {/* Thumbnail: YouTube embed thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.youtube_url.split("v=")[1] || "dQw4w9WgXcQ"}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <PlayCircle className="h-14 w-14 text-red-500" />
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white truncate">
                {video.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">Click to play</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
