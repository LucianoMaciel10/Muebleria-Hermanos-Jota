function ProductCard({ producto, onAgregar, onVerDetalle }) {
  return (
    <li>
      <article className="product-card">
        <div className="product-card__media">
          <a 
            href="#"
            className="product-card__link"
            onClick={(e) => {e.preventDefault(); onVerDetalle(producto); }} 
            aria-label={`Ver detalle de ${producto.nombre}`}
          >
            <img 
              src={producto.imagen} 
              alt={producto.alt}
              loading="lazy" 
            />
          </a>
        </div>
        
        <div className="product-card__body">
          <h3 className="product-card__title">
            <a 
              href="#"
              className="product-card__link"
              onClick={(e) => {e.preventDefault(); onVerDetalle(producto); }} 
              aria-label={`Ver detalle de ${producto.nombre}`}
            >
              {producto.nombre}
            </a>
          </h3>
          <p className="product-card__desc">{producto.descripcion}</p>

          <div className="product-card__footer">
            <p className="product-card__price">$ {producto.precio.toLocaleString('es-AR')}</p>
            <button 
              type="button" 
              className="product-card__btn"
              onClick={onAgregar}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>
    </li>
    
  );
}

export default ProductCard;