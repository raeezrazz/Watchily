// utils/youtube.ts
export const getYouTubeEmbedUrl = (url: string) => {
    try {
      // Supports standard and short URLs
      let videoId = "";
      if (url.includes("youtube.com")) {
        const params = new URL(url).searchParams;
        videoId = params.get("v") || "";
      } else if (url.includes("youtu.be")) {
        videoId = url.split("/").pop() || "";
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
      return "";
    }
  };
  
  export const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = "";
      if (url.includes("youtube.com")) {
        const params = new URL(url).searchParams;
        videoId = params.get("v") || "";
      } else if (url.includes("youtu.be")) {
        videoId = url.split("/").pop() || "";
      }
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
    } catch {
      return "";
    }
  };
  