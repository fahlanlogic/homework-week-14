import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function signUp(formData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { name, email, password } = rawData.data;
  const hashedPassword = await bcrypt.hashSync(password, 10);

  try {
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    NextResponse.json(data);
    redirect("/sign-in");
  } catch (error) {
    console.log(error);
  }
}
