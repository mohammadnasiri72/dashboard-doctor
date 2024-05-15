import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

export default function ModalSelectTime({setIsLoading}) {
  const [doctors, setDoctors] = React.useState([]);
  const [valDoctor, setValDoctor] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState('');
  const [mount, setMount] = React.useState(new Date());
  const [day, setDay] = React.useState('');
  const [valTimeStart, setValTimeStart] = React.useState('');
  const [valTimeEnd, setValTimeEnd] = React.useState('');
  const [interval, setInterval] = React.useState('');
  const [capacity, setCapacity] = React.useState('');
//   console.log(year.toLocaleDateString('fa-IR'));
//   console.log(Number(year.toLocaleDateString('fa-IR').slice(0,4)));
  

   // import sweet alert-2
   const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list doctors
  React.useEffect(() => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTimeHandler = ()=>{
    Swal.fire({
        title: 'ثبت زمان پذیرش',
        text: 'آیا از ثبت زمان پذیرش مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            doctorId: valDoctor,
            year: 1403,
            moon: 4,
            dayOfWeek: day,
            fromTime: valTimeStart.format(),
            toTime: valTimeEnd.format(),
            interval,
            capacity,
            statusId: 1 
          };
          axios
            .post(mainDomain + '/api/ReservationTime/AddRange', data, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
            .then((res) => {
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
        }
      });
  }
  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="bg-green-500 px-5 py-2 rounded-md text-white hover:text-green-600 duration-300 font-semibold"
      >
        افزودن گروهی
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
          {/* <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box> */}
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
            {/* select years */}
            <div>
              <DatePicker
                inputClass="outline-none border rounded-lg w-20 h-14 px-3"
                onlyYearPicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                placeholder="سال"
                value={year}
                onChange={(e , {validatedValue}) => {
                    setYear(e)
                    // console.log(validatedValue[0]*1);
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
                value={mount}
                onChange={(e) => setMount(e)}
              />
            </div>
            {/* select day */}
            <div className="pr-2 text-start" dir="rtl">
              <FormControl color="primary">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  روز هفته
                </InputLabel>
                <Select
                  className="w-80"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="روز هفته"
                  color="primary"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <MenuItem value={6}>شنبه</MenuItem>
                  <MenuItem value={0}>یکشنبه</MenuItem>
                  <MenuItem value={1}>دوشنبه</MenuItem>
                  <MenuItem value={2}>سه‌شنبه</MenuItem>
                  <MenuItem value={3}>چهارشنبه</MenuItem>
                  <MenuItem value={4}>پنجشنبه</MenuItem>
                  <MenuItem value={5}>جمعه</MenuItem>
                </Select>
              </FormControl>
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
                format="HH:mm:ss"
                plugins={[<TimePicker key={valTimeStart} />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeEnd(event);
                }}
                value={valTimeEnd}
                placeholder="ساعت پایان"
              />
            </div>
          </div>
          <div className='flex'>
             {/* select interval */}
             <div className="w-60 mt-5 flex items-center" dir="rtl">
              <p className="px-2 whitespace-nowrap">فاصله:</p>
              <TextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">دقیقه</InputAdornment>,
                }}
                onChange={(e) => setInterval(e.target.value)}
                className=" text-end duration-300"
                id="outlined-multiline-flexible"
                label=""
                multiline
                dir="rtl"
                value={interval}
                maxRows={4}
              />
            </div>
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
          <Button onClick={saveTimeHandler}>ذخیره تغیرات</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
