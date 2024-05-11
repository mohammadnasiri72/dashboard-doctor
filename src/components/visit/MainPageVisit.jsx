import React, { useState } from 'react';
import InputTypeVisit from './inputTypeVisit';
import ShowPatient from './ShowPatient';
import TablePatientDoing from './TablePatientDoing';
import InputDateVisit from './InputDateVisit';
import { useEffect } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import SecoundPageVisit from './SecoundPageVisit';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SimpleBackdrop from '../backdrop';
import ShowNotPopUp from './ShowNotPopUp';
import { HiPencil } from "react-icons/hi2";
import CheckBoxDoctor from '../Reception/CheckBoxDoctor';

export default function MainPageVisit() {
  const [pageStateVisit, setPageStateVisit] = useState(0);
  const [valType, setValType] = useState(1);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [patList, setPatList] = useState([]);
  const [patSelected, setPatSelected] = useState([]);
  const [refreshPatList, setRefreshPatList] = useState(false);
  const [alignment, setAlignment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNote , setShowNote] = useState(false)
  const [medicalRecord , setMedicalRecord] = useState([])
  const [valCondition , setValCondition] = useState([])
  const disabledChechBox = true

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(mainDomain + '/api/Appointment/GetList', {
        params: {
          typeId: valType,
          // patientNationalId: userSelected.nationalId,
          doctorMedicalSystemId: -1,
          fromPersianDate,
          toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false)
        setPatList(res.data);
      })
      .catch((err) => {
        setIsLoading(false)
      });
  }, [toPersianDate, fromPersianDate, valType, refreshPatList]);

// get medicalRecord
  useEffect(()=>{
    if (patSelected.appointmentId) {
      axios
      .get(mainDomain + '/api/MedicalRecord/GetList', {
        params: {
          appointmentId: patSelected.appointmentId,
          typeId: 1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setMedicalRecord(res.data);
      })
      .catch((err) => {});
      
    }
  },[patSelected])
  return (
    <>
      {pageStateVisit === 0 && (
        <div>
          <div className="flex">
            <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading}/>
            <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="lg:w-1/4 w-full">
              <ShowPatient
                patList={patList}
                setRefreshPatList={setRefreshPatList}
                setPatSelected={setPatSelected}
                patSelected={patSelected}
                pageStateVisit={pageStateVisit}
              />
            </div>
            <div className="lg:w-3/4 w-full">
              <div className="">
                <TablePatientDoing
                  patSelected={patSelected}
                  valType={valType}
                  setPageStateVisit={setPageStateVisit}
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {pageStateVisit === 1 && (
        <div>
          <div className="text-start mb-5 flex justify-between">
            <button
              onClick={() => setPageStateVisit(0)}
              className="bg-blue-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-blue-600"
            >
              برگشت به صفحه قبل
            </button>
            <CheckBoxDoctor
            disabledChechBox={disabledChechBox}
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecord}
            />
            <div className='flex'>
              <button onClick={()=> setShowNote(true)} className='px-3 py-2 rounded-md bg-slate-500 text-white duration-300 hover:bg-slate-600 flex justify-center items-center'>
                <HiPencil />
                <span className='px-2'>note</span>
                </button>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={(event, newEvent) => setAlignment(newEvent)}
                aria-label="Platform"
              >
                {/* <ToggleButton onClick={()=> setShowNote(true)} value="note">
                  <span className="text-slate-500">note</span>
                </ToggleButton> */}
                <ToggleButton value="back">
                  <span className="text-red-500">back</span>
                </ToggleButton>
                <ToggleButton value="done">
                  <span className="text-green-500">done</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <SecoundPageVisit patSelected={patSelected} setIsLoading={setIsLoading}/>
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
      <ShowNotPopUp showNote={showNote} setShowNote={setShowNote}/>
      
    </>
  );
}
