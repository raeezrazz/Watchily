import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllVideos } from "../api/user";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { ArrowLeft } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "../utils/youtube";

interface Video {
  _id: string;
  title: string;
  youtube_url: string;
  created_at: string;
}

export function VideoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllVideos();
        const foundVideo = response.data.data.find((v: Video) => v._id === id);
        if (!foundVideo) throw new Error("Video not found");
        setVideo(foundVideo);
      } catch (err: any) {
        setError(err.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p className="text-gray-400 text-center mt-20">Loading video...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.youtube_url);
  const thumbnailUrl = getYouTubeThumbnail(video.youtube_url);

  return (
    <div className="p-6 min-h-screen bg-black text-white animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate("/videos")}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Videos
      </button>

      <Card className="max-w-4xl mx-auto border border-zinc-800 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full bg-zinc-800">
            {embedUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            ) : (
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <CardTitle className="text-2xl mb-2">{video.title}</CardTitle>
          <p className="text-gray-400 text-sm mb-4">
            Uploaded on: {new Date(video.created_at).toLocaleDateString()}
          </p>

          <p className="text-gray-400 mb-2">Original YouTube URL:</p>
          <a
            href={video.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-400 break-all"
          >
            {video.youtube_url}
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
