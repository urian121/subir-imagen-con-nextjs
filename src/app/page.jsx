import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";
import Titulo from "./components/Titulo";

// Componente para mostrar las imagenes subidas
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <div className="row justify-content-center mb-5">
        <div className="col-md-12">
          <Titulo />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 border-right">
          <Formulario />
        </div>

        <div className="col-md-8">
          <ListaImagenes />
        </div>
      </div>
    </>
  );
}
