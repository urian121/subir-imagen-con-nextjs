import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  // Generar un nombre único para la imagen
  const newFilename = `${uuidv4()}.${file.name.split(".").pop()}`;

  // Crear la ruta completa para la imagen
  const newFilePath = path.join(process.cwd(), "public/img_cargadas", newFilename);

  // Convertir el archivo a un arreglo de bytes
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Escribir el archivo
    await writeFile(newFilePath, buffer);
    console.log(`Image saved successfully: ${newFilePath}`);

    return NextResponse.json({ success: true, filename: newFilename });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ success: false, message: "Error saving image" });
  }
}
