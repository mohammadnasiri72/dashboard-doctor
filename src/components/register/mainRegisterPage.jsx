import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import InputMobilEmail from './inputMobil_Email';
import InputNationalId from './inputNationalId';
import SelectAbroad from './selectAbroad';
import InputDelete from './inputDelete';
import { useRouter } from 'next/router';
import { mainDomain } from '../../utils/mainDomain';

export default function MainRegisterPage({ setIsRegister, setRegisterModel, setIsLoading }) {
  const [abroad, setAbroad] = useState(false);
  const [nationalId, setNationalId] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const paternNationalId = /^[0-9]{10}$/;
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  const route = useRouter();
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
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
        .then((res) => {
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
      <div className="flex justify-center items-center min-h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply">
        <div className="lg:w-1/3 sm:w-1/2 w-full bg-[#000d] p-3 shadow-lg rounded-lg min-h-[50vh]">
          <h1 className="text-3xl text-white">ثبت نام بیمار</h1>
          <SelectAbroad abroad={abroad} setAbroad={setAbroad} setMobile={setMobile} setEmail={setEmail} />
          <InputNationalId nationalId={nationalId} setNationalId={setNationalId} />
          <InputMobilEmail abroad={abroad} email={email} setEmail={setEmail} mobile={mobile} setMobile={setMobile} />
          <div className="flex justify-center">
            <div className="px-3">
              <button
                type="button"
                onClick={submitForm}
                className="bg-green-500 px-5 py-2 rounded-md text-white duration-300 hover:bg-green-600 mt-10"
              >
                مرحله بعد
              </button>
            </div>
            <div className="px-3">
              <button
                onClick={goToLogin}
                className="bg-blue-500 px-5 py-2 rounded-md text-white duration-300 hover:bg-blue-600 mt-10"
              >
                قبلا حساب ساخته ام
              </button>
            </div>
          </div>
        </div>
      </div>
      <InputDelete />
    </>
  );
}
