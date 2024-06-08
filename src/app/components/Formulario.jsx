"use client";
import { useState, useRef } from "react";
import { FileImage } from "lucide-react";

import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";

export default function Formulario() {
  const ref = useRef(null);
  const inputFileRef = useRef(null); // Crear una referencia para el input file
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function subirImagen(e) {
    e.preventDefault();

    // Si no hay imagen, mostrar alerta
    if (!file) {
      toast.warning("Debe seleccionar una imagen");
      return false;
    }

    try {
      setIsLoading(true);
      // Iniciar la barra de carga
      ref.current.continuousStart();

      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload_img", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        console.log("Imagen subida correctamente");
        toast.success("Imagen subida correctamente");
        setFile(null);
        inputFileRef.current.value = ""; // Limpiar el input file
      }
    } catch (error) {
      console.error(error);
      toast.warning("Error al subir la imagen");
    } finally {
      // Completar la barra de carga
      ref.current.complete();
      setIsLoading(false);
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <>
      <LoadingBar color="#80f" ref={ref} shadow={true} />
      <form onSubmit={subirImagen}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Seleccione la imagen
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control form-control-sm"
            onChange={handleFileChange}
            ref={inputFileRef} // Referenciar el input file
          />
        </div>
        <button className="btn btn-primary btn_add mt-5" type="submit">
          {isLoading ? (
            <span>Enviando imagen...</span>
          ) : (
            <>
              <FileImage />
              <span>Subir imagen</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
