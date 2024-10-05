import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = process.env.PRISMA_QUERY_LOG === 'true' ? new PrismaClient({ log: ['query'] }) : new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
