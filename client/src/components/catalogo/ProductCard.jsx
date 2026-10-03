function ProductCard({ producto, onAgregar /*onVerDetalle */ }) {
  /* const handlerVerDetalle = (event) => {
    event.preventDefault();
    onVerDetalle();
  }; */

  return (
    <li>
      <article className="product-card">
        <div className="product-card__media">
          {!producto.stock && (
            <span className="product-card__badge">Sin stock</span>
          )}
          {/*<a 
            href="#"
            className="product-card__link"
            onClick={handlerVerDetalle}
            aria-label={`Ver detalle de ${producto.nombre}`}
          > */}
          <img src={producto.imagen} alt={producto.alt} loading="lazy" />
          {/*</a> */}
        </div>

        <div className="product-card__body">
          <h3 className="product-card__title">
            {/* <a 
              href="#"
              className="product-card__link"
              onClick={handlerVerDetalle}
              aria-label={`Ver detalle de ${producto.nombre}`}
            > */}
            {producto.nombre}
            {/* </a> */}
          </h3>
          <p className="product-card__desc">{producto.descripcion}</p>

          <div className="product-card__footer">
            <p className="product-card__price">
              $ {producto.precio.toLocaleString("es-AR")}
            </p>
            <button
              type="button"
              className="product-card__btn"
              onClick={onAgregar}
              disabled={!producto.stock}
            >
              {producto.stock ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

export default ProductCard;
