import React, { useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useState, useRef } from 'react';
import { TextField } from '@mui/material';

export default function BoxChangDate({
  valReservPatient,
  reservUser,
  userSelected,
  date,
  setDate,
  valTimeStart,
  setValTimeStart,
  valTimeEnd,
  setValTimeEnd,
  setTurn,
  turn,
}) {
  const datePic = useRef();
  useEffect(() => {
    reservUser
      .filter((ev) => ev.reservationTimeId === valReservPatient)
      .map((e) => {
        setDate(e.reservationTimeDateFA);
        setValTimeStart(e.reservationTimeFromTime);
        setValTimeEnd(e.reservationTimeToTime);
      });
    if (
      userSelected.length === 0 ||
      reservUser.filter((ev) => ev.reservationTimeId === valReservPatient).length === 0
    ) {
      setDate(new Date());
      setValTimeStart('');
      setValTimeEnd('');
    }
  }, [userSelected, valReservPatient]);

  const setDateHandler = () => {
    setDate(datePic.current?.children[0]?.value);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="pr-4 mt-3 flex">
          <div className="">
            <DatePicker
              ref={datePic}
              inputClass="outline-none border rounded-lg w-full h-14 px-3"
              locale={persian_fa}
              calendar={persian}
              value={date}
              onChange={setDateHandler}
              placeholder="تاریخ رزرو"
            />
          </div>
          <div className="w-32 pr-4">
            <TextField
              onChange={(e) => setValTimeStart(e.target.value)}
              className="w-full"
              id="outlined-multiline-flexible"
              label="ساعت شروع"
              multiline
              value={valTimeStart}
            />
          </div>
          <div className="w-32 px-2">
            <TextField
              onChange={(e) => setValTimeEnd(e.target.value)}
              className="w-full"
              id="outlined-multiline-flexible"
              label="ساعت پایان"
              multiline
              value={valTimeEnd}
            />
          </div>
          <div className="w-24 px-2">
            <TextField
              onChange={(e) => setTurn(e.target.value)}
              type="number"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نوبت"
              multiline
              value={turn}
            />
          </div>
        </div>
      </div>
    </>
  );
}
