import { FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GridCloseIcon } from '@mui/x-data-grid';
import axios from 'axios';
import * as React from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { mainDomain } from '../../utils/mainDomain';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ModalSelectOneTime({ setIsLoading , setFlag , doctors , valDoctor , setValDoctor}) {

  const [open, setOpen] = useState(false);
  

  const [valTimeStart, setValTimeStart] = useState('');
  const [valTimeEnd, setValTimeEnd] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [valDate, setValDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [isActive, setIsActive] = useState(true);


//   const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
//   React.useEffect(() => {
//     setMoon(
//       converter(
//         new Date()
//           .toLocaleDateString('fa-IR')
//           .slice(
//             new Date().toLocaleDateString('fa-IR').indexOf('/') + 1,
//             new Date().toLocaleDateString('fa-IR').lastIndexOf('/')
//           )
//       ) * 1
//     );
//     setYear(
//       converter(new Date().toLocaleDateString('fa-IR').slice(0, new Date().toLocaleDateString('fa-IR').indexOf('/'))) *
//         1
//     );
//   }, []);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTimeHandler = () => {
    setIsLoading(true);
    const data = {
      doctorId: valDoctor,
      date: valDate,
      fromTime: valTimeStart.format() + ':00',
      toTime: valTimeEnd.format() + ':00',
      capacity,
      statusId: isActive? 1 : 0,
    };
    axios
      .post(mainDomain + '/api/ReservationTime/Add', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        handleClose();
        setFlag((e)=>!e)
        Toast.fire({
          icon: 'success',
          text: 'زمان پذیرش با موفقیت ثبت شد',
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="bg-green-500 px-5 py-2 rounded-md text-white hover:text-green-600 duration-300 font-semibold"
      >
        افزودن تکی
      </button>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minHeight: 455 } }}
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>انتخاب تاریخ</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <GridCloseIcon />
        </IconButton>
        <DialogContent>
          <div className="flex">
            {/* select doctors */}
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
            {/* select date */}
            <div className="w-60 flex items-center ">
              <p className="px-2 whitespace-nowrap">تاریخ :</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={(event) => {
                    setValDate(event.format());
                }}
                value={valDate}
                placeholder="تاریخ"
              />
            </div>
            <div className='pr-5 mt-2'>
                <FormControlLabel
                  value={isActive}
                  onChange={() => setIsActive(!isActive)}
                  control={<Switch checked={isActive} />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
          </div>
          <div className="flex">
            {/* select from time */}
            <div className="w-60 mt-5 flex items-center ">
              <p className="px-2 whitespace-nowrap">از ساعت:</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker hideSeconds key={valTimeStart} />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeStart(event);
                }}
                value={valTimeStart}
                placeholder="ساعت شروع"
              />
            </div>
            {/* select end time */}
            <div className="w-60 mt-5 flex items-center ">
              <p className="px-2 whitespace-nowrap">تا ساعت:</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker hideSeconds key={valTimeStart} />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeEnd(event);
                }}
                value={valTimeEnd}
                placeholder="ساعت پایان"
              />
            </div>
          </div>
          <div className="flex">
           
            {/* select capacity */}
            <div className="w-60 mt-5 flex items-center" dir="rtl">
              <p className="px-2 whitespace-nowrap">ظرفیت:</p>
              <TextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">نفر</InputAdornment>,
                }}
                onChange={(e) => setCapacity(e.target.value)}
                className=" text-end duration-300"
                id="outlined-multiline-flexible"
                label=""
                multiline
                dir="rtl"
                value={capacity}
                maxRows={4}
              />
            </div>
          </div>
          {/* <div className='mt-6 text-start pr-10'>
            <button className='px-6 py-4 text-white font-semibold bg-green-500 duration-300 hover:bg-green-600 rounded-md'>ثبت</button>
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button
           onClick={saveTimeHandler}
           >ذخیره تغیرات</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
