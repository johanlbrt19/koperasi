import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PSDALayout from '@/components/layouts/PSDALayout';
import PSDADashboard from './PSDADashboard';
import FinancialReports from './FinancialReports';
import PSDAEvents from './events/PSDAEvents';
import PSDAEventForm from './events/PSDAEventForm';

const PSDARoutes: React.FC = () => {
  return (
    <PSDALayout>
      <Routes>
        <Route path="/" element={<PSDADashboard />} />
        <Route path="/reports" element={<FinancialReports />} />
        <Route path="/events" element={<PSDAEvents />} />
        <Route path="/events/new" element={<PSDAEventForm />} />
        <Route path="/events/:id" element={<PSDAEventForm />} />
      </Routes>
    </PSDALayout>
  );
};

export default PSDARoutes;
