import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    const hashPassword = await bcrypt.hashSync(password, 10);

    if (!email || !password) throw { name: "BadRequest" };

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json({
      message: "Sign Up Succesfully",
    });
  } catch (error) {
    if (error.name === "BadRequest") {
      return NextResponse.json({ status: 400, message: "Bad Request" });
    }
    return NextResponse.json({
      status: 409,
      message: "User already exist",
    });
  }
}
