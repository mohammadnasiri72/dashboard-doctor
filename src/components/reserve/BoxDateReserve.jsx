import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BoxDateReserve({ doctorId , setDates , setIsBackdrop , setDateReserved}) {
  const [dateFa, setDateFa] = useState([]);
 
  useEffect(() => {
    if (doctorId) {
      axios
        .get('https://cis.aitest.ir/api/ReservationTime/GetList', {
          params: {
            doctorId,
            dateFa: '',
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setDateFa(res.data);
        })
        .catch((err) => {
          //   console.log('err');
        });
    }
  }, [doctorId]);
  const selectDateHandler = (e)=>{
    setDateReserved(e.target.value)
    setIsBackdrop(true)
    axios
        .get('https://cis.aitest.ir/api/ReservationTime/GetList', {
          params: {
            doctorId,
            dateFa: e.target.value,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
            setIsBackdrop(false)
          setDates(res.data[0].reservationTimes)
        })
        .catch((err) => {
          //   console.log('err');
          setIsBackdrop(false)
        });
  }
  return (
    <>
      <div className="border p-2 rounded-md h-[80vh] overflow-auto">
        <h2>انتخاب تاریخ</h2>
        {dateFa.map((date) => (
          <button onClick={selectDateHandler} key={date.dateFa} value={date.dateFa} className="p-5 rounded-md bg-slate-200 hover:bg-slate-300 duration-300 mt-2">{date.dateFa}</button>
        ))}
      </div>
    </>
  );
}
