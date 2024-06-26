import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/loader';
import SimpleBackdrop from '../../components/backdrop';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == '/dashboard') {
      router.push('/dashboard/profile');
    }
  });

  return <SimpleBackdrop />;
}
