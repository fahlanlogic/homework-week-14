import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // DATA DI ISI DARI FORM DISISI CLIENT
    const body = await request.json();
    const { title, author, publisher, year, pages, image } = body;
    if (!title || !author) {
      throw { name: "BadRequest" };
    }

    await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: +year,
        pages: +pages,
        image,
      },
    });

    return NextResponse.json({ status: 200, message: "Book created" });
  } catch (error) {
    if (error.name === "BadRequest") {
      return NextResponse.json({
        status: 400,
        message: "Title and Author is required",
      });
    }
    return NextResponse.json(error.message);
  }
}
