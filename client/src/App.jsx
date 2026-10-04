import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/catalogo/ProductList";
import toast, { Toaster } from "react-hot-toast";
import ProductDetail from "./components/catalogo/ProductDetail";

import Carrito from "./components/Carrito";
import { useProductos } from "./hooks/useProductos";
import ContactForm from "./components/ContactForm";

function App() {
  const [vista, setVista] = useState("inicio");
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || [],
  );
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const {
    productos,
    cargando: cargandoProductos,
    error: errorProductos,
  } = useProductos(categoriaSeleccionada, busqueda);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Agrega el productoo ,suma 1 si ya estaba en el carrito
  const agregarAlCarrito = (productoNuevo, cantidad = null) => {
    let mensaje = `${productoNuevo.nombre} agregado al carrito`;

    setCarrito((carritoAnterior) => {
      const yaExiste = carritoAnterior.find(
        (producto) => producto.id === productoNuevo.id,
      );
      if (yaExiste) {
        mensaje = `${productoNuevo.nombre} ya estaba en el carrito, se sumó ${cantidad > 1 ? `${cantidad} unidades` : "una unidad"}`;
        return carritoAnterior.map((producto) =>
          producto.id === productoNuevo.id
            ? {
                ...producto,
                cantidad:
                  cantidad > 1
                    ? producto.cantidad + cantidad
                    : producto.cantidad + 1,
              }
            : producto,
        );
      }

      return [
        ...carritoAnterior,
        { ...productoNuevo, cantidad: cantidad ? cantidad : 1 },
      ];
    });

    toast.success(mensaje, {
      position: "bottom-right",
      duration: 4000,
    });
  };

  // Navegación general: siempre entra a la vista "limpia" (sin filtros ni detalle)
  const navegarA = (destino) => {
    setCategoria("");
    setBusqueda("");
    setProductoSeleccionado(null);
    setVista(destino);
  };

  // Abre el detalle de un producto (desde Home, listado o Carrito)
  const verDetalle = (id) => {
    setProductoSeleccionado(id);
    setVista("productos");
  };

  // Abre el catálogo filtrado por categoría (desde las colecciones del Home)
  const verCategoria = (categoria) => {
    setProductoSeleccionado(null);
    setBusqueda("");
    setCategoria(categoria);
    setVista("productos");
  };

  return (
    <>
      <Toaster />
      <Navbar
        vista={vista}
        onNavigate={navegarA}
        cantidadCarrito={cantidadCarrito}
      />

      <main id="main">
        {vista === "inicio" && (
          <Home
            onNavigate={navegarA}
            productos={productos}
            cargando={cargandoProductos}
            error={errorProductos}
            onVerCategoria={verCategoria}
            onVerDetalle={verDetalle}
          />
        )}
        {vista === "productos" &&
          (productoSeleccionado ? (
            <ProductDetail
              productoId={productoSeleccionado}
              onAgregar={agregarAlCarrito}
              onVolver={() => setProductoSeleccionado(null)}
            />
          ) : (
            <section className="catalog" aria-labelledby="catalog-title">
              <div className="container">
                <ProductList
                  productos={productos}
                  cargando={cargandoProductos}
                  error={errorProductos}
                  onAgregar={agregarAlCarrito}
                  onVerDetalle={verDetalle}
                  categoriaSeleccionada={categoriaSeleccionada}
                  setCategoria={setCategoria}
                  busqueda={busqueda}
                  setBusqueda={setBusqueda}
                />
              </div>
            </section>
          ))}
        {vista === "carrito" && (
          <Carrito
            carrito={carrito}
            setCarrito={setCarrito}
            onNavigate={navegarA}
            onVerDetalle={verDetalle}
          />
        )}
        {vista === "contacto" && <ContactForm />}
      </main>

      <Footer onNavigate={navegarA} />
    </>
  );
}

export default App;
