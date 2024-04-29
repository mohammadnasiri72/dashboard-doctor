import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputCondition() {
  const [conditionList, setConditionList] = useState([]);
  const [valCondition , setValCondition] = useState('all')
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Appointment/GetStatusList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        let arr = [];
        for (const prop in res.data) {
          // alert(res.data[prop]);
          arr.push(res.data[prop]);
        }
        setConditionList(arr);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <div className="w-36 pr-4">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            وضعیت
          </InputLabel>
          <Select
            onChange={(e) => setValCondition(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="وضعیت"
            color="primary"
            value={valCondition}
          >
            <MenuItem value="all">
              <span>همه</span>
            </MenuItem>
            {conditionList.map((e, i) => (
              <MenuItem value={e} key={i}><span>{e}</span></MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
