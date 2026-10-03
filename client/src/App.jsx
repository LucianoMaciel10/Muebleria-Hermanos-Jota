import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/catalogo/ProductList";
//import ProductDetail from "./components/catalogo/ProductDetail";

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
  //const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    async function cargarProductos() {
      setCargandoProductos(true);
      setErrorProductos(null);
      try {
        const parametros = new URLSearchParams();
        if (categoriaSeleccionada) parametros.set('categoria', categoriaSeleccionada);
        if (busqueda) parametros.set('busqueda', busqueda);
        const ruta = `/api/productos${parametros.size ? `?${parametros}` : ''}`;
        const respuesta = await fetch(ruta, { signal: abortController.signal });
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al obtener los productos`);
        }
        const data = await respuesta.json();
        setProductos(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErrorProductos(err.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setCargandoProductos(false);
        }
      }
    }
    cargarProductos();
    return () => abortController.abort(); 
  }, [categoriaSeleccionada, busqueda]);

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
          /*productoSeleccionado ? (
            <ProductDetail
              producto={productoSeleccionado}
              onAgregar={agregarAlCarrito}
              onVolver={() => setProductoSeleccionado(null)}
            />
          ) : */(
            <section className='catalog' aria-labelledby='catalog-title'>
              <div className='container'>
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
          )
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
