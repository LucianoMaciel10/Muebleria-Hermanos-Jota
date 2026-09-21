function Footer({ onNavigate }) {
  const ir = (e, destino) => {
    e.preventDefault();
    onNavigate(destino);
  };

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            src="/assets/images/logo.svg"
            alt="Hermanos Jota"
            className="footer__logo"
            width="36"
            height="36"
          />
          <p>Redescubrir el arte de vivir.</p>
        </div>

        <nav className="footer__col" aria-label="Navegación del sitio">
          <h3>Navegación</h3>
          <ul>
            <li>
              <a href="#" onClick={(e) => ir(e, "inicio")}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => ir(e, "productos")}>
                Productos
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => ir(e, "contacto")}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Contacto</h3>
          <address>
            Av. San Juan 2847, San Cristóbal
            <br />
            C1232AAB, CABA, Argentina
            <br />
            L-V 10:00–19:00 · Sáb 10:00–14:00
            <br />
            <a href="mailto:info@hermanosjota.com.ar">
              info@hermanosjota.com.ar
            </a>
          </address>
        </div>

        <div className="footer__col">
          <h3>Seguinos</h3>
          <ul className="footer__social">
            <li>
              <a
                href="https://instagram.com/muebleria_hnos_jota"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5491145678900"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>
            &copy; 2025 Hermanos Jota Furniture. Redescubriendo el arte de vivir
            desde 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
