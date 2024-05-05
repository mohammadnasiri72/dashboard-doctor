import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function CheckBoxDoctor({ valCondition, setValCondition ,medicalRecord}) {
  const [conditionPatient, setConditionPatient] = useState([]);
  
  // let arr = new Array(conditionPatient.length).fill(false)

  // useEffect(()=>{
  //   conditionPatient.map((e,i)=>{
  //     medicalRecord.map((ev)=>{
  //       if (e.itemId === ev.medicalItemId) {
  //         e.checked = true
  //       }else{
  //         e.checked = false
  //       }
  //     })
  //   })
  // },[conditionPatient , medicalRecord])

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
        {conditionPatient.filter((e)=> e.isActive).map((e , i) => (
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
