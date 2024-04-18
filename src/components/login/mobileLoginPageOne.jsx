import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import SelectAbroadLogin from './SelectAbroadLogin';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function MobileLoginPageOne({
  mobileNumber,
  setMobileNumber,
  setIsValiedMobile,
  abroad,
  setAbroad,
  setIsLoading,
}) {
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const route = useRouter()
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  let colorMobile;
  if (mobileNumber.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileNumber.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }
  const mobileNumberData = new FormData();
  mobileNumberData.append('mobileNumber', mobileNumber);
  const sendData = () => {
    if (mobileNumber.match(paternMobile)) {
      setIsLoading(true);
      axios
        .post('https://cis.aitest.ir/api/Authenticate/SendOtp', mobileNumberData)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            setIsValiedMobile(true);
            Toast.fire({
              icon: 'success',
              text: 'لطفا کد 6 رقمی ارسال شده را وارد کنید',
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response.data,
          });
        });
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل خود را به درستی وارد کنید',
      });
    }
  };
  return (
    <>
      <h2 className="text-3xl font-semibold text-white">صفحه ورود</h2>
      <SelectAbroadLogin abroad={abroad} setAbroad={setAbroad} />
      <div className="px-10 mt-5">
        <TextField
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          className="w-full text-white"
          id="outlined-multiline-flexible"
          label={'شماره موبایل'}
          multiline
          color={colorMobile}
          maxRows={4}
          InputProps={{className:'textfield-style'}}
        />
        <div>
          <div className="flex justify-center items-center">
            <div className="px-3">
              <button
                onClick={sendData}
                className="bg-green-500 px-5 py-2 rounded-md text-white mt-5 duration-300 hover:bg-green-700"
              >
                مرحله بعد
              </button>
            </div>
            <div className="px-3">
              <button onClick={()=>{
                route.replace('/register')
              }}
                className="bg-slate-700 px-5 py-2 rounded-md text-white mt-5 duration-300 hover:bg-slate-800"
              >
                ساخت حساب جدید
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
