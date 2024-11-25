"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createInvoice(data: {
  number: string
  clientName: string
  amount: number
  date: Date
  dueDate: Date
}) {
  const session = await auth()
  
  if (!session) {
    throw new Error("Not authenticated")
  }

  const invoice = await prisma.invoice.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  return invoice
}

export async function deleteInvoice(id: string) {
  const session = await auth()
  
  if (!session) {
    throw new Error("Not authenticated")
  }

  const invoice = await prisma.invoice.delete({
    where: {
      id,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  return invoice
}