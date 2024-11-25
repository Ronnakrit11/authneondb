"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
  })

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    },
  })

  return user
}