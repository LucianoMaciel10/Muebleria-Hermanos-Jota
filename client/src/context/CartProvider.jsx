import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || [],
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Agrega el producto, suma si ya estaba en el carrito sin superar el stock
  const agregarAlCarrito = (productoNuevo, cantidad = null) => {
    const cantidadAgregar = cantidad || 1;
    const enCarrito =
      carrito.find((producto) => producto._id === productoNuevo._id)?.cantidad || 0;
    const disponibles = productoNuevo.stock - enCarrito;

    if (cantidadAgregar > disponibles) return;

    const mensaje =
      enCarrito > 0
        ? `${productoNuevo.nombre} ya estaba en el carrito, se sumó ${cantidadAgregar > 1 ? `${cantidadAgregar} unidades` : "una unidad"}`
        : `${productoNuevo.nombre} agregado al carrito`;

    setCarrito((carritoAnterior) => {
      const yaExiste = carritoAnterior.find((p) => p._id === productoNuevo._id);
      if (yaExiste) {
        return carritoAnterior.map((p) =>
          p._id === productoNuevo._id
            ? { ...p, stock: productoNuevo.stock, cantidad: p.cantidad + cantidadAgregar }
            : p,
        );
      }
      return [...carritoAnterior, { ...productoNuevo, cantidad: cantidadAgregar }];
    });

    toast.success(mensaje, { position: "bottom-right", duration: 4000 });
  };

  return (
    <CartContext.Provider
      value={{ carrito, setCarrito, agregarAlCarrito, cantidadCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
}