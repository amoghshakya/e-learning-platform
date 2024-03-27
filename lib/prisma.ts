import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = global.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
