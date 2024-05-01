import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputPatientList({ pageStateReception , setUserSelected , patientList , setPatientList}) {
  
  const [patientName, setPatientName] = useState('');
  useEffect(() => {
      patientList.map((e) => {
        if (patientName?.includes(e.nationalId)) {
          setUserSelected(e)
        }
      });
  }, [patientName, patientList]);

  useEffect(() => {
    axios
      .get(mainDomain + '/api/Patient/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setPatientList(res.data);
      })
      .catch((err) => {});
  }, []);
  const changValPatientHandler = (event , newValue) => {
    setPatientName(newValue);
    if (!newValue) {
      setUserSelected([])
    }
  };
  return (
    <>
      <div className="min-w-80">
        <Autocomplete
          value={patientName ? patientName : ''}
          onChange={(event , newValue)=> changValPatientHandler(event , newValue)}
          freeSolo
          options={patientList.map(
            (option) => option.firstName + ' ' + option.lastName + ' ( ' + option.nationalId + ' ) '
          )}
          renderInput={(params) => (
            <TextField {...params} label={pageStateReception === 0 ? 'لیست بیماران' : 'انتخاب بیمار'} />
          )}
        />
      </div>
    </>
  );
}
