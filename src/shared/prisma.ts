import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
  datasources: {
    db: {
      url: process.env.DATABASE_URL || process.env.DATABASE_URL_TWO,
    },
  },
});

export default prisma;
