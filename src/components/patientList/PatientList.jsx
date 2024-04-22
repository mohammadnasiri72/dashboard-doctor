import React from 'react';
import AddPatient from './AddPatient';
import TablePatient from './TablePatient';
import AddPatientPopUp from './AddPatientPopUp';
import { useState } from 'react';

export default function PatientList() {
  const [isOpenAddPatient , setIsOpenAddPatient] = useState(false)
  return (
    <div>
      <h2 className="text-start text-2xl font-semibold">لیست بیماریهای من</h2>
      <div className="w-11/12 border rounded-md">
        <h3 className="bg-slate-300 rounded-t-md font-semibold text-xl text-gray-600 p-2">لیست بیماریهای من</h3>
        <div className='text-start p-3'>
          <button onClick={()=> setIsOpenAddPatient(!isOpenAddPatient)} className="px-5 py-2 bg-green-500 rounded-md hover:bg-green-600 duration-300 text-white">
            ثبت بیماری جدید
          </button>
        </div>
        <div className="">{/* <AddPatient /> */}</div>
        <hr />
        <div>
          <TablePatient isOpenAddPatient={isOpenAddPatient}/>
        </div>
      </div>
      <AddPatientPopUp isOpenAddPatient={isOpenAddPatient} setIsOpenAddPatient={setIsOpenAddPatient}/>
    </div>
  );
}
