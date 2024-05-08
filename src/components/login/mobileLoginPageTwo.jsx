import React, { useContext, useState } from 'react';
import InputFillCode from '../register/fillCode';
import InputTimerLogin from './InputTimerLogin';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function MobileLoginPageTwo({ setIsValiedMobile, mobileNumber, setMobileNumber, setIsLoading }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const [code, setCode] = useState('');
  const route = useRouter();
  const submitHandler = () => {
    const data = {
      mobile: mobileNumber,
      code,
    };
    if (code.length === 6) {
      setIsLoading(true);
      axios
        .post(mainDomain + '/api/Authenticate/LoginOtp', data)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('roles', res.data.roles);
          localStorage.setItem('expiration', res.data.expiration);
          Toast.fire({
            icon: 'success',
            text: 'با موفقیت وارد شدید',
          });
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
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد ارسال شده را به درستی وارد کنید',
      });
    }
  };
  return (
    <>
      <h2 className="text-3xl font-semibold text-white">تایید کد ارسالی</h2>
      <div className="text-start">
        <button onClick={() => setIsValiedMobile(false)} className="text-white bg-blue-500 px-5 py-2 rounded-lg">
          مرحله قبل
        </button>
      </div>
      <InputFillCode setCode={setCode} />
      <div className="flex justify-center items-stretch mt-4">
        <div className="px-2 bg-green-500 rounded-md flex items-center">
          <button type="submit" onClick={submitHandler} className=" text-white px-5 py-2 ">
            تایید
          </button>
        </div>
        <InputTimerLogin mobileNumber={mobileNumber} />
      </div>
    </>
  );
}
