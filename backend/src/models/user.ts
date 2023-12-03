import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserAccount {
  id?: number;
  username: string;
  password: string;
  createdAt?: Date;
}

export const createUser = async (
  user: UserAccount
): Promise<UserAccount | null> => {
  const createUserInput: UserAccount = {
    username: user.username as string,
    password: user.password as string,
    createdAt: new Date(),
  };

  try {
    const createdUser = await prisma.user.create({ data: createUserInput });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const findUserByUsername = async (
  username: string
): Promise<UserAccount | null> => {
  try {
    return prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    console.error("Error find user:", error);
    return null;
  }
};
