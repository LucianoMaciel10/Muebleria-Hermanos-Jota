import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/catalogo/ProductList";
//import ProductDetail from "./components/catalogo/ProductDetail";

import Carrito from "./components/Carrito";
import { useProductos } from "./hooks/useProductos";

function App() {
  const [vista, setVista] = useState("inicio");
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || [],
  );
  //const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const { productos, cargando: cargandoProductos, error: errorProductos } = useProductos(categoriaSeleccionada, busqueda);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Agrega el productoo ,suma 1 si ya estaba en el carrito
  const agregarAlCarrito = (productoNuevo) => {
    setCarrito((carritoAnterior) => {
      const yaExiste = carritoAnterior.find(
        (producto) => producto.id === productoNuevo.id,
      );
      if (yaExiste) {
        return carritoAnterior.map((producto) =>
          producto.id === productoNuevo.id
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto,
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
            setCategoria={setCategoria}
          />
        )}
        {vista === "productos" && (
          /*productoSeleccionado ? (
            <ProductDetail
              producto={productoSeleccionado}
              onAgregar={agregarAlCarrito}
              onVolver={() => setProductoSeleccionado(null)}
            />
          ) : */ <section className="catalog" aria-labelledby="catalog-title">
            <div className="container">
              <ProductList
                productos={productos}
                cargando={cargandoProductos}
                error={errorProductos}
                onAgregar={agregarAlCarrito}
                //onVerDetalle={setProductoSeleccionado}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoria={setCategoria}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
              />
            </div>
          </section>
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
