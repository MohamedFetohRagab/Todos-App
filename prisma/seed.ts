import { prisma } from "../prisma/prisma";
import { faker } from "@faker-js/faker";
async function main() {
  // Create a new user with a post
  // const user = await prisma.user.createMany({
  //   data: Array.from({ length: 30 }, () => ({
  //     name: faker.internet.username(),
  //     email: faker.internet.email(),
  //   })),
  // });
  // const todos = await prisma.todo.createMany({
  //   data: Array.from({ length: 30 }, () => ({
  //     title: faker.lorem.word(),
  //     body: faker.lorem.words(12),
  //   })),
  // });
  // console.log(user);
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
