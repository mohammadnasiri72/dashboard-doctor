import React from 'react';
import PatientList from '../patientList/PatientList';

export default function PatientListVisit({setPageNumber}) {
  return (
    <>
      <div>
        <PatientList />
        <div className="flex justify-between mt-5 px-4 w-11/12">
          <button onClick={()=> setPageNumber(1)} className="px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600">
            برگشت به صفحه قبل
          </button>
          <button onClick={()=> setPageNumber(3)} className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600">
            مرحله بعد
          </button>
        </div>
      </div>
    </>
  );
}
