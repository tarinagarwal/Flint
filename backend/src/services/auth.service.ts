import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";

const prisma = new PrismaClient();

export const authService = {
  async signup(data: {
    name: string;
    username: string;
    email: string;
    password: string;
    collegeId: string;
  }) {
    const { name, username, email, password, collegeId } = data;

    // Check if username exists (case insensitive)
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("Email already registered");
    }

    // Verify college exists and is approved
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college || !college.isApproved) {
      throw new Error("College not found or not approved");
    }

    // Verify email domain matches college
    const emailDomain = email.split("@")[1];
    if (emailDomain !== college.emailDomain) {
      throw new Error("Email domain does not match college");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
        collegeId,
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

    // Generate token
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: Boolean(user.isAdmin),
        isOnboarded: Boolean(user.isOnboarded),
        college: user.college,
      },
    };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
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
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: Boolean(user.isAdmin),
        isOnboarded: Boolean(user.isOnboarded),
        college: user.college,
      },
    };
  },
};
