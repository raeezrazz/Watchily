import { User, IUser } from '../models/user';
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
}
