"use server";

import { ITodos } from "@/interface";
import { prisma } from "../prisma/prisma";
import { revalidatePath } from "next/cache";
export const getTodos = async (userId: string) => {
  try {
    return await prisma.todo.findMany({
      orderBy: {
        CreatedAt: "desc",
      },
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
};

export const createTodo = async ({
  title,
  body,
  completed,
  userId,
}: {
  title: string;
  body?: string;
  completed?: boolean;
  userId: string;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      userId,
    },
  });
  revalidatePath("/");
};
export const updateTodo = async ({ completed, id, title, body }: ITodos) => {
  await prisma.todo.update({
    where: { id },
    data: {
      body,
      completed,
      title,
    },
  });
  revalidatePath("/");
};
export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
