import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

function validarCampos(nombre, email, password) {
  const errores = {};
  const correo = email.trim();

  if (!nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.';
  }

  if (!correo) {
    errores.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errores.email = 'Ingresá un email válido.';
  }

  if (!password) {
    errores.password = 'La contraseña es obligatoria.';
  }

  return errores;
}

export default function Registro() {
  const { registro } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarCampos(nombre, email, password);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error('Revisá los campos indicados.', {
        position: 'top-center',
        duration: 3000,
      });
      return;
    }

    try {
      await registro(nombre.trim(), email.trim(), password);
      toast.success('Registro e inicio de sesión exitoso.', {
        position: 'top-center',
        duration: 3000,
      });
      navigate(location.state?.desde || '/', { replace: true });
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : 'No pudimos completar el registro.',
        {
          position: 'top-center',
          duration: 4000,
        },
      );
    }
  }

  return (
    <section className="pagina-auth">
      <h1 className="form-title">Registrarse</h1>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          id="nombre" 
          name="nombre"
          placeholder="Muebleria Jota"
          required
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby="nombre-error"
          value={nombre} 
          onChange={(e) => {
            setNombre(e.target.value);
            setErrores((actuales) => ({ ...actuales, nombre: '' }));
          }} 
        />
        <p id="nombre-error" className="input-error-msg" role="alert">
          {errores.nombre || ''}
        </p>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          placeholder="ejemplo@gmail.com"
          required
          aria-invalid={Boolean(errores.email)}
          aria-describedby="email-error"
          value={email} 
          onChange={(e) => {
            setEmail(e.target.value);
            setErrores((actuales) => ({ ...actuales, email: '' }));
          }} 
        />
        <p id="email-error" className="input-error-msg" role="alert">
          {errores.email || ''}
        </p>
        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          required
          aria-invalid={Boolean(errores.password)}
          aria-describedby="password-error"
          value={password} 
          onChange={(e) => {
            setPassword(e.target.value);
            setErrores((actuales) => ({ ...actuales, password: '' }));
          }} 
        />
        <p id="password-error" className="input-error-msg" role="alert">
          {errores.password || ''}
        </p>
        <button type="submit" className="enviar-form">
          Crear cuenta
        </button>
      </form>
    </section>
  );
}