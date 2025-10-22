import { User, IUser } from '../models/user';
import { Video, IVideo } from "../models/videos";
import bcrypt from 'bcrypt';

export class UserService {
  async register(email: string, password: string): Promise<IUser> {
    const existing = await User.findOne({ email });
    if (existing) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    return user.save(); // ✅ returns actual user document with _id
  }

  async login(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null; // ✅ returns actual user
  }

  async addVideo(data: { title: string; youtube_url: string }): Promise<IVideo> {
    const { title, youtube_url } = data;

    // Optional: YouTube URL validation
    const isYouTubeLink = /^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(youtube_url);
    if (!isYouTubeLink) {
      throw new Error("Invalid YouTube URL format.");
    }

    const newVideo = new Video({ title, youtube_url });
    await newVideo.save();
    return newVideo;
  }

  // Fetch all videos
  async getAllVideos(): Promise<IVideo[]> {
    return Video.find().sort({ createdAt: -1 });
  }
}
