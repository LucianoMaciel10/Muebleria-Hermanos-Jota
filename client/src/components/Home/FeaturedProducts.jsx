function FeaturedProducts({ destacados, cargando, error, onNavigate, onVerDetalle }) {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section-title">Productos Destacados</h2>
        {cargando && (
          <p className="mensaje-carrito-cargando">Cargando productos...</p>
        )}
        {error && (
          <p className="mensaje-carrito-cargando" role="alert">
            No pudimos cargar los productos destacados. {error}
          </p>
        )}
        {!cargando && !error && (
          <div className="featured__grid">
            {destacados.map((producto) => (
              <article
                key={producto.id}
                className="product-card"
                onClick={() => {
                  onVerDetalle(producto.id) 
                  onNavigate("productos")
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="product-card__media">
                  <img
                    src={producto.imagen}
                    alt={producto.alt}
                    loading="lazy"
                  />
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__title">{producto.nombre}</h3>
                  <p className="product-card__desc">{producto.descripcion}</p>
                  <span className="product-card__cta">Ver detalle →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
