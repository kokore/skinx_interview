import { PrismaClient } from "@prisma/client";
const jsonData = require("./posts.json");

interface Seed {
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

const prisma = new PrismaClient();

async function seed() {
  const postData: Seed[] = jsonData;
  console.log("Start Seeding...");

  for (const data of postData) {
    const { tags, ...postData } = data;
    const post = await prisma.post.create({
      data: {
        ...postData,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { tag_name: tag },
            create: { tag_name: tag },
          })),
        },
      },
    });

    console.log("Created post:", post);
  }

  console.log("Seeding finished.");
}

seed()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
