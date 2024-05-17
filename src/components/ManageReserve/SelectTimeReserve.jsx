import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import { mainDomain } from '../../utils/mainDomain';
import ModalSelectTime from './ModalSelectTime';

export default function SelectTimeReserve({ setIsLoading, valDoctor, setValDoctor, setYear, setMount }) {
  const [doctors, setDoctors] = useState([]);
  const [valMoon, setValMoon] = useState(new Date());
  const [valYear, setValYear] = useState(new Date());

  const [day, setDay] = useState('همه');
  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);

  // get list doctors
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setValDoctor(res.data[0].doctorId);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="flex justify-around">
        <div className="flex">
          {/* select doctor */}
          <div className="flex items-center w-48">
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
                setValYear(e)
                setYear(converter(e.format('MM')) * 1)
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
                setValMoon(e)
                setMount(converter(e.format('MM')) * 1);
              }}
            />
          </div>
          {/* select day */}
          <div className="pr-2" dir="rtl">
            <FormControl color="primary">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                روز
              </InputLabel>
              <Select
                className="w-20"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="روز"
                color="primary"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <MenuItem value={'همه'}>همه</MenuItem>
                {new Array(31).fill('').map((m, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* <div className="flex">
          <button
            onClick={handleOpen}
            className="bg-green-500 px-5 py-2 rounded-md text-white hover:text-green-600 duration-300 font-semibold"
          >
             افزودن گروهی
          </button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                سال و ماه را وارد کنید
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
               <div className='flex'>
                <div>
                  <DatePicker
                    inputClass="outline-none border rounded-lg w-20 h-14 px-3"
                    onlyYearPicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    placeholder="سال"
                    value={year}
                    onChange={(e) => setYear(e)}
                  />
                </div>
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
                    value={mount}
                    onChange={(e) => setMount(e)}
                  />
                </div>
               </div>
              </Typography>
            </Box>
          </Modal>
        </div> */}
        <ModalSelectTime setIsLoading={setIsLoading} />
      </div>
    </>
  );
}
