import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function MedicineList({ setMedicine , isPatientActive , medicine}) {
  const [medicines, setMedicines] = useState([]);
  
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Medication/GetList', {
        params: {
          categoryId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => {});
  }, []);
  const getListMedicine = (e)=>{
    if (medicines.find((ev)=> ev.name === e.target.innerText)) {
        setMedicine([ medicines.find((ev)=> ev.name === e.target.innerText)]);
        
    }
  }
  return (
    <>
      <div className="w-56">
        <Stack spacing={3}>
          <Autocomplete
          disabled={!isPatientActive}
            //   value={medicine}
            onChange={getListMedicine}
            multiple
            id="tags-outlined"
            options={medicines}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="دارو های مورد استفاده" placeholder="انتخاب دارو" />}
          />
        </Stack>
      </div>
    </>
  );
}
