import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Subir imagen con Next.js",
  description: "Aprende a subir una imagen con Next.js paso a paso",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="container text-center mt-5 mb-5">{children}</div>
      </body>
    </html>
  );
}
