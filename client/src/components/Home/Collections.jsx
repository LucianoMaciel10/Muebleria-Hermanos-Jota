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

function Collections({ onNavigate }) {
  const ir = (e, destino) => {
    e.preventDefault();
    onNavigate(destino);
  };

  return (
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
              <span className="collection-card__label">{coleccion.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collections;
