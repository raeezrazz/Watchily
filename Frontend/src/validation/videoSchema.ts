import {z} from "zod"; 

export const videoSchema = z.object({
    title: z.string().trim().min(1, { message: "Title is required" }).max(200, { message: "Title must be less than 200 characters" }),
    youtube_url: z.string().trim().url({ message: "Invalid URL" }).refine((url) => {
      return url.includes('youtube.com') || url.includes('youtu.be');
    }, { message: "Must be a valid YouTube URL" }),
  });