import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function CheckBoxDoctor({ valCondition, setValCondition }) {
  const [conditionPatient, setConditionPatient] = useState([]);

  useEffect(() => {
    axios
      .get(mainDomain + '/api/BasicInfo/PatientStatusAdmission/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setConditionPatient(res.data);
      })
      .catch((err) => {});
  }, []);
  const changConditionHandler = (e) => {
    if (valCondition.includes(Number(e.target.value))) {
      setValCondition(valCondition.filter((event) => event !== Number(e.target.value)));
    } else {
      setValCondition([...valCondition, Number(e.target.value)]);
    }
  };
  return (
    <>
      <div className="mt-4 flex justify-start items-center">
        <h3 className="px-4">وضعیت هنگام پذیرش:</h3>
        {conditionPatient.map((e) => (
          <FormControlLabel
            onChange={changConditionHandler}
            className="px-10"
            key={e.itemId}
            control={<Checkbox />}
            label={e.name}
            value={e.itemId}
          />
        ))}
      </div>
    </>
  );
}
