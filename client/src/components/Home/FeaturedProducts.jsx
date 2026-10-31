import { Link } from "react-router-dom";
import { SkeletonDestacados } from "../Skeletons";

function FeaturedProducts({ destacados, cargando, error }) {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Productos Destacados</h2>
        {cargando && <SkeletonDestacados />}
        {error && (
          <p className="mensaje-carrito-cargando" role="alert">
            No pudimos cargar los productos destacados. {error}
          </p>
        )}
        {!cargando && !error && (
          <div className="featured__grid">
            {destacados.map((producto) => (
              <article key={producto._id} className="product-card">
                <Link
                  to={`/productos/${producto._id}`}
                  className="product-card__link"
                >
                  <div className="product-card__media">
                    <img
                      src={producto.imagenUrl}
                      alt={producto.alt}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-card__body">
                    <h3 className="product-card__title">{producto.nombre}</h3>
                    <p className="product-card__desc">{producto.descripcion}</p>
                    <span className="product-card__cta">Ver detalle →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
