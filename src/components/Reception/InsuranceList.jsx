import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InsuranceList({ userSelected }) {
//   console.log(userSelected);
  const [insuranceList, setInsuranceList] = useState([]);
  const [valInsurance , setValInsurance] = useState('')
  useEffect(() => {
    if (userSelected.nationalId) {
      axios
        .get(mainDomain + '/api/Insurance/GetList', {
          params: {
            patientNationalId: userSelected.nationalId,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setInsuranceList(res.data);
        })
        .catch((err) => {});
    }
  },[userSelected]);
  return (
    <>
      <div className="w-80 mt-4">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست بیمه های بیمار
          </InputLabel>
          <Select
            onChange={(e) => setValInsurance(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست بیمه های بیمار"
            color="primary"
            value={valInsurance}
          >
            {insuranceList.map((e, i) => (
              <MenuItem value={e} key={i}>
                123
              </MenuItem>
            ))}
            {/* {conditionList.map((e, i) => (
                <MenuItem value={e} key={i}><span>{e}</span></MenuItem>
            ))} */}
            
          </Select>
        </FormControl>
      </div>
    </>
  );
}
