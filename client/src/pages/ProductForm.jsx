import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const base = import.meta.env.VITE_API_URL || "";

const CAMPOS_INICIALES = {
  nombre: "",
  descripcion: "",
  categoria: "",
  precio: "",
  stock: "",
  imagenUrl: "",
  alt: "",
  caracteristicas: "",
};

const esUrlValida = (valor) => {
  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const validar = (campos) => {
  const errores = {};

  if (!campos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (!campos.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria.";
  }

  if (!campos.categoria) {
    errores.categoria = "La categoría es obligatoria.";
  }

  if (campos.precio === "") {
    errores.precio = "El precio es obligatorio.";
  } else if (Number(campos.precio) < 0) {
    errores.precio = "El precio no puede ser negativo.";
  }

  if (campos.stock !== "" && Number(campos.stock) < 0) {
    errores.stock = "El stock no puede ser negativo.";
  }

  if (campos.imagenUrl.trim() && !esUrlValida(campos.imagenUrl.trim())) {
    errores.imagenUrl = "Ingresá una URL válida (http:// o https://).";
  }

  return errores;
};

function ProductForm({ onGuardado }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [campos, setCampos] = useState(CAMPOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(editando);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Categorías de los productos existentes
  useEffect(() => {
    const abortController = new AbortController();
    async function cargarCategorias() {
      try {
        const respuesta = await fetch(`${base}/api/productos`, {
          signal: abortController.signal,
        });
        if (!respuesta.ok) throw new Error();
        const data = await respuesta.json();
        setCategorias([...new Set(data.map((p) => p.categoria))].sort());
      } catch (err) {
        if (err.name !== "AbortError")
          toast.error("No pudimos cargar las categorías.");
      }
    }
    cargarCategorias();
    return () => abortController.abort();
  }, []);

  // En modo edición, carga el producto y autocompleta el formulario
  useEffect(() => {
    if (!id) return;
    const abortController = new AbortController();
    async function cargarProducto() {
      setCargando(true);
      setError(null);
      try {
        const respuesta = await fetch(`${base}/api/productos/${id}`, {
          signal: abortController.signal,
        });
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al obtener el producto`);
        }
        const p = await respuesta.json();
        setCampos({
          nombre: p.nombre,
          descripcion: p.descripcion,
          categoria: p.categoria,
          precio: String(p.precio),
          stock: String(p.stock ?? ""),
          imagenUrl: p.imagenUrl || "",
          alt: p.alt || "",
          caracteristicas: (p.caracteristicas || []).join("\n"),
        });
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!abortController.signal.aborted) setCargando(false);
      }
    }
    cargarProducto();
    return () => abortController.abort();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (enviado) {
      setErrores(validar({ ...campos, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);
    const nuevosErrores = validar(campos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Por favor corregí los errores del formulario.", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    const producto = {
      nombre: campos.nombre.trim(),
      descripcion: campos.descripcion.trim(),
      categoria: campos.categoria,
      precio: Number(campos.precio),
      stock: campos.stock === "" ? 0 : Number(campos.stock),
      imagenUrl: campos.imagenUrl.trim(),
      alt: campos.alt.trim(),
      caracteristicas: campos.caracteristicas
        .split("\n")
        .map((linea) => linea.trim())
        .filter(Boolean),
    };

    setGuardando(true);
    try {
      const respuesta = await fetch(
        editando ? `${base}/api/productos/${id}` : `${base}/api/productos`,
        {
          method: editando ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        },
      );
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.error?.mensaje || `Error ${respuesta.status}`);
      }
      toast.success(
        editando
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente.",
        { position: "top-center", duration: 4000 },
      );
      onGuardado();
      navigate(editando ? `/productos/${id}` : "/productos");
    } catch (err) {
      toast.error(`No pudimos guardar el producto. ${err.message}`, {
        position: "top-center",
        duration: 4000,
      });
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <section className="pagina-contacto">
        <p role="status">Cargando producto...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pagina-contacto">
        <p role="alert">No pudimos cargar el producto. {error}</p>
      </section>
    );
  }

  return (
    <section className="pagina-contacto">
      <form
        className="formulario-contacto formulario-producto"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="contacto">
          {editando ? "Editar producto" : "Crear producto"}
        </h2>

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className={`input-form ${errores.nombre ? "input-form--error" : ""}`}
          placeholder="Sofá Patagonia"
          value={campos.nombre}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.nombre || ""}</p>

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className={`input-form ${errores.descripcion ? "input-form--error" : ""}`}
          placeholder="Sofá amplio tapizado en lino claro."
          rows="3"
          value={campos.descripcion}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.descripcion || ""}</p>

        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          name="categoria"
          className={`input-form ${errores.categoria ? "input-form--error" : ""}`}
          value={campos.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <p className="input-error-msg">{errores.categoria || ""}</p>

        <div className="input-form-fila">
          <div className="input-form-columna">
            <label htmlFor="precio">Precio ($):</label>
            <input
              type="number"
              id="precio"
              name="precio"
              min="0"
              step="any"
              className={`input-form ${errores.precio ? "input-form--error" : ""}`}
              placeholder="1950000"
              value={campos.precio}
              onChange={handleChange}
            />
            <p className="input-error-msg">{errores.precio || ""}</p>
          </div>

          <div className="input-form-columna">
            <label htmlFor="stock">Stock (opcional):</label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              step="1"
              className={`input-form ${errores.stock ? "input-form--error" : ""}`}
              placeholder="0"
              value={campos.stock}
              onChange={handleChange}
            />
            <p className="input-error-msg">{errores.stock || ""}</p>
          </div>
        </div>

        <label htmlFor="imagenUrl">URL de la imagen (opcional):</label>
        <input
          type="url"
          id="imagenUrl"
          name="imagenUrl"
          className={`input-form ${errores.imagenUrl ? "input-form--error" : ""}`}
          placeholder="https://ejemplo.com/imagen.png"
          value={campos.imagenUrl}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.imagenUrl || ""}</p>

        <label htmlFor="alt">Texto alternativo de la imagen (opcional):</label>
        <input
          type="text"
          id="alt"
          name="alt"
          className="input-form"
          placeholder="Sofá de lino claro con patas de madera"
          value={campos.alt}
          onChange={handleChange}
        />

        <label htmlFor="caracteristicas">
          Características (opcional, una por línea):
        </label>
        <textarea
          id="caracteristicas"
          name="caracteristicas"
          className="input-form"
          placeholder={"Tapizado en lino natural\nPatas de madera maciza"}
          rows="5"
          wrap="off"
          value={campos.caracteristicas}
          onChange={handleChange}
        />

        <button type="submit" className="enviar-form" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : editando
              ? "Guardar cambios"
              : "Crear producto"}
        </button>
      </form>
    </section>
  );
}

export default ProductForm;
