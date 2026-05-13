import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  // Verificamos si existe el token en el storage
  const token = localStorage.getItem('token');

  // Si existe el token, mostramos el contenido de la ruta (Outlet)
  // Si no, redirigimos al login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
