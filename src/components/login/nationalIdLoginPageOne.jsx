import React, { useState } from 'react';
import SelectAbroadLogin from './SelectAbroadLogin';
import InputNationalIdLogin from './InputNationalIdLogin';
import InputPasswordLogin from './inputPasswordLogin';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import { Button } from '@mui/material';

export default function NationalIdLoginPageOne({ abroad, setAbroad, setIsLoading, setForgotPassword }) {
  const paternNationalId = /^[0-9]{10}$/;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const route = useRouter();
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = () => {
    const data = {
      userName: nationalId,
      password,
    };
    if (nationalId.match(paternNationalId) && password.length > 6) {
      setIsLoading(true);
      axios
        .post(mainDomain + '/api/Authenticate/Login', data)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('roles', res.data.roles);
            localStorage.setItem('expiration', res.data.expiration);
            Toast.fire({
              icon: 'success',
              text: 'با موفقیت وارد شدید',
            });
          }
          setTimeout(() => {
            route.replace('/dashboard');
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else if (!nationalId.match(paternNationalId)) {
      Toast.fire({
        icon: 'error',
        text: 'نام کاربری صحیح نیست',
      });
    } else if (password.length <= 6) {
      Toast.fire({
        icon: 'error',
        text: 'رمز عبور صحیح نیست (رمز عبور باید بزرگتر از 6 رقم باشد)',
      });
    }
  };
  return (
    <>
      <h2 className="text-3xl">صفحه ورود</h2>
      <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
      <InputNationalIdLogin nationalId={nationalId} setNationalId={setNationalId} />
      <InputPasswordLogin password={password} setPassword={setPassword} />
      <div className="flex px-5 mt-5 mx-auto lg:w-2/3 w-full">
        <div className="w-full">
          {/* <Button className="w-full px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 duration-300 text-white" onClick={loginHandler} variant="contained">ورود</Button> */}
          <Button
            sx={{
              py: 1,
              fontSize: 20,
              backgroundColor: 'rgb(16 185 129)',
              '&:hover': {
                backgroundColor: 'rgb(5 150 105)',
              },
            }}
            onClick={loginHandler}
            className="rounded-md w-full text-white mt-5 duration-300"
            variant="contained"
          >
            ورود
          </Button>
        </div>
      </div>
      <div className="px-5 text-start mt-4 lg:w-2/3 w-full mx-auto">
        <div>
        <Button
          size="medium"
          sx={{
            py: 1,
            fontSize: 16,
            backgroundColor: 'rgb(20 184 166)',
            '&:hover': {
              backgroundColor: 'rgb(13 148 136)',
            },
          }}
          onClick={() => setForgotPassword(true)}
          className="rounded-md  text-white mt-5 duration-300"
          variant="contained"
        >
          فراموشی رمز عبور
        </Button>
        </div>
        <div className='mt-4'>
        <Button
          size="medium"
          sx={{
            py: 1,
            fontSize: 16,
            backgroundColor: 'rgb(20 184 166)',
            '&:hover': {
              backgroundColor: 'rgb(13 148 136)',
            },
          }}
          onClick={() => {
            route.replace('/register');
          }}
          className="rounded-md  text-white mt-5 duration-300"
          variant="contained"
        >
          ساخت حساب جدید
        </Button>
        </div>
        {/* <button
          onClick={() => setForgotPassword(true)}
          className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 text-white"
        >
          
        </button> */}
      </div>
      <div className="text-start px-2">
        {/* <button
          onClick={() => {
            route.replace('/register');
          }}
          className="bg-slate-700 px-5 py-2 rounded-md text-white duration-300 hover:bg-slate-800"
        >
          
        </button> */}
      </div>
    </>
  );
}
