import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import VolunteersManagement from './VolunteersManagement';
import Settings from './Settings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="volunteers" element={<VolunteersManagement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;