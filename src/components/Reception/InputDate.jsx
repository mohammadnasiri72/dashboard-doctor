import React, { useState } from 'react'
import { useRef } from 'react';
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export default function InputDate() {
    const [date , setDate] = useState(new Date)
    const datePic = useRef();
 
  const setDateHandler = ()=>{
    setDate(datePic.current?.children[0]?.value)
  }
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
        //   value={date}
        //   onChange={setDateHandler}
          placeholder="تاریخ پذیرش"
        />
      </div>
    </>
  )
}
