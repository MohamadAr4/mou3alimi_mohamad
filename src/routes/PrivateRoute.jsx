import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  return (localStorage.getItem('token') !== null) ? <Outlet /> : <Navigate to="/login" replace />;
}