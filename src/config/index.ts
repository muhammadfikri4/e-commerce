import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

export const db = new PrismaClient();


