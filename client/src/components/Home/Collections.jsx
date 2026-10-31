import { Link } from "react-router-dom";

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

function Collections({ onVerCategoria }) {
  return (
    <section className="collections">
      <div className="container">
        <h2 className="section-title">Nuestras Colecciones</h2>
        <div className="collections__grid">
          {COLECCIONES.map((coleccion) => (
            <Link
              key={coleccion.categoria}
              to="/productos"
              className="collection-card"
              onClick={() => onVerCategoria(coleccion.categoria)}
            >
              <img src={coleccion.imagen} alt={coleccion.alt} />
              <span className="collection-card__label">{coleccion.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collections;
