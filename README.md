# Mueblería Hermanos Jota — Sprint 3 y 4

E-commerce de mobiliario artesanal argentino. Esta segunda etapa transforma el proyecto en una aplicación cliente-servidor real: el frontend fue reconstruido desde cero en React y el backend es una API REST propia construida con Node.js y Express.

## Integrantes

| Apellido y Nombre         |
|---------------------------|
| Luciano Joaquin Maciel    |
| Oriana Sol Forciniti      |
| Zaiqui Marcial Facundo Emanuel |
| Imanol Perez              |
| Algañaraz Narella         |

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior

---

## Instalación y ejecución

El proyecto tiene dos aplicaciones independientes que deben correrse al mismo tiempo: el backend y el frontend.

### 1. Backend (Node.js + Express)

```bash
cd backend
npm install
node server.js
```

El servidor quedará escuchando en `http://localhost:3000`.

### 2. Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

> Es necesario tener el backend corriendo antes de abrir el frontend, ya que este último hace peticiones a la API para obtener los productos.

---

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Devuelve todos los productos en JSON |
| GET | `/api/productos?categoria=mesas` | Filtra por categoría |
| GET | `/api/productos?busqueda=sofá` | Filtra por nombre o descripción |
| GET | `/api/productos/:id` | Devuelve un producto por su id. Retorna 404 si no existe |

---

## Arquitectura del proyecto

```
/
├── backend/                  # Servidor Node.js + Express
│   ├── server.js             # Punto de entrada, configuración de middlewares y rutas
│   └── src/
│       ├── data/
│       │   └── productos.js  # Array de productos (fuente de datos local)
│       ├── middleware/
│       │   ├── loggs.js      # Middleware de logging (método y URL de cada petición)
│       │   └── error404.js   # Manejador de rutas no encontradas y errores centralizados
│       └── routes/
│           └── productos.routes.js  # Rutas de la API organizadas con express.Router
│
└── client/                   # Aplicación React + Vite
    └── src/
        ├── App.jsx            # Componente raíz: estado global, navegación y distribución de datos
        ├── hooks/
        │   └── useProductos.js  # Custom hook para el fetch de productos con debounce
        └── components/
            ├── Navbar.jsx
            ├── Footer.jsx
            ├── Carrito.jsx
            ├── ContactForm.jsx
            ├── Home/
            │   ├── index.jsx
            │   ├── Hero.jsx
            │   ├── Essence.jsx
            │   ├── Collections.jsx
            │   ├── FeaturedProducts.jsx
            │   └── Commitment.jsx
            └── catalogo/
                ├── HeaderCatalog.jsx
                ├── ProductList.jsx
                ├── ProductCard.jsx
                └── ProductDetail.jsx
```

---

## Decisiones técnicas

**Navegación sin React Router:** la navegación entre vistas se implementó mediante un estado `vista` en `App.jsx` con renderizado condicional. React Router está previsto para la siguiente entrega.

**Estado global del carrito en App.jsx:** el carrito vive como estado en el componente raíz y se distribuye a los componentes que lo necesitan vía props. Las funciones para modificarlo (`agregarAlCarrito`, etc.) también viven en `App.jsx` ya que son necesarias en múltiples vistas.

**Persistencia del carrito con localStorage:** la consigna no especifica persistencia del carrito pero, dado que la base de datos se incorpora en la siguiente entrega, se optó por guardar el carrito en `localStorage` para evitar que el usuario pierda su selección al recargar la página.

**Custom hook `useProductos`:** la lógica del fetch de productos fue extraída a un custom hook para mantener `App.jsx` limpio y reutilizable. El hook aplica debounce de 400ms para la búsqueda por texto (evita un fetch por cada letra escrita) pero no para el filtro por categoría (respuesta inmediata al seleccionar).

**Filtrado en el backend:** los filtros por categoría y búsqueda se resuelven en el servidor, no en el frontend. El backend normaliza el texto (minúsculas, sin tildes) antes de comparar, lo que hace que la búsqueda sea tolerante a errores de acentuación.

**Deploy:** el frontend está deployado en Vercel y el backend en Render. Vercel está optimizado para servir aplicaciones de React compiladas como archivos estáticos, mientras que Render mantiene el proceso de Node.js corriendo continuamente para atender las peticiones de la API.

---

## Sitio en producción

🔗 Frontend: [https://muebleria-hermanos-jota-peach.vercel.app](https://muebleria-hermanos-jota-peach.vercel.app)  
🔗 Backend: [https://muebleria-hermanos-jota-backend.onrender.com](https://muebleria-hermanos-jota-backend.onrender.com)