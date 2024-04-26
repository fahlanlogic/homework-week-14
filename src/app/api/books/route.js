import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request) {
  const books = await prisma.book.findMany();

  if (!books) return NextResponse.json({ message: "Books not found" });
  return NextResponse.json({ books });
}
