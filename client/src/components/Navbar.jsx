import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ vista, onNavigate, cantidadCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const ir = () => {
    onNavigate();
    setMenuAbierto(false);
  };

  return (
    <header className="site-header">
      <div className="container header__inner">
        <Link
          to="/"
          className="logo"
          onClick={ir}
          aria-label="Hermanos Jota, ir al inicio"
        >
          <img src="/assets/images/logo.svg" alt="" className="logo__img" />
          <span className="logo__text">Hermanos Jota</span>
        </Link>

        <button
          type="button"
          className={`nav-toggle ${menuAbierto ? "is-active" : ""}`}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="nav-toggle__bar"></span>
          <span className="nav-toggle__bar"></span>
          <span className="nav-toggle__bar"></span>
        </button>

        <nav
          className={`main-nav ${menuAbierto ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <ul className="main-nav__list">
            <li>
              <Link
                to="/"
                onClick={ir}
                aria-current={vista === "inicio" ? "page" : undefined}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                onClick={ir}
                aria-current={vista === "productos" ? "page" : undefined}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                onClick={ir}
                aria-current={vista === "contacto" ? "page" : undefined}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          to="/carrito"
          className="cart-link"
          onClick={ir}
          aria-label="Ver carrito de compras"
        >
          <svg
            className="cart-link__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6h15l-1.5 9h-12L6 3H3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
            <circle cx="17.5" cy="19.5" r="1.4" fill="currentColor" />
          </svg>
          {<span className="cart-link__count">{cantidadCarrito}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
