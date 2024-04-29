import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import InputFullName from './InputFullName';
import InputRelative from './InputRelative';
import InputMobileRelative from './InputMobileRelative';
import InputAddress from './InputAddress';
import InputDesc from './InputDesc';
import { useState } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import Swal from 'sweetalert2';
import SimpleBackdrop from '../backdrop';

export default function AddRelativePatient({ isOpenAddRelative, setIsOpenAddRelative, patient }) {
  const [fullName, setFullName] = useState('');
  const [relative, setRelative] = useState('');
  const [mobileRelative, setMobileRelative] = useState('');
  const [addressRelative, setAddressRelative] = useState('');
  const [descRelative, setDescRelative] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const setNewRelativeHandler = () => {
    if (fullName.length > 0 && relative.length > 0 && mobileRelative.match(paternMobile)) {
      setIsLoading(true);
      const data = {
        patientId: patient.patientId,
        fullName,
        relative,
        mobileNumber: mobileRelative,
        address: addressRelative,
        description: descRelative,
      };
      axios
        .post(mainDomain + '/api/PatientRelative/Add', data, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setIsOpenAddRelative(false);
          setIsLoading(false);
          setFullName('');
          setRelative('');
          setMobileRelative('');
          setAddressRelative('');
          setDescRelative('');
          Toast.fire({
            icon: 'success',
            text: 'بیمار با موفقیت ثبت شد',
          });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }else if (fullName.length === 0) {
        Toast.fire({
            icon: 'error',
            text: 'لطفا نام همراه را وارد کنید',
          });
    }else if (relative.length === 0) {
        Toast.fire({
            icon: 'error',
            text: 'لطفا نسبت همراه با بیمار را وارد کنید',
          });
    }else if (!mobileRelative.match(paternMobile)) {
        Toast.fire({
            icon: 'error',
            text: 'لطفا شماره موبایل همراه را بصورت صحیح وارد کنید',
          });
    }
  };
  return (
    <>
      <div
        style={{ zIndex: '1301', transform: isOpenAddRelative ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className="relative">
          <button
            onClick={() => {
              setIsOpenAddRelative(false);
            }}
            className="bg-slate-200 rounded-full p-3 duration-300 hover:bg-slate-300 absolute right-0 top-0"
          >
            <FaChevronRight
              style={{ transform: isOpenAddRelative ? 'rotate(0deg)' : 'rotate(180deg)' }}
              className="text-xl text-slate-700"
            />
          </button>
          <div className="text-center py-2 text-2xl font-semibold">ثبت همراه جدید</div>
        </div>
        <InputFullName fullName={fullName} setFullName={setFullName} />
        <InputRelative relative={relative} setRelative={setRelative} />
        <InputMobileRelative mobileRelative={mobileRelative} setMobileRelative={setMobileRelative} />
        <InputAddress addressRelative={addressRelative} setAddressRelative={setAddressRelative} />
        <InputDesc descRelative={descRelative} setDescRelative={setDescRelative} />
        <div className="mt-6 text-start">
          <button
            onClick={setNewRelativeHandler}
            className="text-white bg-green-500 rounded-md duration-300 hover:bg-green-600 px-5 py-2"
          >
            ثبت همراه
          </button>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
