import React, { useContext } from 'react';
import SimpleBackdrop from '../backdrop';
import Swal from 'sweetalert2';
import { Account } from '../../pages/_app';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import { useRouter } from 'next/router';

export default function BoxSelectDate({ dates, isBackdrop, dateReserved, setIsBackdrop, doctor, accountUpdate , setPageState}) {
  const account = useContext(Account);
  const route = useRouter();
  const setTimeHandler = (e) => {
    Swal.fire({
      title: `شما تاریخ${dateReserved} و زمان ${e.fromTime} تا ${e.toTime} را برای ${doctor.firstName} ${doctor.lastName} انتخاب کردین`,
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'مرحله قبل',
      confirmButtonText: 'ثبت نهایی',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsBackdrop(true);
        const reserveData = {
          patientUserId: accountUpdate? accountUpdate.userId : account.userId,
          reservationTimeId: e.reservationTimeId,
          description: e.description,
        };
        axios
          .post(mainDomain + '/api/Reservation/Add', reserveData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setIsBackdrop(false);
            Swal.fire({
              text: 'درخواست شما با موفقیت ثبت شد',
              icon: 'success',
            });
            if (!accountUpdate) {
              route.replace('/dashboard/viewReservation');
              
            }else{
              setPageState(0)
            }
          })
          .catch((err) => {
            setIsBackdrop(false);
            Swal.fire({
              text: err.response.data,
              icon: 'error',
            });
          });
      }
    });
  };
  return (
    <>
      <div
        style={{ backgroundColor: isBackdrop ? '#0001' : 'transparent' }}
        className="h-[80vh] border p-2 rounded-md overflow-auto flex flex-wrap justify-center"
      >
        {!isBackdrop && (
          <div>
            <h3>{dates.length !== 0 ? 'لطفا زمان مورد نظر خود را ثبت کنید' : 'لطفا تاریخ ورود خود را وارد کنید'}</h3>
            <div className=" flex flex-wrap">
              {dates.map((date) => (
                <div key={date.reservationTimeId} className="p-3">
                  <button
                    style={{ backgroundColor: date.isActive ? 'rgb(59 130 246)' : 'rgb(203 213 225)' }}
                    disabled={!date.isActive}
                    className="p-3 bg-slate-300 rounded-md duration-300  text-white"
                    onClick={() => {
                      setTimeHandler(date);
                    }}
                    value={date.fromTime}
                  >
                    {date.fromTime} - {date.toTime}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {isBackdrop && (
          <div className="flex flex-wrap justify-center items-center">
            <SimpleBackdrop />
          </div>
        )}
      </div>
    </>
  );
}
