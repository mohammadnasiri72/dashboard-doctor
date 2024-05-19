import { FormControlLabel, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GridCloseIcon } from '@mui/x-data-grid';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function ModalEditOneTime({ setIsLoading, setFlag, e }) {
  const [open, setOpen] = useState(false);
  const [valTimeStart, setValTimeStart] = useState('');
  const [valTimeEnd, setValTimeEnd] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isEditTimeStart, setIsEditTimeStart] = useState(false);
  const [isEditTimeEnd, setIsEditTimeEnd] = useState(false);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // set time
  useEffect(() => {
    const timeStart = new Date();
    timeStart.setHours(e.fromTime.slice(0, 2));
    timeStart.setMinutes(e.fromTime.slice(3, 5));
    timeStart.setSeconds(e.fromTime.slice(6, 8));
    const timeEnd = new Date();
    timeEnd.setHours(e.toTime.slice(0, 2));
    timeEnd.setMinutes(e.toTime.slice(3, 5));
    timeEnd.setSeconds(e.toTime.slice(6, 8));
    setCapacity(e.capacity);
    setValTimeStart(new Date(timeStart.getTime()));
    setValTimeEnd(new Date(timeEnd.getTime()));
  }, [e]);

  //   open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
  };

  // edit time reserve
  const saveTimeHandler = () => {
    setIsLoading(true);
    const data = {
      reservationTimeId: e.reservationTimeId,
      fromTime: isEditTimeStart
        ? valTimeStart.format() + ':00'
        : valTimeStart.getHours() + ':00' + valTimeStart.getMinutes() + ':00',
      toTime: isEditTimeEnd
        ? valTimeEnd.format() + ':00'
        : valTimeEnd.getHours() + ':00' + valTimeEnd.getMinutes() + ':00',
      capacity,
      remainingCapacity: e.remainingCapacity,
      statusId: isActive ? 1 : 0,
    };
    axios
      .post(mainDomain + '/api/ReservationTime/Edit', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        handleClose();
        setIsEditTimeStart(false);
        setIsEditTimeEnd(false);
        setFlag((e) => !e);
        Toast.fire({
          icon: 'success',
          text: 'زمان پذیرش با موفقیت ویرایش شد',
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
      <MdEdit onClick={handleClickOpen} className="cursor-pointer text-2xl" />
      <Dialog
        sx={{ '& .MuiDialog-paper': { minHeight: 455 }, zIndex: '999999999999999' }}
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
            {/* select from time */}
            <div className="w-60 flex items-center ">
              <p className="px-2 whitespace-nowrap">از ساعت:</p>
              <DatePicker
                children
                inputClass="border w-full rounded-lg h-14 px-3"
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker key={e.reservationTimeId} hideSeconds />]}
                calendarPosition="bottom-right"
                onChange={(event) => {
                  setValTimeStart(event);
                  setIsEditTimeStart(true);
                }}
                value={valTimeStart}
                placeholder="ساعت شروع"
              />
            </div>
            {/* select end time */}
            <div className="w-60 flex items-center ">
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
                  setIsEditTimeEnd(true);
                }}
                value={valTimeEnd}
                placeholder="ساعت پایان"
              />
            </div>
            {/* select capacity */}
            <div className="w-60 flex items-center" dir="rtl">
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
            {/* select active */}
            <div className="pr-5 mt-2">
              <FormControlLabel
                value={isActive}
                onChange={() => setIsActive(!isActive)}
                control={<Switch checked={isActive} />}
                label={isActive ? 'فعال' : 'غیر فعال'}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveTimeHandler}>ذخیره تغیرات</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
