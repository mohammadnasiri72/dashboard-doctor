import { Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import InputFillCode from '../register/fillCode';
import InputTimerLogin from './InputTimerLogin';



export default function MobileLoginPageTwo({ setIsValiedMobile, mobileNumber, setMobileNumber, setIsLoading }) {
  const btnSubmit = useRef(null)
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
        <Tooltip title="مرحله قبل">
          <IconButton onClick={() => setIsValiedMobile(false)}>
            <IoMdArrowRoundForward className="text-3xl" />
          </IconButton>
        </Tooltip>
      </div>
      <InputFillCode setCode={setCode} btnSubmit={btnSubmit}/>

      <div className="lg:w-2/3 w-full mx-auto px-5 mt-4">
        <Button
        ref={btnSubmit}
          sx={{
            py: 1,
            fontSize: 20,
            backgroundColor: 'rgb(16 185 129)',
            '&:hover': {
              backgroundColor: 'rgb(5 150 105)',
            },
          }}
          onClick={submitHandler}
          className="rounded-md w-full text-white mt-5 duration-300"
          variant="contained"
        >
          تایید
        </Button>
      </div>
      <div className="lg:w-2/3 w-full mx-auto px-5 mt-4 text-start">
        <InputTimerLogin mobileNumber={mobileNumber} />
      </div>
    </>
  );
}
