import { Link } from "react-router-dom";

// Esqueleto de una tarjeta del catálogo (misma estructura que ProductCard)
function TarjetaCatalogo() {
  return (
    <li>
      <article className="product-card product-card--skeleton">
        <div className="product-card__media skeleton skeleton--media" />
        <div className="product-card__body">
          <h3 className="product-card__title">
            <span className="skeleton-text">Nombre del producto</span>
          </h3>
          <p className="product-card__desc">
            <span className="skeleton-text">
              Descripción breve del producto que ocupa dos líneas
            </span>
          </p>
          <div className="product-card__footer">
            <p className="product-card__price">
              <span className="skeleton-text">$ 1.000.000</span>
            </p>
            <span className="skeleton skeleton-boton" />
          </div>
        </div>
      </article>
    </li>
  );
}

export function SkeletonCatalogo({ cantidad = 8 }) {
  return (
    <>
      <p className="sr-only" role="status">
        Cargando productos...
      </p>
      <ul className="catalog__grid" aria-hidden="true">
        {Array.from({ length: cantidad }, (_, i) => (
          <TarjetaCatalogo key={i} />
        ))}
      </ul>
    </>
  );
}

// Esqueleto de una tarjeta de productos destacados (misma estructura que FeaturedProducts)
function TarjetaDestacado() {
  return (
    <article className="product-card product-card--skeleton">
      <div className="product-card__link">
        <div className="product-card__media skeleton skeleton--media" />
        <div className="product-card__body">
          <h3 className="product-card__title">
            <span className="skeleton-text">Nombre del producto</span>
          </h3>
          <p className="product-card__desc">
            <span className="skeleton-text">
              Descripción breve del producto que ocupa dos líneas
            </span>
          </p>
          <span className="product-card__cta">
            <span className="skeleton-text">Ver detalle →</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function SkeletonDestacados({ cantidad = 4 }) {
  return (
    <>
      <p className="sr-only" role="status">
        Cargando productos destacados...
      </p>
      <div className="featured__grid" aria-hidden="true">
        {Array.from({ length: cantidad }, (_, i) => (
          <TarjetaDestacado key={i} />
        ))}
      </div>
    </>
  );
}

// Esqueleto del detalle de producto (misma estructura que ProductDetail)
export function SkeletonDetalle() {
  return (
    <section className="product-detail">
      <div className="container">
        <p className="sr-only" role="status">
          Cargando producto...
        </p>
        <Link to="/productos" className="btn-vaciar">
          ← Volver al catálogo
        </Link>

        <div className="product-detail__content" aria-hidden="true">
          <div className="product-detail__media skeleton skeleton--media" />

          <div className="product-detail__info">
            <p className="eyebrow">
              <span className="skeleton-text">Categoría</span>
            </p>
            <h1 className="product-detail__title">
              <span className="skeleton-text">Nombre producto</span>
            </h1>
            <p className="product-detail__description">
              <span className="skeleton-text">
                Descripción del producto en una o dos líneas de texto
              </span>
            </p>
            <p className="product-detail__price">
              <span className="skeleton-text">$ 1.000.000</span>
            </p>
            <p className="product-detail__stock">
              <span className="skeleton-text">En stock</span>
            </p>

            <div className="product-detail__purchase">
              <label>
                <span className="skeleton-text">Cantidad</span>
              </label>
              <div className="product-detail__purchase-controls">
                <span className="skeleton skeleton-input" />
                <span className="skeleton skeleton-compra" />
              </div>
            </div>

            <section className="product-detail__features">
              <h2>
                <span className="skeleton-text">Características</span>
              </h2>
              <ul className="skeleton-lista">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>
                    <span className="skeleton-text">
                      Característica del producto con su descripción
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="product-detail__admin">
              <span className="skeleton skeleton-accion" />
              <span className="skeleton skeleton-accion skeleton-accion--largo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
