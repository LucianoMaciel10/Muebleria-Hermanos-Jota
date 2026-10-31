import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregar }) {
  return (
    <li>
      <article className="product-card">
        <div className="product-card__media">
          {!producto.stock && (
            <span className="product-card__badge">Sin stock</span>
          )}
          <Link
            to={`/productos/${producto._id}`}
            className="product-card__link"
            aria-label={`Ver detalle de ${producto.nombre}`}
          >
            <img src={producto.imagenUrl} alt={producto.alt} loading="lazy" />
          </Link>
        </div>

        <div className="product-card__body">
          <h3 className="product-card__title">
            <Link
              to={`/productos/${producto._id}`}
              className="product-card__link"
              aria-label={`Ver detalle de ${producto.nombre}`}
            >
              {producto.nombre}
            </Link>
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
