import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  const data = await request.formData(); // Obtiene los datos del formulario de la solicitud.
  const file = data.get("file"); // Extrae el archivo del FormData usando la clave 'file'.

  // Devuelve una respuesta JSON indicando fracaso si no hay archivo.
  if (!file) {
    return NextResponse.json({ success: false });
  }

  // Generar un nombre único para la imagen
  const newFilename = `${uuidv4()}.${file.name.split(".").pop()}`;

  // Crear la ruta completa para la imagen
  const newFilePath = path.join(process.cwd(), "public/img_cargadas", newFilename);

  const bytes = await file.arrayBuffer(); // Convierte el archivo a un ArrayBuffer.
  const buffer = Buffer.from(bytes); // Convierte el ArrayBuffer a un objeto Buffer de Node.js.

  try {
    // Escribe el contenido del buffer en el archivo especificado por 'newFilePath'.
    await writeFile(newFilePath, buffer);
    return NextResponse.json({ success: true, filename: newFilename });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ success: false, message: "Error saving image" });
  }
}
