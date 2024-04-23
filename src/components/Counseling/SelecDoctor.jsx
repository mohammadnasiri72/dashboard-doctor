import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelecDoctor({ expertise }) {
  const [doctors, setDoctors] = useState([]);
  const [valDoctor, setValDoctor] = useState([]);
  // console.log(doctors);
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setValDoctor(res.data[0].doctorId)
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className=" mx-auto flex items-center mt-5">
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
              {expertise === 'همه' &&
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
                  ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}
