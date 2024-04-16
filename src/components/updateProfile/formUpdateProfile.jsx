import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import InputNameUpdateProfile from './inputNameUpdateProfile';
import InputLastNameProfileUpdate from './inputLastNameProfileUpdate';
import InputFatherNameUpdateProfile from './inputFatherNameUpdateProfile';
import SelectGenderUpdateProfile from './selectGenderUpdateProfile';
import DatePickerUpdateProfile from './datePickerUpdateProfile';
import InputTelUpdateProfile from './inputTelUpdateProfile';
import SelectCityUpdateProfile from './selectCityUpdateProfile';
import TextareaAddressUpdateProfile from './textareaAddressUpdateProfile';
import { Account } from '../../pages/_app';
import Swal from 'sweetalert2';

export default function FormUpdateProfile() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  const account = useContext(Account);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('m');
  const [date, setDate] = useState();
  const [tel, setTel] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  //   console.log(localStorage.getItem("userId"));
  const updateProfileHandler = () => {
    const data = {
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
    axios
      .post('https://cis.aitest.ir/api/PatientHistory/Update', data)
      .then((response) => {
        if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            text: 'اطلاعات با موفقیت ذخیره شد',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: 'error',
          text: 'err',
        });
      });
  };
  return (
    <>
      <div className="lg:w-1/2 w-full p-4">
        <div className="border rounded-lg pb-5">
          <div className="flex">
            <InputNameUpdateProfile setName={setName} />
            <InputLastNameProfileUpdate setLastName={setLastName} />
          </div>
          <div className="flex">
            <InputFatherNameUpdateProfile setFatherName={setFatherName} />
            <SelectGenderUpdateProfile setGender={setGender} gender={gender} />
          </div>
          <div className="flex">
            <DatePickerUpdateProfile date={date} setDate={setDate} />
            <InputTelUpdateProfile setTel={setTel} />
          </div>
          <SelectCityUpdateProfile province={province} setProvince={setProvince} setCity={setCity} />
          <TextareaAddressUpdateProfile setAddress={setAddress} />
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
