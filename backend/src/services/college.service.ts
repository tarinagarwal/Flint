import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const collegeService = {
  async getApprovedColleges() {
    return await prisma.college.findMany({
      where: { isApproved: true },
      select: {
        id: true,
        name: true,
        location: true,
        emailDomain: true,
      },
      orderBy: { name: "asc" },
    });
  },

  async requestCollege(data: {
    name: string;
    location: string;
    emailDomain: string;
    requestedBy: string;
  }) {
    // Check if college already exists
    const existing = await prisma.college.findFirst({
      where: {
        OR: [{ name: data.name }, { emailDomain: data.emailDomain }],
      },
    });

    if (existing) {
      throw new Error("College already exists or request pending");
    }

    return await prisma.college.create({
      data: {
        name: data.name,
        location: data.location,
        emailDomain: data.emailDomain,
        requestedBy: data.requestedBy,
        isApproved: false,
      },
    });
  },

  async getPendingRequests() {
    return await prisma.college.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: "desc" },
    });
  },

  async approveCollege(id: string) {
    return await prisma.college.update({
      where: { id },
      data: { isApproved: true },
    });
  },

  async rejectCollege(id: string) {
    return await prisma.college.delete({
      where: { id },
    });
  },
};
