import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import toast, { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";

import Carrito from "./pages/Carrito";
import { useProductos } from "./hooks/useProductos";
import ContactForm from "./pages/ContactForm";
import ProductForm from "./pages/ProductForm";
import NotFound from "./pages/NotFound";

function App() {
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || [],
  );
  const [categoriaSeleccionada, setCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const location = useLocation();
  const vista = location.pathname.startsWith("/productos/")
    ? "productos"
    : location.pathname === "/"
      ? "inicio"
      : location.pathname.slice(1);
  const {
    productos,
    cargando: cargandoProductos,
    error: errorProductos,
    recargar: recargarProductos,
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
        (producto) => producto._id === productoNuevo._id,
      );
      if (yaExiste) {
        mensaje = `${productoNuevo.nombre} ya estaba en el carrito, se sumó ${cantidad > 1 ? `${cantidad} unidades` : "una unidad"}`;
        return carritoAnterior.map((producto) =>
          producto._id === productoNuevo._id
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

  const limpiarFiltros = () => {
    setCategoria("");
    setBusqueda("");
  };

  const seleccionarCategoria = (categoria) => {
    setBusqueda("");
    setCategoria(categoria);
  };

  return (
    <>
      <Toaster />
      <Navbar
        vista={vista}
        onNavigate={limpiarFiltros}
        cantidadCarrito={cantidadCarrito}
      />

      <main id="main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onNavigate={limpiarFiltros}
                productos={productos}
                cargando={cargandoProductos}
                error={errorProductos}
                onVerCategoria={seleccionarCategoria}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <Catalogo
                productos={productos}
                cargando={cargandoProductos}
                error={errorProductos}
                onAgregar={agregarAlCarrito}
                categoriaSeleccionada={categoriaSeleccionada}
                setCategoria={setCategoria}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={
              <ProductDetail
                onAgregar={agregarAlCarrito}
                onProductoModificado={recargarProductos}
              />
            }
          />
          <Route path="/contacto" element={<ContactForm />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                onNavigate={limpiarFiltros}
              />
            }
          />
          <Route
            path="/admin/crear-producto"
            element={<ProductForm key="crear" onGuardado={recargarProductos} />}
          />
          <Route
            path="/admin/editar-producto/:id"
            element={
              <ProductForm key="editar" onGuardado={recargarProductos} />
            }
          />

          <Route path="*" element={<NotFound onNavigate={limpiarFiltros} />} />
        </Routes>
      </main>

      <Footer onNavigate={limpiarFiltros} />
    </>
  );
}

export default App;
