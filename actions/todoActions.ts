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
  try {
    await prisma.todo.create({
      data: {
        title,
        body,
        completed,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
export const updateTodo = async ({ completed, id, title, body }: ITodos) => {
  try {
    await prisma.todo.update({
      where: { id },
      data: {
        body,
        completed,
        title,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
};
