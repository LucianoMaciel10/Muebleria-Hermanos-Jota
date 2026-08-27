/* =========================================================
    HERMANOS JOTA — index.js
    Lógica de la Página de Inicio:
    - Menú de navegación responsive (mobile)
    - Renderizado dinámico de productos destacados
    - Lectura básica del contador del carrito (placeholder
      para integrarse con carrito.js de la Parte 4)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderFeaturedProducts();
  updateCartCount();
});

/* ---------- Navegación mobile (hamburguesa) ---------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cierra el menú al elegir una opción (mejora la UX en mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Productos destacados (Catálogo Hermanos Jota) ---------- */
const productosDestacados = [
  {
    id: "butaca-mendoza",
    nombre: "Butaca Mendoza",
    descripcion:
      "Tapizada en bouclé Dusty Rose sobre una base maciza de guatambú.",
    imagen: "assets/images/butaca-mendoza.png",
    alt: "Butaca Mendoza tapizada en bouclé rosa con base de madera",
  },
  {
    id: "mesa-centro-araucaria",
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "Sobre de mármol Patagonia sobre una base de tres patas en nogal.",
    imagen: "assets/images/mesa-centro-araucaria.png",
    alt: "Mesa de centro con tapa de mármol y base de madera de nogal",
  },
  {
    id: "sillas-cordoba",
    nombre: "Sillas Córdoba",
    descripcion:
      "Set de 4 sillas apilables en nogal, con estructura pintada en Sage Green.",
    imagen: "assets/images/sillas-cordoba.png",
    alt: "Set de sillas de comedor de madera con asiento verde",
  },
  {
    id: "biblioteca-recoleta",
    nombre: "Biblioteca Recoleta",
    descripcion:
      "Sistema modular de estantes en acero Sage Green y repisas de roble claro.",
    imagen: "assets/images/biblioteca-recoleta.png",
    alt: "Biblioteca modular de madera con estructura metálica",
  },
];

function renderFeaturedProducts() {
  const contenedor = document.getElementById("featured-products");
  if (!contenedor) return;

  contenedor.innerHTML = productosDestacados
    .map(
      (producto) => `
      <article class="product-card">
        <a href="producto.html?id=${producto.id}" class="product-card__link">
          <div class="product-card__media">
            <img src="${producto.imagen}" alt="${producto.alt}" loading="lazy">
          </div>
          <div class="product-card__body">
            <h3 class="product-card__title">${producto.nombre}</h3>
            <p class="product-card__desc">${producto.descripcion}</p>
            <span class="product-card__cta">Ver detalle →</span>
          </div>
        </a>
      </article>
    `,
    )
    .join("");
}

/* ---------- Contador del carrito (placeholder) ---------- */
/*  La Parte 4 (carrito.js) es responsable de escribir en
    localStorage bajo la clave 'hj-carrito' como un array de
    objetos { id, cantidad, ... }. Acá solo lo leemos. */
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  try {
    const carrito = JSON.parse(localStorage.getItem("hj-carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    badge.textContent = total;
    badge.hidden = total === 0;
  } catch (error) {
    badge.hidden = true;
  }
}
