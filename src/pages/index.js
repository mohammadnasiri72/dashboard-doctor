import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  // console.log(router.pathname);
 

  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/login');
    }
  });

  return (
    <>
      {/* <div className="flex justify-center">
        <div className='px-3'>
          <Link className="text-3xl" href={'/register'}>
            عضویت
          </Link>
        </div>
        <div className='px-3'>
          <Link className="text-3xl" href={'/login'}>
            ورود
          </Link>
        </div>
      </div> */}
      {/* {
        localStorage.getItem('token')?
        router.push('/dashboard/one'):
        router.push('/login')
      } */}
    </>
  );
}
