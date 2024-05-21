import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import InputMobilEmail from './inputMobil_Email';
import InputNationalId from './inputNationalId';
import SelectAbroad from './selectAbroad';
import InputDelete from './inputDelete';
import { useRouter } from 'next/router';
import { mainDomain } from '../../utils/mainDomain';
import { Button } from '@mui/material';

export default function MainRegisterPage({ setIsRegister, setRegisterModel, setIsLoading }) {
  const [abroad, setAbroad] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const paternNationalId = /^[0-9]{10}$/;
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const route = useRouter();

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  // go to logine
  const goToLogin = () => {
    route.replace('/login');
  };

  const submitForm = () => {
    const registerModel = {
      nationalId,
      abroad,
      mobile,
      email,
    };
    if (nationalId.match(paternNationalId) && (mobile.match(paternMobile) || email.match(paternEmail))) {
      setIsLoading(true);
      setRegisterModel(registerModel);
      axios
        .post(mainDomain + '/api/Patient/PreRegister', registerModel)
        .then(() => {
          setIsLoading(false);
          setIsRegister(true);
          Toast.fire({
            icon: 'success',
            text: 'با موفقیت وارد شدید لطفا اطلاعات خود را وارد کنید',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: err.response ? err.response.data : 'خطای شبکه',
          });
        });
    }
    if (!abroad && !mobile.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: ' شماره موبایل نا معتبر است',
      });
    }
    if (abroad && !email.match(paternEmail)) {
      Toast.fire({
        icon: 'error',
        text: ' ایمیل نا معتبر است',
      });
    }
    if (!nationalId.match(paternNationalId)) {
      Toast.fire({
        icon: 'error',
        title: 'کد ملی نامعتبر است',
      });
    }
  };
  return (
    <>
      <div className="flex justify-center px-1 items-center min-h-screen">
        <div className="lg:w-1/2 w-full p-3 shadow-lg rounded-lg min-h-screen">
          <div className="flex justify-center">
            <img src={'/favicon/favicon.ico'} alt="" />
          </div>
          <h1 className="text-3xl mt-4">ثبت نام بیمار</h1>
          <SelectAbroad abroad={abroad} setAbroad={setAbroad} setMobile={setMobile} setEmail={setEmail} />
          <InputNationalId nationalId={nationalId} setNationalId={setNationalId} />
          <InputMobilEmail abroad={abroad} email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile} />
          <div className="flex justify-center">
            <div className="px-3 mt-10 lg:w-2/3 w-full mx-auto ">
              <Button
              sx={{py: 1 , fontSize:20 , backgroundColor:'rgb(16 185 129)' , "&:hover":{
                backgroundColor:'rgb(5 150 105)'
              }}}
                className="bg-blue-400 rounded-md text-white duration-300 w-full"
                onClick={submitForm}
                variant="contained"
              >
                مرحله بعد
              </Button>
            </div>
          </div>
            <div className="px-3 mt-5 text-start lg:w-2/3 w-full mx-auto">
              <Button
              size='medium'
                className="px-5 py-2 rounded-md text-white duration-300"
                onClick={goToLogin}
                sx={{
                  py: 1,
                  fontSize: 16,
                  backgroundColor: 'rgb(20 184 166)',
                  '&:hover': {
                    backgroundColor: 'rgb(13 148 136)',
                  },
                }}
               
                variant="contained"
              >
                قبلا حساب ساخته ام
              </Button>
            </div>
        </div>
        <div className="lg:w-1/2 w-0 h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply" />
      </div>
      <InputDelete />
    </>
  );
}
