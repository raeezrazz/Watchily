import { Request, Response } from 'express';
import { authSchema } from '../dtos/authDTO';
import { UserService } from '../services/userService';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const parsed = authSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.format() });
      }

      const user = await userService.register(parsed.data.email, parsed.data.password);

      // Generate tokens
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      // ✅ Save refresh token in secure HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true on https
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
      });

      return res.status(201).json({
        success: true,
        message: "User registered and logged in successfully",
        data: {
          user,
          accessToken
        }
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const parsed = authSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.format() });
      }

      const user = await userService.login(parsed.data.email, parsed.data.password);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      // Generate tokens
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());

      // ✅ Save refresh token in secure HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user,
          accessToken
        }
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
