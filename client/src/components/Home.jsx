import { useState, useEffect } from "react";

// Ids de los productos que se muestran como destacados
const IDS_DESTACADOS = [
  "butaca-mendoza",
  "mesa-centro-araucaria",
  "sillas-cordoba",
  "biblioteca-recoleta",
];

const COLECCIONES = [
  {
    categoria: "asientos",
    label: "Asientos",
    imagen: "/assets/images/sillon-copacabana.png",
    alt: "Sillón Copacabana en cuero cognac",
  },
  {
    categoria: "mesas",
    label: "Mesas",
    imagen: "/assets/images/mesa-comedor-pampa.png",
    alt: "Mesa Comedor Pampa en roble macizo",
  },
  {
    categoria: "almacenamiento",
    label: "Almacenamiento",
    imagen: "/assets/images/aparador-uspallata.png",
    alt: "Aparador Uspallata en nogal sostenible",
  },
  {
    categoria: "escritorios",
    label: "Escritorios",
    imagen: "/assets/images/escritorio-costa.png",
    alt: "Escritorio Costa en bambú laminado",
  },
];

function Home({ onNavigate }) {
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const respuesta = await fetch("/api/productos");
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al obtener los productos`);
        }
        const productos = await respuesta.json();

        // Respeta el orden de IDS_DESTACADOS y descarta ids que no existan
        const seleccionados = IDS_DESTACADOS.map((id) =>
          productos.find((p) => p.id === id),
        ).filter(Boolean);

        setDestacados(seleccionados);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarDestacados();
  }, []);

  const ir = (e, destino) => {
    e.preventDefault();
    onNavigate(destino);
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">Redescubrir el arte de vivir</h1>
            <p className="hero__text">
              Mobiliario artesanal argentino. Diseño atemporal, materiales
              sustentables, piezas que cuentan historias.
            </p>
            <a
              href="#"
              className="btn btn--primary"
              onClick={(e) => ir(e, "productos")}
            >
              Ver Catálogo
            </a>
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

      {/* ===================== ESENCIA DE MARCA ===================== */}
      <section className="essence">
        <div className="container">
          <p className="eyebrow">Nuestra Esencia</p>
          <h2 className="section-title">
            Donde la herencia se encuentra con la innovación
          </h2>
          <p className="essence__text">
            Hermanos Jota es el redescubrimiento de un arte olvidado: crear
            muebles que no solo sirven una función, sino que alimentan el alma.
            Cada pieza cuenta una historia de artesanía que honra el pasado
            mientras abraza el futuro.
          </p>

          <ul className="essence__features">
            <li className="feature-item">
              <span className="feature-item__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2c-3 3-5 6-5 9a5 5 0 0 0 10 0c0-3-2-6-5-9Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15v7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h3>Madera Certificada FSC</h3>
              <p>Origen sustentable garantizado</p>
            </li>
            <li className="feature-item">
              <span className="feature-item__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-4.5-7-10.5V5l7-2 7 2v5.5C19 16.5 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>Acabados Naturales</h3>
              <p>Libres de tóxicos, apto hogar</p>
            </li>
            <li className="feature-item">
              <span className="feature-item__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="9"
                    r="5.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>Garantía 10 Años</h3>
              <p>Construido para trascender</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ===================== COLECCIONES ===================== */}
      <section className="collections">
        <div className="container">
          <h2 className="section-title">Nuestras Colecciones</h2>

          <div className="collections__grid">
            {COLECCIONES.map((coleccion) => (
              <a
                key={coleccion.categoria}
                href="#"
                className="collection-card"
                onClick={(e) => ir(e, "productos")}
              >
                <img src={coleccion.imagen} alt={coleccion.alt} />
                <span className="collection-card__label">
                  {coleccion.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRODUCTOS DESTACADOS ===================== */}
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
                <article key={producto.id} className="product-card">
                  <a
                    href="#"
                    className="product-card__link"
                    onClick={(e) => ir(e, "productos")}
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
                      <p className="product-card__desc">
                        {producto.descripcion}
                      </p>
                      <span className="product-card__cta">Ver detalle →</span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== COMPROMISO CON EL FUTURO ===================== */}
      <section className="commitment">
        <div className="container commitment__inner">
          <svg
            className="commitment__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 4c-9 0-16 5-16 13 8 0 13-4 15-10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 20c3-5 7-8 12-10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <p className="commitment__title">Compromiso con el Futuro</p>
            <p className="commitment__text">
              Materiales 100% reciclables · Proveedores locales · Cero plásticos
              de un solo uso
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
