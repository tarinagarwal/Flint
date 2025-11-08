import { Request, Response } from "express";
import { collegeService } from "../services/college.service";

export const collegeController = {
  async getApprovedColleges(req: Request, res: Response) {
    try {
      const colleges = await collegeService.getApprovedColleges();
      res.status(200).json(colleges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async requestCollege(req: Request, res: Response) {
    try {
      const { name, location, emailDomain, requestedBy } = req.body;

      if (!name || !location || !emailDomain || !requestedBy) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const college = await collegeService.requestCollege({
        name,
        location,
        emailDomain,
        requestedBy,
      });

      res.status(201).json(college);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getPendingRequests(req: Request, res: Response) {
    try {
      const requests = await collegeService.getPendingRequests();
      res.status(200).json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async approveCollege(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const college = await collegeService.approveCollege(id);
      res.status(200).json(college);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async rejectCollege(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await collegeService.rejectCollege(id);
      res.status(200).json({ message: "College request rejected" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
