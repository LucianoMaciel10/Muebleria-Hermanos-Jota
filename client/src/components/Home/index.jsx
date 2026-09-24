import Hero from "./Hero";
import Essence from "./Essence";
import Collections from "./Collections";
import FeaturedProducts from "./FeaturedProducts";
import Commitment from "./Commitment";

const IDS_DESTACADOS = [
  "butaca-mendoza",
  "mesa-centro-araucaria",
  "sillas-cordoba",
  "biblioteca-recoleta",
];

function Home({ onNavigate, productos, cargando, error }) {
  const destacados = IDS_DESTACADOS.map((id) =>
    productos.find((p) => p.id === id),
  ).filter(Boolean);

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Essence />
      <Collections onNavigate={onNavigate} />
      <FeaturedProducts
        destacados={destacados}
        cargando={cargando}
        error={error}
        onNavigate={onNavigate}
      />
      <Commitment />
    </>
  );
}

export default Home;
