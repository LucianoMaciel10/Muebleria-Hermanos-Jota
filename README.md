# Mueblería Hermanos Jota — Sprint 5 y 6

E-commerce de mobiliario artesanal argentino. Esta etapa transforma el proyecto en una aplicación full stack con persistencia real: la API de Express se conecta a una base de datos MongoDB Atlas mediante Mongoose, implementa un CRUD completo de productos, y el frontend en React incorpora React Router DOM y formularios para crear, editar y eliminar productos.

## Integrantes

| Apellido y Nombre |
|---|
| Luciano Joaquin Maciel |
| Imanol Perez |
| Algañaraz Narella |

---

## Sitio en producción

🔗 Frontend (Vercel): [https://muebleria-hermanos-jota-peach.vercel.app](https://muebleria-hermanos-jota-peach.vercel.app)  
🔗 Backend (Render): [https://muebleria-hermanos-jota-backend.onrender.com](https://muebleria-hermanos-jota-backend.onrender.com)

---

## Requisitos previos

- Node.js v20.19 o superior
- npm v9 o superior
- Una base de datos en [MongoDB Atlas](https://www.mongodb.com/atlas) (un cluster con un usuario de base de datos y tu IP habilitada en *Network Access*)

---

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `MONGO_URI` | Sí | Cadena de conexión a MongoDB Atlas |
| `PORT` | No | Puerto del servidor. Por defecto `3000` |

Ejemplo de `backend/.env`:

```env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre-db>?retryWrites=true&w=majority
PORT=3000
```

> El archivo `.env` está en el `.gitignore`: nunca debe subirse al repositorio.

### Frontend (`client/.env`)

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `VITE_API_URL` | Solo en producción | URL base del backend, sin barra final (por ejemplo `https://muebleria-hermanos-jota-backend.onrender.com`) |

En desarrollo no hace falta definirla: Vite redirige las peticiones a `/api` hacia `http://localhost:3000` mediante el proxy configurado en `vite.config.js`.

### Variables en producción

- **Render (backend):** definir `MONGO_URI` en *Environment*. Render asigna `PORT` automáticamente.
- **Vercel (frontend):** definir `VITE_API_URL` con la URL del backend desplegado.

---

## Instalación y ejecución

El proyecto tiene dos aplicaciones independientes que deben correrse al mismo tiempo: el backend y el frontend.

### 1. Backend (Node.js + Express + MongoDB)

```bash
cd backend
npm install
# crear el archivo .env con las variables indicadas arriba
npm run seed   # opcional: carga los productos iniciales en la base de datos
npm run dev
```

El servidor quedará escuchando en `http://localhost:3000`.

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor con nodemon y carga el archivo `.env` |
| `npm start` | Inicia el servidor con `node server.js` (las variables deben estar definidas en el entorno, como en Render) |
| `npm run seed` | Carga en MongoDB los productos de `src/data/productos.js` |

> ⚠️ `npm run seed` **elimina todos los productos existentes** de la colección antes de insertar los iniciales.

### 2. Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

> Es necesario tener el backend corriendo antes de abrir el frontend, ya que este último hace peticiones a la API.

---

## Modelo de datos: Producto

| Campo | Tipo | Obligatorio | Observaciones |
|-------|------|-------------|---------------|
| `nombre` | String | Sí | |
| `descripcion` | String | Sí | |
| `categoria` | String | Sí | |
| `precio` | Number | Sí | Mínimo 0 |
| `stock` | Number | No | Por defecto `0`. Mínimo 0 |
| `imagenUrl` | String | No | URL directa a una imagen en internet |
| `alt` | String | No | Texto alternativo de la imagen |
| `caracteristicas` | [String] | No | Lista de características |

Mongoose agrega además `_id`, `createdAt` y `updatedAt`.

---

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Devuelve todos los productos |
| GET | `/api/productos?categoria=mesas` | Filtra por categoría |
| GET | `/api/productos?busqueda=sofá` | Filtra por nombre o descripción |
| GET | `/api/productos/:id` | Devuelve un producto por su `_id`. Responde 404 si no existe |
| POST | `/api/productos` | Crea un producto. Responde 201 con el producto creado |
| PUT | `/api/productos/:id` | Actualiza un producto existente y devuelve el producto actualizado |
| DELETE | `/api/productos/:id` | Elimina un producto. Responde `{ "mensaje": "Producto eliminado correctamente" }` |

**Errores:** todas las respuestas de error tienen el formato `{ "error": { "mensaje": "..." } }`.

- `400`: datos inválidos (incluye `detalles` con el campo y el mensaje de cada error de validación) o `id` con formato incorrecto.
- `404`: producto o ruta no encontrada.

---

## Rutas del frontend

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/productos` | Catálogo con filtros y botón para crear un producto |
| `/productos/:id` | Detalle del producto, con botones Editar y Eliminar |
| `/contacto` | Formulario de contacto |
| `/carrito` | Carrito de compras |
| `/admin/crear-producto` | Formulario de alta de producto |
| `/admin/editar-producto/:id` | Formulario de edición de producto (datos autocompletados) |

---

## Arquitectura del proyecto

```
/
├── backend/                      # Servidor Node.js + Express + Mongoose
│   ├── server.js                 # Punto de entrada: middlewares, rutas y conexión a la base
│   └── src/
│       ├── config/
│       │   └── db.js             # Conexión a MongoDB Atlas
│       ├── data/
│       │   └── productos.js      # Productos iniciales (usados por el seed)
│       ├── middleware/
│       │   ├── loggs.js          # Logging de cada petición
│       │   └── error404.js       # Rutas no encontradas y manejo centralizado de errores
│       ├── models/
│       │   └── Producto.js       # Schema y modelo de Producto
│       ├── routes/
│       │   └── productos.routes.js  # CRUD de /api/productos
│       └── seed.js               # Script para poblar la base de datos
│
├── client/                       # Aplicación React + Vite
│   ├── vercel.json               # Redirección a index.html para que las rutas funcionen al recargar
│   └── src/
│       ├── App.jsx               # Rutas, estado del carrito y filtros
│       ├── hooks/
│       │   └── useProductos.js   # Fetch de productos con debounce y función recargar
│       ├── pages/
│       │   ├── Inicio.jsx
│       │   ├── Catalogo.jsx
│       │   ├── ProductDetail.jsx
│       │   ├── ProductForm.jsx   # Formulario reutilizado para crear y editar
│       │   ├── ContactForm.jsx
│       │   └── Carrito.jsx
│       └── components/           # Navbar, Footer, Home/ y catalogo/
│
└── sprint1y2/                    # Entrega del Sprint 1 y 2 (sitio estático)
```

Las entregas anteriores también están identificadas con tags de git: `sprint-1-2` y `sprint-3-4`.

---

## Decisiones técnicas

**Persistencia con MongoDB y Mongoose:** los productos se guardan en MongoDB Atlas. El schema define los tipos, los campos obligatorios y los valores por defecto, y el backend responde con errores `400` y mensajes claros cuando los datos no son válidos.

**Navegación con React Router DOM:** reemplaza el estado `vista` de la entrega anterior. El detalle y la edición usan `useParams` para leer el `id`, y los formularios usan `useNavigate` para volver al catálogo o al detalle después de guardar o eliminar.

**Formulario reutilizable:** `ProductForm` se usa en `/admin/crear-producto` y `/admin/editar-producto/:id`. Si la URL tiene `:id`, carga el producto, autocompleta los campos y envía un `PUT`; si no, envía un `POST`. La categoría es un select con las categorías de los productos existentes, y las características se cargan en un textarea con una característica por línea.

**Eliminación con confirmación:** el botón Eliminar del detalle abre una ventana de confirmación antes de enviar el `DELETE`.

**Catálogo actualizado:** el hook `useProductos` expone una función `recargar`, que se ejecuta después de crear, editar o eliminar para que el catálogo muestre los datos actualizados.

**Estado global del carrito en `App.jsx`:** el carrito vive en el componente raíz y se pasa por props a las vistas que lo necesitan. Se persiste en `localStorage` para que no se pierda al recargar la página.

**Filtrado en el backend:** los filtros por categoría y búsqueda se resuelven en el servidor. El backend normaliza el texto (minúsculas y sin tildes) antes de comparar.

**CORS:** el backend solo acepta peticiones del frontend desplegado en Vercel. En desarrollo no hay problema, porque el proxy de Vite hace las peticiones desde el mismo origen.

**Deploy:** el frontend está en Vercel y el backend en Render. El archivo `client/vercel.json` redirige todas las rutas a `index.html`, de modo que las rutas de React Router funcionan al recargar la página.