import React, { useContext } from 'react';
import { useState } from 'react';
import InputNamePatient from './InputNamePatient';
import { FaAngleLeft } from 'react-icons/fa6';
import InputAge from './InputAge';
import SwitchPatientActive from './SwitchPatientActive';
import MedicineList from './MedicineList';
import DescriptionPatient from './DescriptionPatient';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import { Change } from '../../pages/_app';
import Swal from 'sweetalert2';

export default function AddPatientPopUp({ isOpenAddPatient, setIsOpenAddPatient }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [isPatientActive, setIsPatientActive] = useState(true);
  const [medicationIdList, setMedicationIdList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valueMedicine , setValueMedicine] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const setChange = useContext(Change);
  const setPatientHandler = () => {
    setIsLoading(true);
    const dataPatient = {
      title: patientName,
      age,
      statusId: isPatientActive ? 1 : 0,
      description: desc,
      medicationIdList: medicationIdList,
    };
    axios
      .post(mainDomain + '/api/PatientHistory/Add', dataPatient, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setChange((e) => !e);
        setIsOpenAddPatient(!isOpenAddPatient)
        setPatientName('')
        setAge('')
        setIsPatientActive(true)
        setDesc('')
        setValueMedicine([])
        Toast.fire({
          icon: 'success',
          text: 'بیماری با موفقیت ثبت شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        Toast.fire({
          icon: 'error',
          text: err.response.data,
        });
      });
  };
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenAddPatient ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg"
      >
        <h3 className="text-2xl font-semibold ">افزودن بیماری</h3>
        <FaAngleLeft
          onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
          className="absolute right-5 top-5 text-4xl hover:scale-125 cursor-pointer duration-300 rounded-full bg-slate-300 p-2"
        />
        <div className=" mt-6">
          <InputNamePatient patientName={patientName} setPatientName={setPatientName} />
        </div>
        <div className=" mt-6">
          <InputAge setAge={setAge} age={age} />
        </div>
        <div className="mt-6">
          <SwitchPatientActive setIsPatientActive={setIsPatientActive} isPatientActive={isPatientActive} />
        </div>
        <div className="mt-6">
          <MedicineList isPatientActive={isPatientActive} setMedicationIdList={setMedicationIdList} valueMedicine={valueMedicine} setValueMedicine={setValueMedicine}/>
        </div>
        <div className="mt-6">
          <DescriptionPatient setDesc={setDesc} desc={desc} />
        </div>
        <div className="p-2">
          <button onClick={setPatientHandler} className="bg-green-500 p-3 whitespace-nowrap text-white rounded-md ">
            ثبت بیماری
          </button>
        </div>
      </div>
      {isOpenAddPatient && (
        <div
          style={{ zIndex: '1299' }}
          onClick={() => setIsOpenAddPatient(!isOpenAddPatient)}
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#000c]"
        />
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
