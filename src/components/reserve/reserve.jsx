import React, { useEffect, useState } from 'react';
import InputExpertise from './InputExpertise';
import InputSelectDoctor from './InputSelectDoctor';
import axios from 'axios';
import BoxDateReserve from './BoxDateReserve';
import BoxSelectDate from './BoxSelectDate';
import { mainDomain } from '../../utils/mainDomain';

export default function Reserve() {
  const [expertises, setExpertises] = useState([]);
  const [expertise, setExpertise] = useState('همه');
  const [doctors, setDoctors] = useState([]);
  const [doctor , setDoctor] = useState([]);
  const [dates , setDates] = useState([]);
  const [isBackdrop , setIsBackdrop] = useState(false);
  const [dateReserved , setDateReserved] = useState('')
  useEffect(() => {
    axios
      .get(mainDomain+'/api/BasicInfo/Specialization/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setExpertises(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(mainDomain+'/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setDoctor(res.data[0].doctorId)
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-1/2 px-5">
          <InputExpertise expertises={expertises} expertise={expertise} setExpertise={setExpertise}/>
        </div>
        <div className="w-1/2 px-5">
          <InputSelectDoctor doctors={doctors} expertise={expertise} doctor={doctor} setDoctor={setDoctor}/>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-1/5 p-3'>
            <BoxDateReserve doctorId={doctor} setDates={setDates} setIsBackdrop={setIsBackdrop} setDateReserved={setDateReserved}/>
        </div>
        <div className='w-4/5 p-3'>
            <BoxSelectDate doctor={doctors.find((e)=>e.doctorId === doctor)} dates={dates} isBackdrop={isBackdrop} setIsBackdrop={setIsBackdrop} dateReserved={dateReserved}/>
        </div>
      </div>
    </>
  );
}
