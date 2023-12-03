import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Tag {
  id: number;
  tag_name: string;
}

export const getTags = async (): Promise<Tag[] | null> => {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};
