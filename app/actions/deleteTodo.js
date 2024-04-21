'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function deleteTodo(formData) {
  const id = parseInt(formData.get('id'));
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (e) {
    console.error(e);
  }
}
