import React, { useContext , useState } from 'react';

import axios from 'axios';
import InputNameUpdateProfile from './inputNameUpdateProfile';
import InputLastNameProfileUpdate from './inputLastNameProfileUpdate';
import InputFatherNameUpdateProfile from './inputFatherNameUpdateProfile';
import SelectGenderUpdateProfile from './selectGenderUpdateProfile';
import DatePickerUpdateProfile from './datePickerUpdateProfile';
import InputTelUpdateProfile from './inputTelUpdateProfile';
import SelectCityUpdateProfile from './selectCityUpdateProfile';
import TextareaAddressUpdateProfile from './textareaAddressUpdateProfile';
import { Account, Change } from '../../pages/_app';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function FormUpdateProfile() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  // const route = useRouter()
  let token = localStorage.getItem('token')
  const account = useContext(Account);
  const setChange = useContext(Change)
  const [name, setName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);
  const [fatherName, setFatherName] = useState(account.fatherName);
  const [gender, setGender] = useState(account.gender);
  const [date, setDate] = useState(account.dateOfBirthFa);
  const [tel, setTel] = useState(account.tel);
  const [province, setProvince] = useState(account.province);
  const [city, setCity] = useState(account.city);
  const [address, setAddress] = useState(account.address);
 const dataProfile = {
       userId: localStorage.getItem('userId'),
       firstName: name,
       lastName,
       gender,
       abroad: account.abroad,
       fatherName,
       dateOfBirthFa: date,
       tel,
       province,
       city,
       address,
     };
  const updateProfileHandler = () => {
    if (name.length > 2 && lastName.length > 2 && fatherName.length > 2 && date && province && city && address) {
      axios
        .post(mainDomain+'/api/Patient/Update', dataProfile ,{
          headers: {
            Authorization: 'Bearer ' + token,
          }
        } )
        .then((response) => {
          if (response.status === 200) {
           
            Toast.fire({
              icon: 'success',
              text: 'اطلاعات با موفقیت ذخیره شد',
            });
            setChange((e)=> !e)
            // setTimeout(() => {
            //   route.reload('/dashboard')
            // }, 1000);
          }
        })
        .catch((error) => {
          Toast.fire({
            icon: 'error',
            text: error.response.data,
          });
        });
    }else if (name.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
      });
    }else if (lastName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
      });
    }else if (fatherName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام پدر را به درستی وارد کنید (نام پدر باید بزرگتر از 2 کاراکتر باشد)',
      });
    }else if (!date) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا تاریخ تولد خود را وارد کنید',
      });
    }else if (!province || !city) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا استان و شهر محل سکونت خود را وارد کنید',
      });
    }else if (!address) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا آدرس محل سکونت خود را وارد کنید',
      });
    }
  };
  return (
    <>
      <div className="lg:w-1/2 w-full p-4">
        <div className="border rounded-lg pb-5">
          <div className="flex">
            <InputNameUpdateProfile name={name} setName={setName} />
            <InputLastNameProfileUpdate lastName={lastName} setLastName={setLastName} />
          </div>
          <div className="flex">
            <InputFatherNameUpdateProfile fatherName={fatherName} setFatherName={setFatherName} />
            <SelectGenderUpdateProfile setGender={setGender} gender={gender} />
          </div>
          <div className="flex">
            <DatePickerUpdateProfile date={date} setDate={setDate} />
            <InputTelUpdateProfile setTel={setTel} tel={tel}/>
          </div>
          <SelectCityUpdateProfile province={province} setProvince={setProvince} setCity={setCity} city={city}/>
          <TextareaAddressUpdateProfile setAddress={setAddress} address={address}/>
          <div className="text-start mt-4 px-5">
            <button
              onClick={updateProfileHandler}
              className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white"
            >
              ذخیره تغییرات
              
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
