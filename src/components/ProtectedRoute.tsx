
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'partner')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { token, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let currentToken = token;
    let currentRole = role;

    // ✅ Hydrate from localStorage if Redux is empty
    if (!currentToken) {
      const storedToken = localStorage.getItem('token');
      const storedAuth = localStorage.getItem('auth');

      
      if (storedToken && storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        currentToken = storedToken;
        currentRole = parsedAuth.role;
      }
    }

    // ✅ Redirect logic
    if (!currentToken) {
      router.replace('/login');
    } else if (currentRole && !allowedRoles.includes(currentRole)) {
      router.replace('/login'); // or /unauthorized
    } else {
      setAuthChecked(true); // allowed to render
    }
  }, [token, role, allowedRoles, router]);

  // While checking auth → render nothing
  if (!authChecked) {
    return null;
  }

  return <>{children}</>;
}
