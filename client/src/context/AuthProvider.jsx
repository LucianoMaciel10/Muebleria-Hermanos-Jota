import{ useState } from 'react';
import { AuthContext } from './AuthContext';

const base = import.meta.env.VITE_API_URL || "";

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion')));

  async function registro(nombre, email, password) {
    const respuesta = await fetch(`${base}/api/usuarios/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo registrar el usuario');
    await login(datos.email, password);
  }

  async function login(email, password) {
    const respuesta = await fetch(`${base}/api/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo iniciar sesión');
    localStorage.setItem('sesion', JSON.stringify(datos));
    setSesion(datos);
  }

  function logout() {
    localStorage.removeItem('sesion');
    setSesion(null);
  }

  const valor = {
    usuario: sesion ? sesion.usuario : null,
    token: sesion ? sesion.token : null,
    registro,
    login,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}