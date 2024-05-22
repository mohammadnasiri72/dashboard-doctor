import React, { useContext, useEffect, useState } from 'react';
import InputTypeVisit from '../visit/inputTypeVisit';
import SimpleBackdrop from '../backdrop';
import { Account } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';
import axios from 'axios';
import InputDateVisit from '../visit/InputDateVisit';
import BoxReceptionPatient from './BoxReceptionPatient';
import FormHistoryVisit from './FormHistoryVisit';

export default function MainPageVisitHistory() {
  const [pageStateVisitHistory, setPageStateVisitHistory] = useState(0);
  const [valType, setValType] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fromPersianDate, setFromPersianDate] = useState('');
  const [toPersianDate, setToPersianDate] = useState('');
  const [historyReception, setHistoryReception] = useState([]);
  const [receptionSelected, setReceptionSelected] = useState([]);
  const account = useContext(Account);
  

  useEffect(() => {
    axios
      .get(mainDomain + '/api/Appointment/GetList', {
        params: {
          typeId: valType,
          patientNationalId: account.nationalId,
          doctorMedicalSystemId: -1,
          fromPersianDate: fromPersianDate,
          toPersianDate: toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setHistoryReception(res.data);
      })
      .catch((err) => {});
  }, [account, valType, fromPersianDate, toPersianDate]);
  return (
    <>
      
      {
        pageStateVisitHistory===0 &&
<div>
        <div className="flex ">
          <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading} />
          <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
        </div>
        <hr className="mt-3" />
        <div className="flex flex-wrap px-5">
          {historyReception.map((e) => (
            <div key={e.appointmentId} className="lg:w-1/3 px-3 mt-3">
              <BoxReceptionPatient reception={e} setPageStateVisitHistory={setPageStateVisitHistory} setReceptionSelected={setReceptionSelected}/>
            </div>
          ))}
        </div>
      </div>
      }
      {
        pageStateVisitHistory===1 &&
        <FormHistoryVisit setPageStateVisitHistory={setPageStateVisitHistory} receptionSelected={receptionSelected} setIsLoading={setIsLoading}/>
      }

      {isLoading && <SimpleBackdrop />}
    </>
  );
}
