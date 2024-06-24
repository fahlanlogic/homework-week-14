import path from "path";
import { promises as fs } from "fs";

export async function uploadFile(file, pathLocation) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = file.name.toLowerCase().split(" ").join("-");
  const filePath = path.join(pathLocation, Date.now() + "-" + fileName);
  const finalPath = path.join(process.cwd(), "public", filePath);

  try {
    // Ensure directory exists
    const dir = path.dirname(finalPath);
    // console.log(`Ensuring directory exists: ${dir}`);
    await fs.mkdir(dir, { recursive: true });
    // console.log(`Directory ensured: ${dir}`);

    // Write file
    await fs.writeFile(finalPath, buffer);
    // console.log(`File written: ${finalPath}`);

    return filePath.replace(/\\/g, "/");
  } catch (error) {
    // console.error(`Failed to write file: ${finalPath}`, error);
    throw error;
  }
}
