import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export default function InputDate({ setFromPersianDate, setToPersianDate }) {
  const [date, setDate] = useState(new Date());
  const datePic = useRef();
  // const datee = new DateObject({ calendar: persian, locale: persian_fa })
  // console.log(datee)
  useEffect(()=>{
    setFromPersianDate(date[0].format());
    setToPersianDate(date[1]?.format());

  },[])
  // console.log(date[0].format());
  // console.log(date[1]?.format());

  return (
    <>
      <div className="px-4">
        <DatePicker
          range
          dateSeparator=" تا "
          ref={datePic}
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persian_fa}
          calendar={persian}
          value={date}
          onChange={(event) => {
            setDate(event);
            
          }}
          placeholder="تاریخ پذیرش"
        />
      </div>
    </>
  );
}
