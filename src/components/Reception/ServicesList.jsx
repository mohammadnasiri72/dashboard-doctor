import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import TableServices from './TableServices';

export default function ServicesList({ userSelected , setServiceList , servicesUser , listServices , setListServices}) {
  const [services, setServices] = useState([]);
  const [service, setService] = useState('');
  const [numberService, setNumberService] = useState(1);
  useEffect(()=>{
    let arr = []
    services.filter((e)=>{
      servicesUser.map((ev)=>{
        if (e.medicalServiceId === ev.medicalServiceId) {
          e.number= ev.number
          arr.push(e)
          setListServices(arr);
        }
      })
    });
  },[services , servicesUser])
  
  useEffect(() => {
    if (listServices.length>0) {
      let arr = [];
      listServices.map((e) => {
        arr.push({
          appointmentId: 0,
          medicalServiceId: e.medicalServiceId,
          number: Number(e.number),
        });
      });
      setServiceList(arr);
    }
  }, [listServices]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    axios
      .get(mainDomain + '/api/MedicalService/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setServices(res.data);
        setService(res.data[0]);
      })
      .catch((err) => {});
  }, []);
  const setServiceHandler = () => {
    if (userSelected.patientId) {
      service.number = numberService;
      setListServices([...listServices, service]);
    } else {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ابتدا بیمار را ثبت کنید',
      });
    }
  };
  const changServicesHandler = (event, newValue) => {
    setService(newValue);
  };
  return (
    <>
      <div className="flex mt-5">
        <div className="">
          <Autocomplete
            onChange={(event, newValue) => changServicesHandler(event, newValue)}
            value={service}
            disablePortal
            id="combo-box-demo"
            options={services}
            getOptionLabel={(option) => option.title? option.title : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="لیست خدمات" />}
          />
        </div>
        <div className="w-20 px-1 text-start" dir="rtl">
          <TextField
            onChange={(e) => setNumberService(e.target.value)}
            className="w-full text-end"
            id="outlined-multiline-flexible"
            label="تعداد"
            multiline
            dir="rtl"
            value={numberService}
            maxRows={4}
          />
        </div>
        <button
          onClick={setServiceHandler}
          className="text-white rounded-md px-5 py-2 bg-green-500 duration-300 hover:bg-green-600"
        >
          ثبت
        </button>
      </div>
      <div className="mt-4">
        <TableServices listServices={listServices} setListServices={setListServices} servicesUser={servicesUser}/>
      </div>
    </>
  );
}
