import React from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useState, useRef } from 'react';
import { TextField } from '@mui/material';

export default function BoxChangDate({valReservPatient , reservUser}) {
  const [date, setDate] = useState('');
  const [valTimeStart , setValTimeStart] = useState('')
  const datePic = useRef();

  const setDateHandler = () => {
    setDate(datePic.current?.children[0]?.value);
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        {
        reservUser.map((e)=>(
            
      <div key={e.reservationId} style={{display:valReservPatient.length===0?'none':'flex'}} className="pr-4 mt-3">
        <div className="">
          <DatePicker
            ref={datePic}
            inputClass="outline-none border rounded-lg w-full h-14 px-3"
            locale={persian_fa}
            calendar={persian}
            value={e.reservationTimeDateFA}
            onChange={setDateHandler}
            placeholder="تاریخ رزرو"
          />
        </div>
        <div className="w-32 pr-4">
          <TextField
            //   onChange={(e) => setDescRelative(e.target.value)}
            className="w-full"
            id="outlined-multiline-flexible"
            label="ساعت شروع"
            multiline
              value={e.reservationTimeFromTime}
          />
        </div>
        <div className="w-32 px-2">
          <TextField
            //   onChange={(e) => setDescRelative(e.target.value)}
            className="w-full"
            id="outlined-multiline-flexible"
            label="ساعت پایان"
            multiline
              value={e.reservationTimeToTime}
          />
        </div>
        <div className="w-24 px-2">
          <TextField
            //   onChange={(e) => setDescRelative(e.target.value)}
            type="number"
            className="w-full"
            id="outlined-multiline-flexible"
            label="نوبت"
            multiline
              value={1}
          />
        </div>
      </div>

        ))
        }
      </div>
    </>
  );
}
