import axios from 'axios';
import { useState } from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Swal from 'sweetalert2';
import InputFillCode from './fillCode';
import InputLastName from './inputLName';
import InputName from './inputName';
import InputTimer from './inputTimer';
import SelectGender from './selectGender';
import InputPassword from './inputPassword';
import { useRouter } from 'next/router';
import { mainDomain } from '../../utils/mainDomain';

export default function SecoundRegisterPage({ registerModel, setIsRegister, setIsLoading }) {
  const [fristName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('m');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
 
  const route = useRouter()
  const paternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const submitHandler = (e) => {
    e.preventDefault()
    registerModel.fristName = fristName;
    registerModel.lastName = lastName;
    registerModel.gender = gender;
    registerModel.password = password;
    registerModel.code = code;
    if (
      fristName.length > 2 &&
      lastName.length > 2 &&
      gender.length !== 0 &&
      code.length === 6 &&
      (registerModel.abroad === false || password.length>6)
    ) {
      setIsLoading(true);
      axios
        .post(mainDomain+'/api/Patient/Register', registerModel)
        .then((response) => {
          localStorage.setItem("token" , response.data.token)
          localStorage.setItem("userId" , response.data.userId)
          localStorage.setItem("refreshToken" , response.data.refreshToken)
          localStorage.setItem("roles" , response.data.roles)
          localStorage.setItem("expiration" , response.data.expiration)
          // response.setHeader("Set-Cookie", serialize("token", fristName , {
          //   httpOnly:true,
          //   path:"/",
          //   maxAge:60*60*24
          // }))
          setIsLoading(false);
          Toast.fire({
            icon: 'success',
            text: 'ثبت نام شما با موفقیت انجام شد',
          });
          setTimeout(() => {
            route.replace('/dashboard')
          }, 1000);
        })
        .catch((error) => {
          document.cookie = `token=${fristName}`;
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: error.response.data,
          });
        });
    } else if (fristName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خود را به درستی وارد کنید(نام باید بیشتر از دو حرف باشد)',
      });
    } else if (lastName.length < 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خانوادگی خود را به درستی وارد کنید(نام خانوادگی باید بیشتر از دو حرف باشد)',
      });
    } else if (gender.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا جنسیت خود را به درستی وارد کنید(جنسیت نمیتواند خالی باشد)',
      });
    } else if (registerModel.abroad === true && password.length<=6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا پسورد خود را به درستی وارد کنید(پسورد باید بیشتر از 6 رقم باشد)',
      });
    }else if (code.length !== 6) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد ارسال شده را به درستی وارد کنید(کد ارسال شده باید 6 رقم باشد)',
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply">
        <div className="lg:w-1/3 sm:w-1/2 w-full bg-[#000d] p-3 shadow-lg rounded-lg min-h-[50vh]">
          <div className="text-start px-5">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className="bg-blue-500 px-5 py-2 text-white rounded-md flex items-center duration-300 hover:bg-blue-600"
            >
              {' '}
              <IoMdArrowRoundForward className="pt-2 text-3xl" />
              <span>مرحله قبل</span>
            </button>
          </div>
          <div className=" mt-5">
            <InputName fristName={fristName} setFristName={setFristName} />
            <InputLastName lastName={lastName} setLastName={setLastName} />
            <SelectGender gender={gender} setGender={setGender} />
            {registerModel.abroad && 
              <InputPassword setPassword={setPassword} password={password}/>
            }
            <InputFillCode setCode={setCode} />
            <div className="flex justify-center items-stretch mt-4">
              <div className="px-2 bg-green-500 rounded-md flex items-center">
                <button type="submit" onClick={submitHandler} className=" text-white px-5 py-2 ">
                  تایید
                </button>
              </div>
              <InputTimer registerModel={registerModel} setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
