import Image from "next/image";
import { readdirSync, statSync } from "fs"; // Importa funciones de lectura de directorios y obtención de estadísticas de archivos del módulo 'fs'.
import path from "path"; // Importa el módulo 'path' para manipulación de rutas de archivos y directorios.

function getImages() {
  // Define la ruta absoluta al directorio 'public/img_cargadas' relativo al directorio actual de trabajo.
  const imagesDirectory = path.join(process.cwd(), "public/img_cargadas");
  // Lee y obtiene una lista de nombres de archivos en el directorio 'imagesDirectory'.
  const files = readdirSync(imagesDirectory);

  const images = files.map((fileName) => {
    const filePath = path.join(imagesDirectory, fileName);
    const stats = statSync(filePath);

    if (
      (stats.isFile() && fileName.endsWith(".jpg")) ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpeg")
    ) {
      return {
        name: fileName,
        path: `/img_cargadas/${fileName}`,
        size: stats.size,
        lastModified: stats.mtimeMs,
      };
    } else {
      return null;
    }
  });

  return images.filter((image) => image !== null);
}

export default function ListaImagenes() {
  return (
    <div className="content_imgs">
      {getImages().map((image) => (
        <div key={image.name}>
          <Image src={image.path} alt={image.name} width={200} height={200} />
          {/*
          <p>{image.name}</p>
          <p>{`${(image.size / 1024 / 1024).toFixed(2)} MB`}</p>
          <p>{image.lastModified}</p>
          */}
        </div>
      ))}
    </div>
  );
}
