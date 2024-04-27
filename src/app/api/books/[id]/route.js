import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log(id);
    const book = await prisma.book.findUnique({
      where: {
        id: +id,
      },
    });
    if (!book) {
      return NextResponse.json({ message: "Book not found" });
    }
    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const book = await prisma.book.update({
      where: {
        id: +id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ message: "Book edited", book });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const book = await prisma.book.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json({ message: "Book deleted", book });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
