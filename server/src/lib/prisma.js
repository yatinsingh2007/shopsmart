const { PrismaClient } = require('@prisma/client');

// Global variable to prevent multiple Prisma client instances
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

module.exports = global.prisma;
