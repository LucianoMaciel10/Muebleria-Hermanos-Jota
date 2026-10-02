import ProductCard from "./ProductCard";
import HeaderCatalog from "./HeaderCatalog";

function ProductList({ categoriaSeleccionada, setCategoria, 
    busqueda, setBusqueda, productos, 
    cargando, error, onAgregar, onVerDetalle  }) {
  return (
    <>
      <HeaderCatalog
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoria={setCategoria}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {cargando && (
        <p className="loading-productos">
          Cargando productos...
        </p>
      )}
      {error && (
        <p className="mensaje-carrito-cargando" role="alert">
          Error al cargar los productos. {error}
        </p>
      )}
      {!cargando && !error && productos.length === 0 && (
        <p role="status">No se encontraron productos.</p>
      )}
      {!cargando && !error && productos.length > 0 && (
        <ul id='products-grid' className='catalog__grid' aria-label='Productos disponibles'>
          {
            productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar={() => onAgregar(producto)}
                onVerDetalle={() => onVerDetalle(producto)}
              />
            ))
          }
        </ul>
      )}
    </>
  );
}

export default ProductList;