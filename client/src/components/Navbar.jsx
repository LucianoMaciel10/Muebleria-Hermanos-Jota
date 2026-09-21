import { useState } from "react";

function Navbar({ vista, onNavigate, cantidadCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const ir = (e, destino) => {
    e.preventDefault();
    onNavigate(destino);
    setMenuAbierto(false);
  };

  return (
    <header className="site-header">
      <div className="container header__inner">
        <a
          href="#"
          className="logo"
          onClick={(e) => ir(e, "inicio")}
          aria-label="Hermanos Jota, ir al inicio"
        >
          <img src="/assets/images/logo.svg" alt="" className="logo__img" />
          <span className="logo__text">Hermanos Jota</span>
        </a>

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
              <a
                href="#"
                onClick={(e) => ir(e, "inicio")}
                aria-current={vista === "inicio" ? "page" : undefined}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => ir(e, "productos")}
                aria-current={vista === "productos" ? "page" : undefined}
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => ir(e, "contacto")}
                aria-current={vista === "contacto" ? "page" : undefined}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="#"
          className="cart-link"
          onClick={(e) => ir(e, "carrito")}
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
          {cantidadCarrito > 0 && (
            <span className="cart-link__count">{cantidadCarrito}</span>
          )}
        </a>
      </div>
    </header>
  );
}

export default Navbar;
