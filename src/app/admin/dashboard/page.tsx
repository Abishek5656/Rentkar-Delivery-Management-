'use client';

import Layout from '@/components/Layout';
import AdminDashboard from '@/components/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <AdminDashboard />
      </Layout>
    </ProtectedRoute>
  );
}
