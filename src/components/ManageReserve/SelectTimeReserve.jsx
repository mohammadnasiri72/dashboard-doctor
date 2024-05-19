import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import ModalSelectOneTime from './ModalSelectOneTime';
import ModalSelectTime from './ModalSelectTime';

export default function SelectTimeReserve({
  setIsLoading,
  valDoctor,
  setValDoctor,
  setYear,
  setMount,
  setNumberMoon,
  setFlag,
  doctors,
}) {
  const [valMoon, setValMoon] = useState(new Date());
  const [valYear, setValYear] = useState(new Date());

  const [day, setDay] = useState('همه');
  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          {/* select doctor */}
          <div className="flex items-center w-96">
            <div className="px-4 w-full" dir="rtl">
              <FormControl color="primary" className="w-full">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست پزشکان
                </InputLabel>
                <Select
                  onChange={(e) => setValDoctor(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست پزشکان"
                  color="primary"
                  value={valDoctor}
                >
                  {doctors.map((d) => (
                    <MenuItem key={d.doctorId} value={d.doctorId}>
                      {d.firstName} {d.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {/* select year */}
          <div>
            <DatePicker
              inputClass="outline-none border rounded-lg w-20 h-14 px-3"
              onlyYearPicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              placeholder="سال"
              value={valYear}
              onChange={(e) => {
                setValYear(e);
                setYear(converter(e.format('YYYY')) * 1);
              }}
            />
          </div>
          {/* select mount */}
          <div className="pr-2">
            <DatePicker
              inputClass="outline-none border rounded-lg w-28 h-14 px-3"
              onlyMonthPicker
              format="MMMM"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              placeholder="ماه"
              hideYear
              value={valMoon}
              onChange={(e) => {
                setValMoon(e);
                setMount(converter(e.format('MM')) * 1);
                setNumberMoon(converter(e.format('MM')) * 1);
              }}
            />
          </div>
        </div>
        <div className="flex pl-10">
          <div>
            <ModalSelectTime
              setIsLoading={setIsLoading}
              setFlag={setFlag}
              doctors={doctors}
              valDoctor={valDoctor}
              setValDoctor={setValDoctor}
              valMoon={valMoon}
              valYearSelect={valYear}
            />
          </div>
          <div className="px-2">
            <ModalSelectOneTime
              setIsLoading={setIsLoading}
              setFlag={setFlag}
              doctors={doctors}
              valDoctor={valDoctor}
              setValDoctor={setValDoctor}
            />
          </div>
        </div>
      </div>
    </>
  );
}
