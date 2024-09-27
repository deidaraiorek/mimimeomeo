// index.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "John Doe",
    },
  });
  console.log("Created new user:", newUser);

  // Fetch all users
  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
