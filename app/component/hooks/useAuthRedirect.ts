'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '../utils/authUtils';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    //console.log("GGGGGGGGGGGGGGGGGG",token)

    if (!token || token === 'null' || token.trim() === '' || isTokenExpired(token)) {
      localStorage.clear(); // Or remove only 'accessToken'
      router.replace('/'); // Redirect to login
    }
  }, []);
};
