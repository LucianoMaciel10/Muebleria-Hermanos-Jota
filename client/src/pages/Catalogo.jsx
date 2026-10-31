import ProductCard from "../components/catalogo/ProductCard";
import HeaderCatalog from "../components/catalogo/HeaderCatalog";

function Catalogo({
  categoriaSeleccionada,
  setCategoria,
  busqueda,
  setBusqueda,
  productos,
  cargando,
  error,
  onAgregar,
}) {
  return (
    <>
      <section className="catalog" aria-labelledby="catalog-title">
        <div className="container">

          <HeaderCatalog
            categoriaSeleccionada={categoriaSeleccionada}
            setCategoria={setCategoria}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />

          {cargando && <p className="loading-productos">Cargando productos...</p>}
          {error && (
            <p className="mensaje-carrito-cargando" role="alert">
              Error al cargar los productos. {error}
            </p>
          )}
          {!cargando && !error && productos.length === 0 && (
            <p role="status">No se encontraron productos.</p>
          )}
          {!cargando && !error && productos.length > 0 && (
            <ul
              id="products-grid"
              className="catalog__grid"
              aria-label="Productos disponibles"
            >
              {productos.map((producto) => (
                <ProductCard
                  key={producto._id}
                  producto={producto}
                  onAgregar={() => onAgregar(producto)}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default Catalogo;