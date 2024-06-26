import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Swal from 'sweetalert2';
import SimpleBackdrop from '../backdrop';

export default function AddInsurance({ userSelected , setShowAddInsurance , setFlag}) {
  const [userInsurance, setUserInsurance] = useState([]);
  const [valInsurance, setValInsurance] = useState('');
  const [policyNumber , setPolicyNumber] = useState('')
  const [coverageType , setCoverageType] = useState('')
  const [coverageAmount , setCoverageAmount] = useState('')
  const [startDateFa , setStartDateFa] = useState('')
  const [endDateFa , setEndDateFa] = useState('')
  const [isLoading , setIsLoading] = useState(false)

  const datePicStart = useRef();
  const datePicEnd = useRef();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    if (userSelected.nationalId) {
      axios
        .get(mainDomain + '/api/InsuranceCompany/GetList', {
         
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setUserInsurance(res.data);
          setValInsurance(res.data[0].insuranceCompanyId)
        })
        .catch((err) => {});
    }
  }, [userSelected]);
  const setInsuranceHandler =()=>{
    setIsLoading(true)
    const data ={
        insuranceCompanyId: valInsurance,
        patientId: userSelected.patientId,
        policyNumber: policyNumber,
        coverageType: coverageType,
        coverageAmount: coverageAmount,
        startDateFa: startDateFa,
        endDateFa: endDateFa,
    }
    axios
    .post(mainDomain+'/api/Insurance/Add' , data , {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
    })
    .then((res)=>{
      setIsLoading(false)
      Toast.fire({
        icon: 'success',
        text: 'بیمه با موفقیت ثبت شد',
      });
        setShowAddInsurance(false)
        setFlag((e)=>!e)
    })
    .catch((err)=>{
      setIsLoading(false)
    })

  }
  return (
    <>
      <div className="w-full">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            انتخاب بیمه
          </InputLabel>
          <Select
            onChange={(e) => setValInsurance(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="انتخاب بیمه"
            color="primary"
            value={valInsurance}
          >
            {userInsurance.length>0 &&
            userInsurance.map((e, i) => (
              <MenuItem value={e.insuranceCompanyId} key={e.insuranceCompanyId}>
                <span>{e.name}</span>
              </MenuItem>
            ))}
            {userInsurance.length===0 &&
                <MenuItem disabled>
                <span>لیست بیمه های بیمار خالی است</span>
              </MenuItem>
            }
          </Select>
        </FormControl>
      </div>
      <div className=" text-start mt-3" dir="rtl">
        <TextField
          onChange={(e) => setPolicyNumber(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="شماره بیمه"
          multiline
          dir="rtl"
          value={policyNumber}
          maxRows={4}
        />
      </div>
      <div className=" text-start mt-3" dir="rtl">
        <TextField
          onChange={(e) => setCoverageType(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="نوع پوشش بیمه"
          multiline
          dir="rtl"
          value={coverageType}
          maxRows={4}
        />
      </div>
      <div className=" text-start mt-3" dir="rtl">
        <TextField
          onChange={(e) => setCoverageAmount(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="درصد پوشش بیمه"
          multiline
          dir="rtl"
          value={coverageAmount}
          maxRows={4}
        />
      </div>
      <div className="mt-4 w-full">
        <DatePicker
          ref={datePicStart}
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persian_fa}
          calendar={persian}
          value={startDateFa}
          onChange={(event) => {
            setStartDateFa(event.format());
          }}
          placeholder="تاریخ شروع بیمه"
        />
      </div>
      <div className="mt-4">
        <DatePicker
          ref={datePicEnd}
          inputClass="outline-none border rounded-lg w-full h-14 px-3"
          locale={persian_fa}
          calendar={persian}
          onChange={(event) => {
            setEndDateFa(event.format());
          }}
          value={endDateFa}
          placeholder="تاریخ اتمام بیمه"
        />
      </div>
      <div className='mt-4'>
        <button onClick={setInsuranceHandler} className='bg-green-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-green-600'>ثبت درخواست</button>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
    </>
  );
}
