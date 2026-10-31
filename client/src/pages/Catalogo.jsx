import ProductCard from "../components/catalogo/ProductCard";
import HeaderCatalog from "../components/catalogo/HeaderCatalog";
import { SkeletonCatalogo } from "../components/Skeletons";

function Catalogo({
  carrito,
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

          {cargando && <SkeletonCatalogo />}
          {error && (
            <p className="mensaje-carrito-cargando" role="alert">
              Error al cargar los productos. {error}
            </p>
          )}
          {!cargando && !error && productos.length === 0 && (
            <div className="catalog__empty" role="status">
              {busqueda || categoriaSeleccionada ? (
                <>
                  <h2>No encontramos productos</h2>
                  <p>
                    {busqueda
                      ? `No hay resultados para «${busqueda}»${categoriaSeleccionada ? " en esta categoría" : ""}.`
                      : "No hay productos en esta categoría."}{" "}
                    Probá con otra búsqueda o categoría.
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      setCategoria("");
                      setBusqueda("");
                    }}
                  >
                    Limpiar filtros
                  </button>
                </>
              ) : (
                <>
                  <h2>Todavía no hay productos</h2>
                  <p>Creá el primero con el botón «Crear producto».</p>
                </>
              )}
            </div>
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
                  cantidadEnCarrito={
                    carrito.find((item) => item._id === producto._id)
                      ?.cantidad || 0
                  }
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
