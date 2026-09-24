import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [vista, setVista] = useState("inicio");
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch("/api/productos");
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al obtener los productos`);
        }
        const data = await respuesta.json();
        setProductos(data);
      } catch (err) {
        setErrorProductos(err.message);
      } finally {
        setCargandoProductos(false);
      }
    }
    cargarProductos();
  }, []);

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <Navbar
        vista={vista}
        onNavigate={setVista}
        cantidadCarrito={cantidadCarrito}
      />

      <main id="main">
        {vista === "inicio" && (
          <Home
            onNavigate={setVista}
            productos={productos}
            cargando={cargandoProductos}
            error={errorProductos}
          />
        )}
        {vista === "productos" && (
          <div className="container">
            <h1>Productos</h1>
          </div>
        )}
        {vista === "carrito" && (
          <div className="container">
            <h1>Carrito</h1>
          </div>
        )}
        {vista === "contacto" && (
          <div className="container">
            <h1>Contacto</h1>
          </div>
        )}
      </main>

      <Footer onNavigate={setVista} />
    </>
  );
}

export default App;
