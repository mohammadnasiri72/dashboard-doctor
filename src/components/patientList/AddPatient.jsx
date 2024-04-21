import React, { useState } from 'react';
import InputNamePatient from './InputNamePatient';
import InputAge from './InputAge';
import SwitchPatientActive from './SwitchPatientActive';
import MedicineList from './MedicineList';
import DescriptionPatient from './DescriptionPatient';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';

export default function AddPatient() {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState(true);
  const [desc, setDesc] = useState('');
  const [medicine, setMedicine] = useState([]);
    console.log(medicine);
  const medicationIdList = [];
  medicine.map((m) => {
    if (m) {
      medicationIdList.push(m.medicationId);
    }
  });
  const setPatientHandler = () => {
    const dataPatient = {
      title: patientName,
      age,
      statusId: isPatientActive ? 1 : 0,
      description: desc,
      medicationIdList: medicationIdList,
    };
    // console.log(dataPatient);
    // axios
    //   .post(mainDomain + '/api/PatientHistory/Add', dataPatient, {
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('token'),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center xl:w-1/6 ">
        <InputNamePatient patientName={patientName} setPatientName={setPatientName} />
      </div>
      <div className="flex justify-center items-center xl:w-1/6 ">
        <InputAge setAge={setAge} age={age} />
      </div>
      <div className="flex justify-center items-center xl:w-1/6 ">
        <SwitchPatientActive setIsPatientActive={setIsPatientActive} isPatientActive={isPatientActive} />
      </div>
      <div className="flex justify-center items-center xl:w-1/3 ">
        <MedicineList setMedicine={setMedicine} isPatientActive={isPatientActive} medicine={medicine} />
      </div>
      <div className="flex justify-center items-center xl:w-1/6 ">
        <DescriptionPatient setDesc={setDesc} desc={desc} />
      </div>
      <div className="p-2">
        <button onClick={setPatientHandler} className="bg-green-500 p-3 whitespace-nowrap text-white rounded-md ">
          ثبت بیماری
        </button>
      </div>
    </div>
  );
}
