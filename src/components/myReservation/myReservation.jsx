import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { Account } from '../../pages/_app';

export default function MyReservation() {
  const account = useContext(Account);
  const [doctors , setDoctors] = useState([])
  const [doctor , setDoctor] = useState('')
  console.log(doctor);
  useEffect(() => {
    axios
      .get(mainDomain+'/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
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
        setDoctor(doctors.find((e)=> e.doctorId === res.data[0].reservationTimeDoctorId))
      })
      .catch((err) => {});

  }, [doctors]);
  return (
    <>
      <div className="w-5/6 mx-auto border rounded-lg h-60 mt-5">
        <div className="flex items-center">
          <div className="w-1/6 p-3">
            <div className="w-20 h-20 border rounded-full cursor-pointer">
              <img className="w-full h-full rounded-full" src={'/images/bg.jpeg'} alt="" />
            </div>
          </div>
          <div className="w-2/3 text-start">{doctor?.firstName} {doctor?.lastName} {doctor?.specialization}</div>
          <div className="w-1/6">3</div>
        </div>
      </div>
    </>
  );
}
