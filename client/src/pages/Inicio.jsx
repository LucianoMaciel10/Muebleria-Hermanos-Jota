import Hero from "../components/Home/Hero";
import Essence from "../components/Home/Essence";
import Collections from "../components/Home/Collections";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Commitment from "../components/Home/Commitment";

const PRODUCTOS_DESTACADOS = [
  "Butaca Mendoza",
  "Mesa de Centro Araucaria",
  "Sillas Córdoba",
  "Biblioteca Recoleta",
];

function Home({
  onNavigate,
  productos,
  cargando,
  error,
  onVerCategoria,
}) {
  const destacados = PRODUCTOS_DESTACADOS.map((nombre) =>
    productos.find((p) => p.nombre === nombre),
  ).filter(Boolean);

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Essence />
      <Collections
        onVerCategoria={onVerCategoria}
      />
      <FeaturedProducts
        destacados={destacados}
        cargando={cargando}
        error={error}
      />
      <Commitment />
    </>
  );
}

export default Home;
