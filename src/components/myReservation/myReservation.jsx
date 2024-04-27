import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { Account } from '../../pages/_app';
import MyReserveBox from './MyReserveBox';
import MyVisitedBox from './MyVisitedBox';

export default function MyReservation() {
  const account = useContext(Account);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [reserveList, setReserveList] = useState([]);
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Reservation/GetList', {
        params: {
          patientUserId: account.patientId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setReserveList(res.data);
        setDoctor(doctors.find((e) => e.doctorId === res.data[0]?.reservationTimeDoctorId));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [doctors, account]);
  return (
    <>
      <div className="text-start">
        <h3 className="text-3xl font-bold">نوبت های من</h3>
      </div>
      {reserveList.filter((e) => e.status === 'Active').length === 0 && (
        <div className="w-5/6 mx-auto border rounded-lg mt-5 pt-2 pb-6">
          <p className="mt-3">نوبت های شما خالی است</p>
        </div>
      )}
      {reserveList
        .filter((e) => e.status === 'Active')
        .map((list) => (
          <div key={list.reservationId} className="w-5/6 mx-auto border rounded-lg mt-5 pt-2 pb-6">
            <MyReserveBox list={list} doctor={doctor} />
          </div>
        ))}
      {reserveList.filter((e) => e.status !== 'Active').length > 0 && (
        <p className="text-xl text-start font-semibold mt-6">نوبت های ویزیت شده</p>
      )}
      <div className="flex w-5/6 mx-auto">
        {reserveList
          .filter((e) => e.status !== 'Active')
          .map((list) => (
            <div key={list.reservationId} className="lg:w-1/3 sm:w-1/2 w-full p-2">
              <div className="border rounded-lg ">
                <MyVisitedBox list={list} doctor={doctor} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
