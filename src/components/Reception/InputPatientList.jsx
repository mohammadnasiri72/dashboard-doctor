import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function InputPatientList({ pageStateReception , setUserSelected}) {
  const [patientList, setPatientList] = useState([]);
  const [patientName, setPatientName] = useState('');
  //   patientName.includes()
  useEffect(() => {
    if (pageStateReception === 1) {
      patientList.map((e) => {
        if (patientName?.includes(e.nationalId)) {
          setUserSelected(e)
        }
      });
    }
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
  const changValPatientHandler = (e) => {
    setPatientName(e.target.innerText);
  };
  return (
    <>
      <div className="w-80">
        <Autocomplete
          value={patientName ? patientName : ''}
          onChange={changValPatientHandler}
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
