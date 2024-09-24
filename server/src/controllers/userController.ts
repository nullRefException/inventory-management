import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.users.findMany();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retriving users" });
  }
};
