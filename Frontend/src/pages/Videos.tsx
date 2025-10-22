import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus, Trash2 } from "lucide-react";
import { getAllVideos, } from "../api/user";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Buttons";

interface Video {
  _id: string;
  title: string;
  youtube_url: string;
  created_at: string;
}

export function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllVideos();
        setVideos(response.data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const getVideoThumbnail = (url: string) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
      );
      return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : null;
    } catch {
      return null;
    }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      // await apiDeleteVideo(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete video");
    }
  };

  if (loading) return <p className="text-gray-400 text-center mt-12">Loading videos...</p>;
  if (error) return <p className="text-red-500 text-center mt-12">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">My Videos</h1>

      {videos.length === 0 ? (
        <Card className="border-border/50 shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Play className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first video</p>
            <Button onClick={() => navigate("/add-video")} className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card
              key={video._id}
              className="border-border/50 shadow-card hover:shadow-glow transition-smooth cursor-pointer group"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                  {getVideoThumbnail(video.youtube_url) ? (
                    <img
                      src={getVideoThumbnail(video.youtube_url) || ""}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/video/${video._id}`)}
                      className="bg-primary/90 hover:bg-primary border-0"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">{video.title}</CardTitle>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                 
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
