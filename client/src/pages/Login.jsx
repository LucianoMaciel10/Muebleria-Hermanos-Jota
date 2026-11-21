import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

function validarCampos(email, password) {
  const errores = {};
  const correo = email.trim();

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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarCampos(email, password);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      toast.error('Revisá los campos indicados.', {
        position: 'top-center',
        duration: 3000,
      });
      return;
    }

    try {
      await login(email.trim(), password);
      toast.success('Inicio de sesión exitoso.', {
        position: 'top-center',
        duration: 3000,
      });
      navigate(location.state?.desde || '/', { replace: true });
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : 'No pudimos iniciar sesión.',
        {
          position: 'top-center',
          duration: 4000,
        },
      );
    }
  }

  return (
    <section className="pagina-login">
      <h1 className="login">Ingresar</h1>
      <form onSubmit={handleSubmit} className="formulario-login" noValidate>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          autoComplete="email"
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
          autoComplete="current-password"
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
          Ingresar
        </button>
      </form>
    </section>
  );
}