import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import UserRoutes from '@/pages/user/UserRoutes';
import AdminRoutes from '@/pages/admin/AdminRoutes';
import PSDARoutes from '@/pages/psda/PSDARoutes';

const RoleRouter: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  // Extract the role from the path
  const pathSegments = location.pathname.split('/');
  const roleFromPath = pathSegments[1]; // e.g., 'user', 'admin', 'psda'

  // Determine which routes to render based on path or user role
  const getRoutes = () => {
    if (roleFromPath === 'user' || user.role === 'user') {
      return <UserRoutes />;
    } else if (roleFromPath === 'admin' || user.role === 'admin') {
      return <AdminRoutes />;
    } else if (roleFromPath === 'psda' || user.role === 'psda') {
      return <PSDARoutes />;
    } else {
      // Default to user role if no specific role in path
      return <UserRoutes />;
    }
  };

  return getRoutes();
};

export default RoleRouter;
