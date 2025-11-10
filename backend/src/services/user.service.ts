import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  async getProfileByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username.toLowerCase(),
          mode: "insensitive",
        },
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Map backend gender preference to frontend
    const genderPreferenceMap: { [key: string]: string } = {
      all: "everyone",
      male: "male",
      female: "female",
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        gender: user.gender,
        interests: user.interests,
        photos: user.photos,
        college: user.college,
        preferences: user.isOnboarded
          ? {
              lookingFor: "friendship",
              ageRange: {
                min: user.preferredAgeMin || 18,
                max: user.preferredAgeMax || 30,
              },
              distance: user.preferredDistance || 50,
              genderPreference:
                genderPreferenceMap[user.preferredGender || "all"] ||
                "everyone",
            }
          : null,
      },
    };
  },
};
