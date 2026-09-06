# Mueblería Hermanos Jota

E-commerce de mobiliario artesanal argentino. El sitio permite explorar un catálogo de productos, ver el detalle de cada pieza y gestionar un carrito de compras, todo con una estética cuidada centrada en diseño atemporal y materiales sustentables.

> Proyecto desarrollado en el marco del curso de **Desarrollador Full Stack MERN**. Esta primera etapa corresponde al frontend estático del sitio; a lo largo del curso se irá incorporando el stack MERN completo (MongoDB, Express, React y Node.js) para sumar backend, base de datos y funcionalidades dinámicas.

## Integrantes

| Apellido y Nombre |
|---|
| Luciano Joaquin Maciel |
| Oriana Sol Forciniti |
| Zaiqui Marcial Facundo Emanuel |
| Imanol Perez |
| Algañaraz Narella |

## Descripción de la funcionalidad

- **Catálogo de productos** (`productos.html`): listado de muebles con filtrado por categoría (Asientos, Mesas, Almacenamiento, Escritorios) y búsqueda por texto.
- **Detalle de producto** (`producto.html`): vista individual de cada pieza con imagen, descripción y precio.
- **Carrito de compras** (`carrito.html`): agregado, eliminado y vaciado de productos, cálculo de subtotal, impuestos y total, con persistencia en el navegador mediante `localStorage`.
- **Formulario de contacto** (`contacto.html`): formulario con validación de campos (nombre, correo, teléfono y mensaje).
- **Landing principal** (`index.html`): presentación de la marca y acceso a las demás secciones.

## Tecnologías utilizadas

- **HTML5** — estructura semántica de las páginas.
- **CSS3** — estilos y diseño responsive (`css/styles.css`).
- **JavaScript (Vanilla)** — lógica de filtrado, carrito de compras, validación de formularios y menú de navegación responsive (navbar hamburguesa en mobile).
- **Web Storage API (`localStorage`)** — persistencia del carrito de compras entre sesiones.
- **Google Fonts** (Inter y Playfair Display) — tipografías del sitio.


## Estructura del proyecto

```
├── index.html            # Página de inicio
├── productos.html        # Catálogo de productos
├── producto.html         # Detalle de un producto
├── carrito.html          # Carrito de compras
├── contacto.html         # Formulario de contacto
├── css/
│   └── styles.css
├── js/
│   ├── index.js
│   ├── productos.js
│   ├── producto.js
│   └── carrito.js
└── assets/
    ├── images/           # Imágenes de productos y logo
    └── docs/             # Manual de marca y catálogo en PDF
```

## Sitio en producción

🔗 [https://muebleria-hermanos-jota-38vj.onrender.com](https://muebleria-hermanos-jota-38vj.onrender.com)
