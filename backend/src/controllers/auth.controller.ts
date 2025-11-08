import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async signup(req: Request, res: Response) {
    try {
      const { name, username, email, password, collegeId } = req.body;

      if (!name || !username || !email || !password || !collegeId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const result = await authService.signup({
        name,
        username,
        email,
        password,
        collegeId,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const result = await authService.login(email, password);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
