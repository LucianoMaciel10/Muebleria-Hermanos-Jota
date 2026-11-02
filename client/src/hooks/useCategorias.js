import { useState, useEffect } from "react";

const base = import.meta.env.VITE_API_URL || "";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function cargarCategorias() {
      try {
        const respuesta = await fetch(`${base}/api/categorias`, {
          signal: abortController.signal,
        });
        if (!respuesta.ok) {
          throw new Error(
            `Error ${respuesta.status} al obtener las categorías`,
          );
        }
        setCategorias(await respuesta.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    }

    cargarCategorias();
    return () => abortController.abort();
  }, []);

  return { categorias, error };
}
