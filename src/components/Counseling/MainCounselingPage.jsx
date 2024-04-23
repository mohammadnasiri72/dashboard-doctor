import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import SelectServices from './SelectServices';
import PatientListVisit from './PatientListVisit';
import ProblemPatient from './ProblemPatient';
import UploadDocuments from './UploadDocuments';

export default function MainCounselingPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [valDoctor, setValDoctor] = useState([]);
  const [service, setService] = useState([]);
  const setRequestHandler = () => {
    setPageNumber(1);
  };
  return (
    <>
      {pageNumber === 0 ? (
        <div className="w-11/12 border rounded-md">
          <h3 className="bg-[#f4f6f8] rounded-t-md font-semibold text-xl text-gray-600 p-2">لیست درخواست های من</h3>
          <div className="text-start p-3">
            <button
              onClick={setRequestHandler}
              className="px-5 py-2 bg-green-500 rounded-md hover:bg-green-600 duration-300 text-white flex justify-center items-center"
            >
              <span className="px-2">ثبت درخواست جدید</span>
              <FaPlus />
            </button>
          </div>
          لیست درخواست های شما خالی است
        </div>
      ) : pageNumber === 1 ? (
        <SelectServices
          setPageNumber={setPageNumber}
          valDoctor={valDoctor}
          setValDoctor={setValDoctor}
          service={service}
          setService={setService}
        />
      ) : pageNumber === 2 ? (
        <PatientListVisit setPageNumber={setPageNumber} />
      ) : pageNumber === 3 ? (
        <ProblemPatient setPageNumber={setPageNumber} valDoctor={valDoctor} service={service}/>
      ) : (
        <UploadDocuments setPageNumber={setPageNumber} />
      )}
    </>
  );
}
