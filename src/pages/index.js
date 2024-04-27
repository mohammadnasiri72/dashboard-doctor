import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SimpleBackdrop from '../components/backdrop';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  // console.log(router.pathname);
 

  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/dashboard');
    }
  });

  return (
    <>
      <SimpleBackdrop />
    </>
  );
}
