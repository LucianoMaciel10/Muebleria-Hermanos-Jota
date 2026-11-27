import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


export default function ProtectedRoute({ children, soloAdmin = false }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }
  if (soloAdmin && usuario.rol !== 'admin') {
    return (
      <section className="pagina-carrito">
            <div className="contenedor-carrito">
              <h1 className="titulo-carrito">Acceso denegado</h1>
              <div className="mensaje-carrito-vacio">
                <h2>No tienes permisos de administrador para acceder a esta página</h2>
                <Link to="/" className="btn-catalogo">
                  Volver al inicio
                </Link>
              </div>
            </div>
          </section>
    );
  }
  return children;
}