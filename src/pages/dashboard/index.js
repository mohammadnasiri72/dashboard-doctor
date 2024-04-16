import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   if (router.pathname == '/dashboard') {
  //     if (localStorage.getItem('token')) {
  //       router.push('/dashboard/one');
  //     }else{
  //       router.push('/login');
  //     }
  //   }
  //   if (!localStorage.getItem('token')) {
  //     router.push('/login');
  //   }
  // });

  const [account, setAccount] = useState('');

  let token = '';

  useEffect(() => {
    token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      router.replace('/login');
    } else {
      axios
        .get('https://cis.aitest.ir/api/Patient/Get', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAccount(res.data);
          } else {
            router.replace('/login');
          }
        })
        .catch((err) => {
          // console.log(err);
          router.replace('/login');
        });
    }
  }, []);

  return null;
}
