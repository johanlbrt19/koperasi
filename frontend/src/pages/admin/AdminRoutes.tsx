import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUsers />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
