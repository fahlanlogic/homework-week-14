import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) throw { name: "BadRequest" };
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!existingUser) throw { name: "InvalidCredential" };

    const comparePassword = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (comparePassword) {
      const accessToken = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.SECRET_KEY
      );

      cookies().set({
        name: "access_token",
        value: accessToken,
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({
        message: "Sign In Succesfully",
        accessToken,
      });
    } else {
      throw { name: "InvalidCredential" };
    }
  } catch (error) {
    if (error.name === "BadRequest") {
      return NextResponse.json({ status: 400, message: "Bad Request" });
    } else if (error.name === "InvalidCredential") {
      return NextResponse.json({ status: 401, message: "Invalid Credential" });
    }
    return NextResponse.json({ status: 409, message: "User already exist" });
  }
}
