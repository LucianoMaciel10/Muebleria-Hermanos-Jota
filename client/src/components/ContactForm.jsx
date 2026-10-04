import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CAMPOS_INICIALES = {
  nombre: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

const validar = (campos) => {
  const errores = {};

  if (!campos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (campos.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!campos.correo.trim()) {
    errores.correo = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.correo)) {
    errores.correo = "El correo no tiene un formato válido.";
  }

  if (!campos.telefono.trim()) {
    errores.telefono = "El teléfono es obligatorio.";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(campos.telefono)) {
    errores.telefono = "El teléfono no tiene un formato válido.";
  }

  if (!campos.mensaje.trim()) {
    errores.mensaje = "El mensaje es obligatorio.";
  } else if (campos.mensaje.trim().length < 10) {
    errores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  }

  return errores;
};

function ContactForm() {
  const [campos, setCampos] = useState(CAMPOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (enviado) {
      const nuevosErrores = validar({ ...campos, [name]: value });
      setErrores(nuevosErrores);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    const nuevosErrores = validar(campos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      toast.error("Por favor corregí los errores del formulario.");
      return;
    }
    setCampos(CAMPOS_INICIALES);
    setErrores({});
    setEnviado(false);
    toast.success("¡Mensaje enviado! Te responderemos a la brevedad.");
  };

  return (
    <section className="pagina-contacto">
      <Toaster position="top-center" />

      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <h2 className="contacto">Contacto</h2>

        <label htmlFor="nombre">Nombre y apellido:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className={`input-form ${errores.nombre ? "input-form--error" : ""}`}
          placeholder="Jose Pablo"
          value={campos.nombre}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.nombre || ""}</p>

        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          className={`input-form ${errores.correo ? "input-form--error" : ""}`}
          placeholder="tumejormueble@gmail.com"
          value={campos.correo}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.correo || ""}</p>

        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className={`input-form ${errores.telefono ? "input-form--error" : ""}`}
          placeholder="+54 11 45763298"
          value={campos.telefono}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.telefono || ""}</p>

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          className={`input-form ${errores.mensaje ? "input-form--error" : ""}`}
          placeholder="Escribe tu consulta aquí."
          rows="4"
          value={campos.mensaje}
          onChange={handleChange}
        />
        <p className="input-error-msg">{errores.mensaje || ""}</p>

        <button type="submit" className="enviar-form">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default ContactForm;