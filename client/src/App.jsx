import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

import Carrito from "./components/Carrito";


function App() {
  const [vista, setVista] = useState("inicio");
  //prueba de carrito con productos
const [carrito, setCarrito] = useState([
    { id: "sofa-patagonia", nombre: "Sofá Patagonia", precio: 450000, cantidad: 2, imagen: "" },
    { id: "mesa-comedor-pampa", nombre: "Mesa de comedor Pampa", precio: 320000, cantidad: 1, imagen: "" },
  ]);

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

// Agrega el productoo ,suma 1 si ya estaba en el carrito
const agregarAlCarrito = (productoNuevo) => {
  setCarrito((carritoAnterior) => {
    const yaExiste = carritoAnterior.find(
      (producto) => producto.id === productoNuevo.id
    );
    if (yaExiste) {
      return carritoAnterior.map((producto) =>
        producto.id === productoNuevo.id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      );
    }
    return [...carritoAnterior, { ...productoNuevo, cantidad: 1 }];
  });
};




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
          <Carrito
            carrito={carrito}
            setCarrito={setCarrito}
            onNavigate={setVista}
          />
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
