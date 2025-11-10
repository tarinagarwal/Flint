import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async getProfileByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const result = await userService.getProfileByUsername(username);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },
};
