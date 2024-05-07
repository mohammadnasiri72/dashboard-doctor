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

export default function MainPageVisit() {
  const [pageStateVisit, setPageStateVisit] = useState(0);
  const [valType, setValType] = useState(1);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [patList, setPatList] = useState([]);
  const [patSelected, setPatSelected] = useState([]);
  const [refreshPatList, setRefreshPatList] = useState(false);
  const [alignment, setAlignment] = useState('');
  useEffect(() => {
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
        setPatList(res.data);
      })
      .catch((err) => {});
  }, [toPersianDate, fromPersianDate, valType, refreshPatList]);

  return (
    <>
      {pageStateVisit === 0 && (
        <div>
          <div className="flex">
            <InputTypeVisit valType={valType} setValType={setValType} />
            <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="lg:w-1/4 w-full">
              <ShowPatient patList={patList} setRefreshPatList={setRefreshPatList} setPatSelected={setPatSelected} />
            </div>
            <div className="lg:w-3/4 w-full">
              <div className="  ">
                <TablePatientDoing patSelected={patSelected} valType={valType} setPageStateVisit={setPageStateVisit} />
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
            <div>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={(event, newEvent) => setAlignment(newEvent)}
                  aria-label="Platform"
              >
                <ToggleButton value="back">
                  <span className="text-red-500">back</span>
                </ToggleButton>
                <ToggleButton value="done">
                  <span className="text-green-500">done</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <SecoundPageVisit patSelected={patSelected}/>
        </div>
      )}
    </>
  );
}
