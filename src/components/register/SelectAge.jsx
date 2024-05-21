import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

export default function SelectAge({setDateOfBirthFaPatient}) {
  const [valYear, setValYear] = useState('');
  const [mount, setMount] = useState('');
  const [numMount, setNumMount] = useState('');
  const [numYear, setNumYear] = useState('');
  const [valDay, setValDay] = useState('');

  useEffect(()=>{
    if (numMount && numYear && valDay) {
        setDateOfBirthFaPatient(numYear+'/'+numMount+'/'+valDay);
    }
  },[numYear , numMount , valDay])

  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);

  return (
    <>

      <div className='px-5'>
      <div className='border rounded-xl px-5 lg:w-2/3 w-full mx-auto text-start mt-4 py-2'>
        <h3 className="mb-2">تاریخ تولد :</h3>
        <div className=" flex justify-around">
          {/* select years */}
          <div>
            <DatePicker
              inputClass="outline-none border rounded-lg w-32 h-14 px-3"
              onlyYearPicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              placeholder="سال"
              value={valYear}
              onChange={(e) => {
                setValYear(e);
                setNumYear(converter(e.format()) * 1);
              }}
            />
          </div>
          {/* select mount */}
          <div>
            <DatePicker
              inputClass="outline-none border rounded-lg w-32 h-14 px-3"
              onlyMonthPicker
              format="MMMM"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              placeholder="ماه"
              hideYear
              value={mount}
              onChange={(e) => {
                setMount(e);
                setNumMount(converter(e.format('MM')) * 1);
              }}
            />
          </div>
          {/* select day */}
          <div>
            <FormControl className="w-32">
              <InputLabel id="demo-simple-select-label">روز</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  value={valDay}
                label="روز"
                  onChange={(e)=> setValDay(e.target.value)}
              >
                {new Array(numMount < 7 ? 31 : numMount < 12 ? 30 : 29).fill('').map((e, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
