import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runDb() {
  try {
    await prisma.user.create({
      data: {
        email: "demo1@gmail.com",
        username: "demo",
        posts: {
          create: {
            data: "A post",
            comments: {
              create: {
                data: "A Comment",
              },
            },
          },
        },
      },
    });
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
  } catch (err) {
    if (err.code === "P2002") {
      return console.log("Duplicate data");
    }
    // console.log(err.message);
    console.log(err.code);
  }
}

runDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
