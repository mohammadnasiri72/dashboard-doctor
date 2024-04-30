// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { mainDomain } from '../../utils/mainDomain';

// export default function InsuranceList({ userSelected , showAddInsurance}) {
//   const [insuranceList, setInsuranceList] = useState([]);
//   const [valInsurance , setValInsurance] = useState('')
//   useEffect(() => {
//     if (userSelected.nationalId) {
//       axios
//         .get(mainDomain + '/api/Insurance/GetList', {
//           params: {
//             patientNationalId: userSelected.nationalId,
//           },
//           headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token'),
//           },
//         })
//         .then((res) => {
//           setValInsurance(res.data[0].insuranceCompanyName)
//           setInsuranceList(res.data);
//         })
//         .catch((err) => {});
//     }
//   },[userSelected , showAddInsurance]);
//   return (
//     <>
//       <div className="w-80 mt-4">
//         <FormControl color="primary" className="w-full">
//           <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
//             لیست بیمه های بیمار
//           </InputLabel>
//           <Select
//             onChange={(e) => setValInsurance(e.target.value)}
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             label="لیست بیمه های بیمار"
//             color="primary"
//             value={valInsurance}
//           >
//             {insuranceList.map((e, i) => (
//               <MenuItem value={e} key={i}>
//             {e.insuranceCompanyName}
//               </MenuItem>
//             ))}
//             {/* {conditionList.map((e, i) => (
//                 <MenuItem value={e} key={i}><span>{e}</span></MenuItem>
//             ))} */}

//           </Select>
//         </FormControl>
//       </div>
//     </>
//   );
// }

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';


export default function InsuranceList({
  userSelected,
  showAddInsurance,
  setInsuranceListSelected,
  insuranceListSelected,
}) {
  const [insuranceList, setInsuranceList] = useState([]);
  const [valInsurance , setValInsurance] = useState([])

  
  useEffect(()=>{
    setValInsurance([])
    setInsuranceListSelected([])
  },[showAddInsurance])
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
  }, [userSelected, showAddInsurance]);
  

  const changInsuranceHandler = (event, newValue) => {
    console.log(newValue);
    setInsuranceListSelected(newValue);
    setValInsurance(newValue)
  };
  return (
    <div className="w-80 mt-6">
      {/* <FormControl sx={{ mt: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">لیست بیمه های بیمار</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="لیست بیمه های بیمار" />}
          renderValue={(selected) => {
            
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.insuranceCompanyId} label={value.insuranceCompanyName} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {insuranceList.map((name) => (
            <MenuItem key={name.insuranceCompanyId} value={name} style={getStyles(name, personName, theme)}>
              {name.insuranceCompanyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <Autocomplete
        value={valInsurance}
        // disabled={!isPatientActive}
        onChange={(event, newValue) => {
          changInsuranceHandler(event, newValue);
        }}
        multiple
        id="tags-outlined"
        options={insuranceList}
        getOptionLabel={(option) => option.insuranceCompanyName}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="لیست بیمه های بیمار" placeholder="انتخاب بیمه" />}
      />
    </div>
  );
}
