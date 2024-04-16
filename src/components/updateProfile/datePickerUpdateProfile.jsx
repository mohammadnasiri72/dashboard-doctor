import React from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

export default function DatePickerUpdateProfile({date , setDate}) {
  return (
    <>
      <div className="mt-6 px-4">
        <DatePicker
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persian_fa}
          calendar={persian}
          value={date}
          onChange={(e) => {
            setDate(new Date(e));
          }}
          placeholder="تاریخ تولد خود را وارد کنید"
        />
      </div>
    </>
  );
}
