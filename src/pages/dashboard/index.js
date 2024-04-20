import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/loader';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == '/dashboard') {
      router.push('/dashboard/profile');
    }
  });

  return <Loader />;
}
