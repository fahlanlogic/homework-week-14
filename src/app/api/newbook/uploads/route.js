import { uploadFile } from "@/lib/uploadFile";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.getAll("image")[0];
    const imagePath = await uploadFile(file, "/images");
    const imageUrl = `http://localhost:3000/${imagePath}`;
    return NextResponse.json({
      message: "Upload image success",
      image_url: imageUrl,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Upload image failed" },
      { status: 500 }
    );
  }
}
