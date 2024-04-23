import React from 'react';
import TablePatient from './TablePatient';
import AddPatientPopUp from './AddPatientPopUp';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";

export default function PatientList() {
  const [isOpenAddPatient, setIsOpenAddPatient] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState(true);
  const [medicationIdList, setMedicationIdList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valueMedicine, setValueMedicine] = useState([]);
  
  return (
    <div>
      {/* <h2 className="text-start text-2xl font-semibold">لیست بیماریهای من</h2> */}
      <div className="w-11/12 border rounded-md">
        <h3 className="bg-[#f4f6f8] rounded-t-md font-semibold text-xl text-gray-600 p-2">لیست بیماریهای من</h3>
        <div className="text-start p-3">
          <button
            onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
            className="px-5 py-2 bg-green-500 rounded-md hover:bg-green-600 duration-300 text-white flex justify-center items-center"
          >
            <span className='px-2'>ثبت بیماری جدید</span>
            <FaPlus />
          </button>
        </div>
       
        <div>
          <TablePatient isOpenAddPatient={isOpenAddPatient} />
        </div>
      </div>
      <AddPatientPopUp
        isOpenAddPatient={isOpenAddPatient}
        setIsOpenAddPatient={setIsOpenAddPatient}
        patientName={patientName}
        setPatientName={setPatientName}
        age={age}
        setAge={setAge}
        isPatientActive={isPatientActive}
        setIsPatientActive={setIsPatientActive}
        medicationIdList={medicationIdList}
        setMedicationIdList={setMedicationIdList}
        desc={desc}
        setDesc={setDesc}
        valueMedicine={valueMedicine}
        setValueMedicine={setValueMedicine}
      />
    </div>
  );
}
