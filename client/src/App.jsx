import { useState, } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";

import Carrito from "./pages/Carrito";
import { useProductos } from "./hooks/useProductos";
import ContactForm from "./pages/ContactForm";
import ProductForm from "./pages/ProductForm";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

import MisPedidos from "./pages/MisPedidos";
import { useCart } from "./context/CartContext";

function App() {
  const { carrito, agregarAlCarrito, cantidadCarrito } = useCart();
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
                carrito={carrito}
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
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                onProductoModificado={recargarProductos}
              />
            }
          />
          <Route path="/contacto" element={<ContactForm />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Carrito onNavigate={limpiarFiltros} />} />
           <Route path="/mis-pedidos" element={<MisPedidos />} />
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