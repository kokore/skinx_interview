import { PrismaClient } from "@prisma/client";

import { Tag } from "./tag";

const prisma = new PrismaClient();

export interface PostsRequest {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  page?: string;
  pageSize?: string;
  tag?: string;
}

export interface PostResponse {
  id: number;
  title: string;
  tags: Tag[];
}

export const getPost = async (id: number): Promise<PostResponse | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const getPosts = async (
  query: PostsRequest
): Promise<PostResponse[] | null> => {
  const {
    search = "",
    sortBy = "id",
    orderBy = "asc",
    page = "1",
    pageSize = "10",
    tag = "",
  } = query;

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        tags: {
          select: {
            id: true,
            tag_name: true,
          },
        },
      },
      skip: (parseInt(page as string) - 1) * parseInt(pageSize as string),
      take: parseInt(pageSize as string),
      where: {
        OR: [
          {
            title: {
              contains: search as string,
            },
          },
          {
            content: {
              contains: search as string,
            },
          },
        ],
        ...(tag
          ? {
              tags: {
                some: {
                  tag_name: {
                    in: String(tag).split(","),
                  },
                },
              },
            }
          : {}),
      },
      orderBy: {
        [sortBy as string]: orderBy,
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};
