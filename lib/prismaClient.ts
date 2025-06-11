import { PrismaClient } from "@prisma/client";

const newPrismaClient = () => {
  const isDebug = process.env.PRISMA_QUERY_LOG === "true";
  return isDebug ? new PrismaClient({ log: ["query"] }) : new PrismaClient();
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = newPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = newPrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
