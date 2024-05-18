import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { Button, IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Iconify from '../Iconify';
import { TiGroup } from 'react-icons/ti';
import { MdOutlineMoreTime } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import ModalSelectOneTime from './ModalSelectOneTime';
import ModalEditOneTime from './ModalEditOneTime';

export default function BoxTimeReserve({ moon, year, valDoctor, numberMoon, setIsLoading, flag, setFlag }) {
  const [listDay, setListDay] = useState([]);
  const [listDaySelect, setListDaySelect] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [alignment, setAlignment] = useState('');
  const [date, setDate] = useState('');

  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
  useEffect(()=>{
    setDate(converter(new Date().toLocaleDateString('fa-IR')))
  },[])

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  let arr = new Array(numberMoon < 7 ? 31 : numberMoon < 12 ? 30 : 29).fill(false);
  useEffect(() => {
    arr.map((e, i) => {
      listDay.map((ev) => {
        if (i + 1 === Number(ev.dateFa.slice(ev.dateFa.lastIndexOf('/') + 1))) {
          arr[i] = true;
        }
      });
    });

    setListDaySelect(arr);
  }, [listDay]);

  // get day reserve
  useEffect(() => {
    if (moon && year && valDoctor) {
      setIsLoading(true);
      axios
        .get(mainDomain + '/api/ReservationTime/GetList', {
          params: {
            doctorId: valDoctor,
            dateFa: year + '/' + moon + '/00',
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setListDay(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [moon, year, valDoctor, flag]);



  useEffect(() => {
    if (date.trim()) {
        setIsLoading(true);
        axios
          .get(mainDomain + '/api/ReservationTime/GetList', {
            params: {
              doctorId: valDoctor,
              dateFa: date,
            },
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setListTime(res.data[0]?.reservationTimes ? res.data[0].reservationTimes : []);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
          });
        
    }
   
  }, [date , flag , valDoctor]);



  const deleteTimeHandler = (e) => {
    Swal.fire({
      title: 'حذف زمان پذیرش',
      text: 'آیا از حذف زمان پذیرش مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('reservationTimeId', e.reservationTimeId);
        axios
          .post(mainDomain + '/api/ReservationTime/Delete', data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setFlag((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'زمان پذیرش با موفقیت حذف شد',
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
  };
  return (
    <>
      <div className="flex mt-3">
        <div className="w-1/4 px-3">
          <div className="h-[80vh] border rounded-lg overflow-auto p-3  pb-10 ">
            <p>
              تاریخ {year}/{moon}
            </p>
            <div className="flex flex-wrap">
              {/* {
                    listDay.map((e , i)=>(
                       <div  key={i} className='mt-7 flex'>
                         <span onClick={()=> setTimeReserveHandler(e)} className='bg-slate-200 rounded-md px-5 py-2 cursor-pointer duration-300 hover:bg-slate-300 w-full'>{e.dateFa}</span>
                       </div>

                    ))
                } */}
              {/* {new Array(numberMoon < 7 ? 31 : numberMoon < 12 ? 30 : 29).fill('').map((e, i) => (
              <div key={i} className="mt-7 flex w-1/3 px-2">
                <span
                  style={{
                    backgroundColor: listDay.map((ev) => {
                      Number(ev.dateFa.slice(ev.dateFa.lastIndexOf('/') + 1)) === i + 1;
                    })
                      ? 'red'
                      : 'blue',
                  }}
                  onClick={() => setTimeReserveHandler(i)}
                  className="bg-slate-200 rounded-md px-5 py-2 cursor-pointer duration-300 hover:bg-slate-300 w-full"
                >
                  {i + 1}
                </span>
              </div>
            ))} */}
              {/* {listDaySelect.map((e, i) => (
                <div key={i} className="mt-7 flex w-1/3 px-2">
                  <span
                    style={{ opacity: e ? '1' : '0.5', backgroundColor: e ? 'green' : '', color: e ? 'white' : '' }}
                    onClick={() => setTimeReserveHandler(i)}
                    className="font-semibold bg-slate-200 rounded-md px-5 py-2 cursor-pointer duration-300 hover:bg-slate-300 w-full"
                  >
                    {i + 1}
                  </span>
                </div>
              ))} */}
              <ToggleButtonGroup
                sx={{ border: 'none' }}
                className="flex flex-wrap"
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                {listDaySelect.map((e, i) => (
                  <div key={i} className="mt-7 flex w-1/3 px-2">
                    {/* <span
                    style={{ opacity: e ? '1' : '0.5', backgroundColor: e ? 'green' : '', color: e ? 'white' : '' }}
                    onClick={() => setTimeReserveHandler(i)}
                    className="font-semibold bg-slate-200 rounded-md px-5 py-2 cursor-pointer duration-300 hover:bg-slate-300 w-full"
                  >
                    {i + 1}
                  </span> */}
                    <ToggleButton
                      sx={{
                        fontSize: '20px',
                        backgroundColor: e ? 'rgb(203 213 225)' : 'rgb(241 245 249)',
                        opacity: e ? '1' : '0.5',
                      }}
                      color="primary"
                      onClick={() => {
                        setDate(year + '/' + moon + '/' + (i + 1));
                      }}
                      className="w-20 h-14 border duration-300"
                      value={i + 1}
                    >
                      {i + 1}
                    </ToggleButton>
                  </div>
                ))}
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        <div className="w-3/4 px-5 h-[80vh] border rounded-lg overflow-auto">
          <div className="flex flex-wrap py-4">
            {listTime.map((e) => (
              <div className="w-1/4 px-2 mt-5 relative" key={e.reservationTimeId}>
                <div style={{opacity: e.remainingCapacity===0?'0.5':'1'}} className="bg-slate-200 rounded-md px-5 py-3 w-full duration-300 hover:bg-slate-300 flex flex-col justify-center items-center">
                  <span>
                    {e.toTime} - {e.fromTime}
                  </span>
                  <div>
                    <span>ظرفیت: </span>
                    <span>{e.remainingCapacity}/{e.capacity}</span>
                  </div>
                  <div>
                    <span>{e.isActive? 'فعال':'غیرفعال'}</span>
                  </div>
                  <div className="flex justify-around w-full">
                    <Tooltip title="حذف">
                      <IconButton disabled={e.isExpired} onClick={() => deleteTimeHandler(e)}>
                        <FaTrashCan style={{color:e.isExpired? '':'rgb(248 113 113)'}} className="cursor-pointer text-2xl" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ویرایش">
                      <IconButton disabled={e.isExpired}>
                        {/* <MdEdit className="cursor-pointer text-2xl" /> */}
                        <ModalEditOneTime setIsLoading={setIsLoading} setFlag={setFlag} e={e}/>
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
            {listTime.length === 0 && (
              <p className="text-center text-2xl font-semibold w-full">برای این تاریخ زمانی در نظر گرفته نشده است</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
