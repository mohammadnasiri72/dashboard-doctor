import React, { useState } from 'react';
import InputTypeReception from './InputTypeReception';
import InputDoctorSelect from './InputDoctorSelect';
import InputPatientList from './InputPatientList';
import InputDate from './InputDate';
import { FaPlus } from 'react-icons/fa6';
import InputCondition from './InputCondition';
import BoxReception from './BoxReception';
import ReserveListPatient from './ReserveListPatient';
import BoxChangDate from './BoxChangDate';
import InsuranceList from './InsuranceList';

export default function MainPageReception() {
  const [pageStateReception, setPageStateReception] = useState(0);
  const [valReservPatient, setValReservPatient] = useState('');
  const [userSelected, setUserSelected] = useState([]);
  const [reservUser, setReservUser] = useState([]);
  return (
    <>
      {pageStateReception === 0 && (
        <div>
          <div className="flex justify-start">
            <InputTypeReception />
            <InputCondition />
            <InputDoctorSelect pageStateReception={pageStateReception} />
            <InputPatientList pageStateReception={pageStateReception} />
            <InputDate />
            <div className="px-5 py-2 rounded-md text-white bg-green-500 duration-300 hover:bg-green-600 flex items-center">
              <button onClick={() => setPageStateReception(1)} className=" flex items-center">
                <span className="px-2 whitespace-nowrap">پذیرش جدید</span>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="mt-5">
            <BoxReception />
          </div>
        </div>
      )}
      {pageStateReception === 1 && (
        <div>
          <div className="text-start mb-5">
            <button
              onClick={() => setPageStateReception(0)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-blue-600"
            >
              برگشت به صفحه قبل
            </button>
          </div>
          <div className="flex justify-start">
            <InputTypeReception />
            <InputDoctorSelect pageStateReception={pageStateReception} />
            <InputPatientList pageStateReception={pageStateReception} setUserSelected={setUserSelected} />
            <button className="px-5 py-2 rounded-md text-white bg-green-500 duration-300 hover:bg-green-600">
              <FaPlus />
            </button>
          </div>
          <div className="flex justify-start mt-5">
            <ReserveListPatient
              valReservPatient={valReservPatient}
              setValReservPatient={setValReservPatient}
              userSelected={userSelected}
              reservUser={reservUser}
              setReservUser={setReservUser}
            />
            <BoxChangDate valReservPatient={valReservPatient} reservUser={reservUser} />
          </div>
          <div className="flex items-center">
            <InsuranceList userSelected={userSelected} />
            <div className='px-4'>
              <button className="px-5 py-2 rounded-md bg-blue-500 text-white duration-300 hover:bg-blue-600 mt-4">
                افزودن بیمه
              </button>
            </div>
            <div className='px-4'>
              <button className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600 mt-4">
                افزودن به لیست
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
