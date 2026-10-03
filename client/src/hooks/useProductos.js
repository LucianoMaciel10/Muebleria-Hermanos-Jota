import { useState, useEffect } from "react";

export function useProductos(categoriaSeleccionada, busqueda) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function cargarProductos() {
      setCargando(true);
      setError(null);
      try {
        const parametros = new URLSearchParams();
        if (categoriaSeleccionada)
          parametros.set("categoria", categoriaSeleccionada);
        if (busqueda) parametros.set("busqueda", busqueda);
        const base = import.meta.env.VITE_API_URL || "";
        const ruta = `${base}/api/productos${parametros.size ? `?${parametros}` : ""}`;
        const respuesta = await fetch(ruta, { signal: abortController.signal });
        if (!respuesta.ok)
          throw new Error(`Error ${respuesta.status} al obtener los productos`);
        const data = await respuesta.json();
        setProductos(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!abortController.signal.aborted) setCargando(false);
      }
    }

    // Sin debounce para categoría, con debounce para búsqueda
    if (busqueda) {
      const temporizador = setTimeout(cargarProductos, 400);
      return () => {
        clearTimeout(temporizador);
        abortController.abort();
      };
    } else {
      cargarProductos();
      return () => abortController.abort();
    }
  }, [categoriaSeleccionada, busqueda]);

  return { productos, cargando, error };
}
