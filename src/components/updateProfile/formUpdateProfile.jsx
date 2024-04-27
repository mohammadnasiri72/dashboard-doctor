import React, { useContext, useState } from 'react';

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
import { FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';

export default function FormUpdateProfile({ accountUpdate, setEditState }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  // const route = useRouter()
  let token = localStorage.getItem('token');
  const account = useContext(Account);
  const setChange = useContext(Change);
  const [name, setName] = useState(accountUpdate ? accountUpdate.firstName : account.firstName);
  const [lastName, setLastName] = useState(accountUpdate ? accountUpdate.lastName : account.lastName);
  const [fatherName, setFatherName] = useState(accountUpdate ? accountUpdate.fatherName : account.fatherName);
  const [gender, setGender] = useState(accountUpdate ? accountUpdate.gender : account.gender);
  const [date, setDate] = useState(accountUpdate ? accountUpdate.dateOfBirthFa : account.dateOfBirthFa);
  const [tel, setTel] = useState(accountUpdate ? accountUpdate.tel : account.tel);
  const [province, setProvince] = useState(accountUpdate ? accountUpdate.province : account.province);
  const [city, setCity] = useState(accountUpdate ? accountUpdate.city : account.city);
  const [address, setAddress] = useState(accountUpdate ? accountUpdate.address : account.address);
  const [isLoading, setIsLoading] = useState(false);
  let data = {};
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
  const dataProfileUpdate = {
    userId: accountUpdate?.userId,
    firstName: name,
    lastName,
    gender,
    abroad: accountUpdate?.abroad,
    fatherName,
    dateOfBirthFa: date,
    tel,
    province,
    city,
    address,
  };
  if (accountUpdate) {
    data = dataProfileUpdate;
  } else {
    data = dataProfile;
  }
  const role = localStorage.getItem('roles');
  const updateProfileHandler = () => {
    if (name.length > 2 && lastName.length > 2 && fatherName.length > 2 && date && province && city && address) {
      setIsLoading(true);
      axios
        .post(mainDomain + '/api/Patient/Update', data, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'success',
            text: 'اطلاعات با موفقیت ذخیره شد',
          });
          setChange((e) => !e);
          setEditState(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Toast.fire({
            icon: 'error',
            text: error.response ? error.response.data : 'خطای شبکه',
          });
        });
    } else if (name.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خود را به درستی وارد کنید (نام باید بزرگتر از 2 کاراکتر باشد)',
      });
    } else if (lastName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام خانوادگی خود را به درستی وارد کنید (نام خانوادگی باید بزرگتر از 2 کاراکتر باشد)',
      });
    } else if (fatherName.length <= 2) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نام پدر را به درستی وارد کنید (نام پدر باید بزرگتر از 2 کاراکتر باشد)',
      });
    } else if (!date) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا تاریخ تولد خود را وارد کنید',
      });
    } else if (!province || !city) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا استان و شهر محل سکونت خود را وارد کنید',
      });
    } else if (!address) {
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
            <InputTelUpdateProfile setTel={setTel} tel={tel} />
          </div>
          <SelectCityUpdateProfile province={province} setProvince={setProvince} setCity={setCity} city={city} />
          <TextareaAddressUpdateProfile setAddress={setAddress} address={address} />
          <div className="flex justify-start mt-4 px-5">
            <button
              onClick={updateProfileHandler}
              className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white"
            >
              ذخیره تغییرات
            </button>
            {accountUpdate && (
              <div className="px-3">
                <button
                  onClick={() => setEditState(false)}
                  className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                >
                  <FaArrowRight />
                  <span className="px-2">برگشت به صفخه قبل</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
