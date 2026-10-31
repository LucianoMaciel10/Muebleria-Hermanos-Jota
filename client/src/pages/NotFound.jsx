import { Link } from "react-router-dom";

function NotFound({ onNavigate }) {
  return (
    <section className="pagina-carrito">
      <div className="contenedor-carrito">
        <h1 className="titulo-carrito">Página no encontrada</h1>
        <div className="mensaje-carrito-vacio">
          <h2>Error 404: la página que buscás no existe</h2>
          <Link to="/" className="btn-catalogo" onClick={onNavigate}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
