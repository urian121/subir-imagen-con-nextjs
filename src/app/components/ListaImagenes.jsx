import Image from "next/image";
import { readdirSync, statSync } from "fs";
import path from "path";

function getImages() {
  const imagesDirectory = path.join(process.cwd(), "public/img_cargadas");
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
