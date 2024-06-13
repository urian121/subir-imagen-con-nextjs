"use client"; // Indica que el archivo se ejecutará en el cliente en un entorno Next.js.
import { useState, useRef } from "react"; // Importa hooks de React para manejar el estado y referencias de componentes.
import { FileImage } from "lucide-react"; // Importa el ícono 'FileImage' del paquete 'lucide-react'.
import LoadingBar from "react-top-loading-bar"; // Importa el componente 'LoadingBar' de la librería 'react-top-loading-bar'.
import { toast } from "react-toastify"; // Importa la función 'toast' de la librería 'react-toastify' para mostrar notificaciones.

export default function Formulario() {
  const ref = useRef(null); // Crea una referencia inicializada en null.
  const inputFileRef = useRef(null); // Crea una referencia para el elemento input file inicializada en null.
  const [file, setFile] = useState(); // Declara una variable de estado 'file' con su función actualizadora 'setFile'.

  async function subirImagen(e) {
    e.preventDefault();

    // Si no hay imagen, mostrar alerta
    if (!file) {
      toast.warning("Debe seleccionar una imagen");
      return false;
    }

    try {
      // Iniciar la barra de carga
      ref.current.continuousStart();

      const data = new FormData(); // Crea una nueva instancia de FormData para manejar datos de formularios.
      data.set("file", file); // Añade el archivo a FormData con la clave 'file'.

      const res = await fetch("/api/upload_img", {
        method: "POST", // Especifica que la solicitud será de tipo POST.
        body: data, // Establece el cuerpo de la solicitud como el FormData que contiene el archivo.
      });

      if (res.ok) {
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
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return; // Si no hay archivos seleccionados, salir de la función.
    setFile(e.target.files?.[0]); // Establecer el archivo seleccionado como el nuevo estado.
  };

  return (
    <>
      <LoadingBar color="#80f" ref={ref} shadow={true} />
      <form onSubmit={subirImagen}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
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
          <FileImage />
          <span>Subir imagen</span>
        </button>
      </form>
    </>
  );
}
