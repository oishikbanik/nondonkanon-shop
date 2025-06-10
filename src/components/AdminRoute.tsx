import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.isAdmin; // In a real app, this would be properly validated

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
