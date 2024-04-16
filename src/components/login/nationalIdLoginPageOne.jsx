import React, { useState } from 'react';
import SelectAbroadLogin from './SelectAbroadLogin';
import InputNationalIdLogin from './InputNationalIdLogin';
import InputPasswordLogin from './inputPasswordLogin';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function NationalIdLoginPageOne({abroad , setAbroad , setIsLoading , setForgotPassword}) {
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
            .post('https://cis.aitest.ir/api/Authenticate/Login', data)
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
                route.replace('/dashboard/one');
              }, 1000);
            })
            .catch((err) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: err.response.data,
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
      <h2 className="text-3xl font-semibold text-white">صفحه ورود</h2>
      <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
      <InputNationalIdLogin nationalId={nationalId} setNationalId={setNationalId} />
      <InputPasswordLogin password={password} setPassword={setPassword} />
      <div className="flex px-10 mt-5">
        <div className="px-2">
          <button
            onClick={loginHandler}
            className="px-5 py-2 rounded-md bg-green-500 hover:bg-green-600 duration-300 text-white"
          >
            ورود
          </button>
        </div>
        <div className="px-2">
          <button onClick={()=> setForgotPassword(true)} className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-300 text-white">
            فراموشی رمز عبور
          </button>
        </div>
      </div>
      <div className="text-start px-12">
        <button
          onClick={() => {
            route.replace('/register');
          }}
          className="bg-slate-700 px-5 py-2 rounded-md text-white mt-5 duration-300 hover:bg-slate-800"
        >
          ساخت حساب جدید
        </button>
      </div>
    </>
  );
}
