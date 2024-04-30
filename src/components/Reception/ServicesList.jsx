import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import TableServices from './TableServices';

export default function ServicesList({userSelected}) {
  const [services, setServices] = useState([]);
  const [service, setService] = useState('');
  const [numberService , setNumberService] = useState(1)
  const [listServices , setListServices] = useState([])
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
  const setServiceHandler = ()=>{
    if (userSelected.patientId) {
        service.number = numberService
        setListServices([...listServices , service])
        
    }else{
        alert('dsfsd')
    }
    
  }
  return (
    <>
      <div className="flex mt-5">
        <div className="w-56">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              لیست خدمات
            </InputLabel>
            <Select
              onChange={(e) => setService(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="لیست خدمات"
              color="primary"
              value={service}
            >
              {services.map((e) => (
                <MenuItem value={e} key={e.medicalServiceId}>
                  <span>{e.title}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        <button onClick={setServiceHandler} className="text-white rounded-md px-5 py-2 bg-green-500 duration-300 hover:bg-green-600">ثبت</button>
      </div>
      <div className='mt-4'>
        <TableServices listServices={listServices}/>
      </div>
    </>
  );
}
