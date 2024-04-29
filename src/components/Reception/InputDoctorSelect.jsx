import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputDoctorSelect({pageStateReception}) {
    const [doctors , setDoctors] = useState([])
    const [doctor , setDoctor] = useState('')
    useEffect(() => {
        axios
          .get(mainDomain + '/api/Doctor/GetList', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setDoctors(res.data);
            setDoctor(res.data[0].doctorId)
          })
          .catch((err) => {});
      }, []);
  return (
    <>
      <div className="px-4 w-56" dir="rtl">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            {
                pageStateReception===0 &&
                'لیست پزشکان'
            }
            {
                pageStateReception===1 &&
                'انتخاب پزشک'
            }
          </InputLabel>
          <Select
              onChange={(e) => setDoctor(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label= {pageStateReception===0 ? "لیست پزشکان":'انتخاب پزشک'}
            color="primary"
              value={doctor}
          >
            {/* {expertise === 'همه' &&
                doctors.map((d) => (
                    <MenuItem key={d.doctorId} value={d.doctorId}>
                    {d.firstName} {d.lastName}
                    </MenuItem>
                    ))}
                    {expertise !== 'همه' &&
                    doctors
                    .filter((e) => e.specialization === expertise)
                    .map((d) => (
                        <MenuItem key={d.doctorId} value={d.doctorId}>
                        {d.firstName} {d.lastName}
                        </MenuItem>
                    ))} */}
                  {
                      doctors.map((e , i)=>(
                        <MenuItem value={e.doctorId} key={i}>{e.firstName} {e.lastName}</MenuItem>

                    ))
                  }
          </Select>
        </FormControl>
      </div>
    </>
  );
}
