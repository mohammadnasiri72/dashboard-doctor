import React, { useState } from 'react';
import InputEmailLogin from './inputEmailLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function NationalIdLoginPageTwo({ setForgotPassword, setIsLoading }) {
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const [email, setEmail] = useState('');

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const emailData = new FormData();
  emailData.append('email', email);
  const resetPasswordHandler = () => {
    if (email.match(paternEmail)) {
      setIsLoading(true);
      axios
        .post(mainDomain + '/api/Authenticate/ResetPassword', emailData)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            setForgotPassword(false);
            Toast.fire({
              icon: 'success',
              text: 'رمز عبور جدید به ایمیل شما ارسال شد',
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'success',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    } else {
      Toast.fire({
        icon: 'success',
        text: 'لطفا ایمیل خود را به درستی وارد کنید',
      });
    }
  };

  return (
    <>
      <div>
        <div className="text-start">
          <button
            onClick={() => setForgotPassword(false)}
            className="text-white bg-blue-500 px-5 py-2 rounded-lg duration-300 hover:bg-blue-600"
          >
            مرحله قبل
          </button>
        </div>
        <h3 className="mt-2 text-white">لطفا ایمیل خود را جهت بازیابی رمز عبور وارد کنید</h3>
      </div>
      <InputEmailLogin setEmail={setEmail} email={email} />
      <div className="px-10 mt-5 text-start">
        <button
          onClick={resetPasswordHandler}
          className="text-white bg-green-500 px-5 py-2 rounded-lg duration-300 hover:bg-green-600"
        >
          بازگردانی رمز عبور
        </button>
      </div>
    </>
  );
}
