import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '@/components/layouts/UserLayout';
import UserDashboard from './UserDashboard';
import Savings from './Savings';
import Loans from './Loans';
import Profile from './Profile';
import Events from './Events';

const UserRoutes: React.FC = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more user routes here */}
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
