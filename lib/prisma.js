// Prisma database client singleton pattern
import { PrismaClient } from "@prisma/client";

// Reuse existing instance or create new one
export const db = globalThis.prisma || new PrismaClient();

// In dev, save to globalThis to prevent hot-reload from creating multiple connections
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
