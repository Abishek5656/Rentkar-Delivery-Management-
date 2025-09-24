'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function HomePage() {
  const { token, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    } else if (role === 'admin') {
      router.replace('/admin/dashboard');
    } else if (role === 'partner') {
      router.replace('/partner/dashboard');
    }
  }, [token, role, router]);

  
  // While deciding redirect, show loader
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}
