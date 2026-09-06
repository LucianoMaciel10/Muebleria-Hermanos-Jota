/* Datos complementarios del detalle (creo que es suficiente, para no tanto texto) */
const detallesProductos = {
  "sofa-patagonia": {
    descripcionCompleta:
      "Sofá amplio tapizado en lino claro, pensado para crear un ambiente cálido y confortable.",
    caracteristicas: [
      "Tapizado en lino claro",
      "Diseño amplio y confortable",
      "Patas cónicas de madera",
    ],
  },
  "sillon-copacabana": {
    descripcionCompleta:
      "Sillón envolvente tapizado en cuero cognac, ideal para sumar confort y personalidad al ambiente.",
    caracteristicas: [
      "Tapizado en cuero color cognac",
      "Diseño envolvente",
      "Estructura resistente",
    ],
  },
  "butaca-mendoza": {
    descripcionCompleta:
      "Butaca compacta tapizada en bouclé rosa, con una base de madera que combina comodidad y estilo.",
    caracteristicas: [
      "Tapizado en bouclé rosa",
      "Formato compacto",
      "Base de madera",
    ],
  },
  "mesa-comedor-pampa": {
    descripcionCompleta:
      "Mesa de comedor de roble macizo, diseñada para acompañar reuniones y momentos compartidos.",
    caracteristicas: [
      "Fabricada en roble macizo",
      "Superficie amplia",
      "Diseño de comedor familiar",
    ],
  },
  "mesa-centro-araucaria": {
    descripcionCompleta:
      "Mesa baja con tapa de mármol y base de nogal, una pieza central de presencia cálida y sofisticada.",
    caracteristicas: [
      "Tapa de mármol",
      "Base de nogal",
      "Formato de mesa baja",
    ],
  },
  "mesa-noche-aconcagua": {
    descripcionCompleta:
      "Mesa auxiliar de madera con cajón, práctica para mantener objetos esenciales siempre al alcance.",
    caracteristicas: [
      "Construcción de madera",
      "Incluye cajón auxiliar",
      "Formato compacto",
    ],
  },
  "aparador-uspallata": {
    descripcionCompleta:
      "Aparador de nogal con amplio espacio interior, pensado para organizar el hogar con elegancia.",
    caracteristicas: [
      "Fabricado en nogal",
      "Amplio espacio interior",
      "Puertas de guardado",
    ],
  },
  "biblioteca-recoleta": {
    descripcionCompleta:
      "Biblioteca modular de madera y metal, ideal para organizar libros y objetos decorativos.",
    caracteristicas: [
      "Sistema modular",
      "Repisas de madera",
      "Estructura metálica",
    ],
  },
  "escritorio-costa": {
    descripcionCompleta:
      "Escritorio funcional de bambú laminado, creado para acompañar jornadas de trabajo y estudio.",
    caracteristicas: [
      "Bambú laminado",
      "Diseño funcional",
      "Incluye cajones",
    ],
  },
  "silla-trabajo-belgrano": {
    descripcionCompleta:
      "Silla de trabajo de madera y tapizado, pensada para brindar comodidad durante la jornada.",
    caracteristicas: [
      "Estructura de madera",
      "Asiento tapizado",
      "Diseño para espacios de trabajo",
    ],
  },
  "sillas-cordoba": {
    descripcionCompleta:
      "Set de cuatro sillas apilables, una solución práctica y versátil para el comedor.",
    caracteristicas: [
      "Set de 4 sillas",
      "Diseño apilable",
      "Estructura de madera",
    ],
  },
};
/* fin bloque: datos complementarios del detalle */

/* Renderizado del detalle de producto */
function renderizarDetalleProducto() {
  const parametros = new URLSearchParams(window.location.search);
  const productoId = parametros.get("id");
  const producto = productos.find((item) => item.id === productoId);
  const detalle = detallesProductos[productoId] || {};

  const mensaje = document.getElementById("product-message");
  const contenido = document.getElementById("product-detail-content");

  if (!producto) {
    mensaje.textContent = "No encontramos el producto solicitado.";
    mensaje.setAttribute("role", "alert");
    contenido.hidden = true;
    return;
  }

  const imagen = document.getElementById("product-image");
  const categoria = document.getElementById("product-category");
  const nombre = document.getElementById("product-detail-title");
  const descripcion = document.getElementById("product-description");
  const precio = document.getElementById("product-price");
  const stock = document.getElementById("product-stock");
  const caracteristicas = document.getElementById("product-features");
  const botonAgregar = document.getElementById("add-to-cart");

  imagen.src = producto.imagen;
  imagen.alt = producto.alt;
  categoria.textContent = producto.categoria;
  nombre.textContent = producto.nombre;
  descripcion.textContent = detalle.descripcionCompleta || producto.descripcion;
  precio.textContent = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(producto.precio);
  stock.textContent = producto.stock ? "Disponible" : "Sin stock";
  caracteristicas.innerHTML = "";

  (detalle.caracteristicas || []).forEach((caracteristica) => {
    const item = document.createElement("li");
    item.textContent = caracteristica;
    caracteristicas.appendChild(item);
  });

  botonAgregar.disabled = !producto.stock;
  botonAgregar.setAttribute("aria-disabled", String(!producto.stock));
  contenido.hidden = false;
  mensaje.hidden = true;

  configurarAgregarAlCarrito(producto);
}
/* fin bloque: renderizado del detalle de producto */

/* Cantidad y agregado al carrito */
function configurarAgregarAlCarrito(producto) {
  const cantidad = document.getElementById("product-quantity");
  const botonAgregar = document.getElementById("add-to-cart");
  const mensaje = document.getElementById("product-message");

  cantidad.addEventListener("input", () => {
    const valor = Number.parseInt(cantidad.value, 10);
    if (!Number.isInteger(valor) || valor < 1) {
      cantidad.value = 1;
    }
  });

  botonAgregar.addEventListener("click", () => {
    if (!producto.stock || !window.hjCart) return;

    const cantidadElegida = Math.max(
      1,
      Number.parseInt(cantidad.value, 10) || 1,
    );

    for (let indice = 0; indice < cantidadElegida; indice += 1) {
      window.hjCart.add(producto);
    }

    mensaje.hidden = false;
    mensaje.setAttribute("role", "status");
    mensaje.textContent = "Producto agregado correctamente al carrito!";
  });
}
/* fin: cantidad y agregado al carrito */

/* Inicio del detalle */
document.addEventListener("DOMContentLoaded", renderizarDetalleProducto);
/* Inicio del detalle */
