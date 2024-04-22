import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function MedicineList({ isPatientActive, setMedicationIdList , valueMedicine , setValueMedicine}) {
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
  const changMedicineHandler = (event, newValue) => {
    setValueMedicine(newValue);
    let arr = [];
    newValue.map((e) => {
      arr.push(e.medicationId);
    });
    setMedicationIdList(arr);
  };
  return (
    <>
      <div>
        <Stack spacing={3}>
          <Autocomplete
            value={isPatientActive? valueMedicine : []}
            disabled={!isPatientActive}
            onChange={(event, newValue) => {
              changMedicineHandler(event, newValue);
            }}
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
