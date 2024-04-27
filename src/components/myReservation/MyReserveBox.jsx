import React, { useContext, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Change } from '../../pages/_app';
import SimpleBackdrop from '../backdrop';

export default function MyReserveBox({ list, doctor }) {
  const [isBackDrop, setIsBackDrop] = useState(false);
  const setChange = useContext(Change);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const deleteReservationHandler = () => {
    const reservationIdData = new FormData();
    reservationIdData.append('reservationId', list.reservationId);
    Swal.fire({
      title: 'حذف نوبت',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'مرحله قبل',
      confirmButtonText: 'حذف نوبت',
    }).then((result) => {
      setIsBackDrop(true);
      if (result.isConfirmed) {
        axios
          .post(mainDomain + '/api/Reservation/Delete', reservationIdData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setIsBackDrop(false);
            setChange((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'نوبت شما با موفقیت حذف شد',
            });
          })
          .catch((err) => {
            setIsBackDrop(false);
            Toast.fire({
              icon: 'success',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      {isBackDrop && <SimpleBackdrop />}
      <div className="flex items-center">
        <div className="w-1/6 p-3">
          <div className="w-20 h-20 border rounded-full cursor-pointer">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-2/3 text-start">
          <p className="font-nastaligh text-5xl">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold">{doctor?.specialization}</p>
        </div>
        <div className="w-1/6">
          <button
            onClick={deleteReservationHandler}
            className="px-5 py-2 bg-red-400 rounded-lg duration-300 hover:bg-red-600 text-white font-semibold"
          >
            حذف نوبت
          </button>
        </div>
      </div>
      <div className="px-10 mt-6">
        <div className="flex items-center text-xl mt-2">
          <p className="px-2">تاریخ:</p>
          <p className="px-2">{list.reservationTimeDateFA}</p>
        </div>
        <div className="flex items-center mt-5 text-xl">
          <p className="px-2">زمان:</p>
          <p className="px-2">
            {list.reservationTimeFromTime} الی {list.reservationTimeToTime}
          </p>
        </div>
      </div>
    </>
  );
}
