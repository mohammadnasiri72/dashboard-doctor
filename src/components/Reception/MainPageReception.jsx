import React, { useState } from 'react';
import InputTypeReception from './InputTypeReception';
import InputDoctorSelect from './InputDoctorSelect';
import InputPatientList from './InputPatientList';
import InputDate from './InputDate';
import { FaArrowRight, FaPlus } from 'react-icons/fa6';
import InputCondition from './InputCondition';
import BoxReception from './BoxReception';
import ReserveListPatient from './ReserveListPatient';
import BoxChangDate from './BoxChangDate';
import InsuranceList from './InsuranceList';
import AddInsurance from './AddInsurance';
import Swal from 'sweetalert2';
import TableInsuranceSelected from './TableInsuranceSelected';
import ServicesList from './ServicesList';
import CheckBoxDoctor from './CheckBoxDoctor';
import InputConditionReception from './InputConditionReception';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import MainRegisterPage from '../register/mainRegisterPage';
import SecoundRegisterPage from '../register/secoundRegisterPage';
import SimpleBackdrop from '../backdrop';

export default function MainPageReception() {
  const [pageStateReception, setPageStateReception] = useState(0);
  const [valReservPatient, setValReservPatient] = useState('');
  const [userSelected, setUserSelected] = useState([]);
  const [reservUser, setReservUser] = useState([]);
  const [showAddInsurance, setShowAddInsurance] = useState(false);
  const [isRegister , setIsRegister] = useState(false)
  const [registerModel , setRegisterModel] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const [insuranceListSelected, setInsuranceListSelected] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const showAddInsuranceHandler = () => {
    if (userSelected.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ابتدا بیمار را ثبت کنید',
      });
    } else {
      setShowAddInsurance(true);
    }
  };
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
            <button onClick={()=> setPageStateReception(2)} className="px-5 py-2 rounded-md text-white bg-green-500 duration-300 hover:bg-green-600">
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
            <InsuranceList
              userSelected={userSelected}
              showAddInsurance={showAddInsurance}
              insuranceListSelected={insuranceListSelected}
              setInsuranceListSelected={setInsuranceListSelected}
            />
            <div className="px-4">
              <button
                onClick={showAddInsuranceHandler}
                className="px-5 py-2 rounded-md bg-blue-500 text-white duration-300 hover:bg-blue-600 mt-4"
              >
                افزودن بیمه
              </button>
            </div>
            {/* <div className="px-4">
              <button className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600 mt-4">
                افزودن به لیست
              </button>
            </div> */}
          </div>
          <div className="mt-4">
            <TableInsuranceSelected insuranceListSelected={insuranceListSelected} />
          </div>
          <div>
            <ServicesList userSelected={userSelected} />
          </div>
          <div className='mt-10'>
            <CheckBoxDoctor />
          </div>
          <div className="mt-5 flex items-center">
            <InputConditionReception />
            <FormControlLabel className="px-10" control={<Checkbox />} label={'پرداخت شده'} />
          </div>
          <div className=" text-start mt-4" dir="rtl">
            <TextField
              // onChange={(e) => setCoverageType(e.target.value)}
              className="w-1/2 text-end"
              id="outlined-multiline-flexible"
              label="یادداشت"
              multiline
              dir="rtl"
              // value={coverageType}
              minRows={4}
            />
          </div>
          <div className='text-start mt-5'>
            <button className='px-5 py-2 bg-green-500 text-white rounded-md duration-300 hover:bg-green-600'>ثبت پذیرش</button>
          </div>
          <div
            style={{ zIndex: '1300', transform: showAddInsurance ? 'translateX(0)' : 'translateX(-100%)' }}
            className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
          >
            <AddInsurance userSelected={userSelected} setShowAddInsurance={setShowAddInsurance} />
          </div>
          <div
            style={{ zIndex: '1299', display: showAddInsurance ? 'block' : 'none' }}
            onClick={() => setShowAddInsurance(false)}
            className="fixed top-0 left-0 right-0 bottom-0 bg-[#000c]"
          />
        </div>
      )}
      {pageStateReception === 2 &&
         <div>
         { (
           <div className="px-3">
             <button
               onClick={() => setPageStateReception(1)}
               className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
             >
               <FaArrowRight />
               <span className="px-2">برگشت به صفخه قبل</span>
             </button>
           </div>
         )}
         {!isRegister && (
           <MainRegisterPage
             setIsRegister={setIsRegister}
             setRegisterModel={setRegisterModel}
             setIsLoading={setIsLoading}
           />
         )}
         {isRegister && (
           <SecoundRegisterPage
             registerModel={registerModel}
             setIsRegister={setIsRegister}
             setIsLoading={setIsLoading}
           />
         )}
         {isLoading && <SimpleBackdrop />}
       </div>
      }
    </>
  );
}
