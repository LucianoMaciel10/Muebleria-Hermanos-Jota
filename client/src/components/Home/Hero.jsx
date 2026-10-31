import { Link } from "react-router-dom";

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">Redescubrir el arte de vivir</h1>
          <p className="hero__text">
            Mobiliario artesanal argentino. Diseño atemporal, materiales
            sustentables, piezas que cuentan historias.
          </p>
          <Link
            to="/productos"
            className="btn btn--primary"
            onClick={onNavigate}
          >
            Ver Catálogo
          </Link>
        </div>
        <div className="hero__media">
          <img
            src="/assets/images/sofa-patagonia.png"
            alt="Sofá Patagonia tapizado en lino Warm Alabaster con patas cónicas de madera"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
