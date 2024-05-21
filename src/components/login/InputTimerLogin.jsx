import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function InputTimerLogin({ mobileNumber}) {
    const [timeResendCode, setTimeResendCode] = useState(120);
    const [showBtnSendCode, setShowBtnSendCode] = useState(false);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    useEffect(() => {
        setTimeout(() => {
          setTimeResendCode(timeResendCode - 1);
          if (timeResendCode < 1) {
            setTimeResendCode(0);
            setShowBtnSendCode(true);
          }
        }, 1000);
      }, [timeResendCode]);
      const resendCodeHandler = () => {
          const mobileNumberData = new FormData()
          mobileNumberData.append("mobileNumber", mobileNumber);
        setTimeResendCode(120)
        setShowBtnSendCode(false)
        // setIsLoading(true)
        axios
          .post("https://cis.aitest.ir/api/Authenticate/SendOtp", mobileNumberData)
          .then( () => {
            // setIsLoading(false)
            Toast.fire({
              icon: "success",
              text: "کد شش رقمی ارسال شد",
            });
          })
          .catch( (error) => {
            // setIsLoading(false)
            Toast.fire({
              icon: "error",
              text: error.response.data,
            });
          });
      };
  return (
    <>
    <div className="px-2">
                {!showBtnSendCode && (
                  <button
                  type='button'
                    disabled
                    className="bg-teal-500 text-[#fff8] px-5 py-2 rounded-md cursor-not-allowed w-56"
                  >
                    تا ارسال مجدد: {timeResendCode} ثانیه
                  </button>
                //    <Button
                //    disabled
                //    size="medium"
                   
                //    sx={{
                //      py: 1,
                //      fontSize: 16,
                //      cursor: 'not-allowed',
                //      backgroundColor: 'rgb(20 184 166)',
                //      '&:hover': {
                //        backgroundColor: 'rgb(13 148 136)',
                //      },
                //    }}
                //    onClick={resendCodeHandler}
                //    className="rounded-md  text-white mt-5 duration-300 "
                //    variant="contained"
                //  >
                //   تا ارسال مجدد: {timeResendCode} ثانیه
                //  </Button>
                )}
                {showBtnSendCode && (
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
                   onClick={resendCodeHandler}
                   className="rounded-md  text-white mt-5 duration-300"
                   variant="contained"
                 >
                   ارسال مجدد کد
                 </Button>
                  // <button
                  // type='button'
                  //   onClick={resendCodeHandler}
                  //   className="bg-blue-500 text-white px-5 py-2 rounded-md"
                  // >
                  //   
                  // </button>
                )}
              </div>
    </>
  )
}
