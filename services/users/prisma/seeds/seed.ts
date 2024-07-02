import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      role: "ADMIN",
      email: "admin@example.com",
      password: "$2b$10$7J71inj.vUDHD57SvBoI3uDmhBzc.xUuek8efcq7ctCgU0wXK9Goe", // "password"
      firstName: "The",
      lastName: "Boss",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      role: "USER",
      email: "user@example.com",
      password: "$2b$10$7J71inj.vUDHD57SvBoI3uDmhBzc.xUuek8efcq7ctCgU0wXK9Goe", // "password"
      firstName: "That",
      lastName: "Guy",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
