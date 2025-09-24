
'use client';


import Layout from '@/components/Layout';
import PartnerDashboard from '@/components/PartnerDashboard'; // move previous dashboard code into this component
import ProtectedRoute from '@/components/ProtectedRoute';


export default function PartnerPage() {
  return (
    <ProtectedRoute allowedRoles={['partner']}>
      <Layout>
        <PartnerDashboard />
      </Layout>
    </ProtectedRoute>

  );
}
