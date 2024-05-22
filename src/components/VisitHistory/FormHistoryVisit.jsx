import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Account } from '../../pages/_app';
import { mainDomain } from '../../utils/mainDomain';
import PrescriptionHistoryVisit from './PrescriptionHistoryVisit';
import OrderHistoryVisit from './OrderHistoryVisit';
import ProblemPatientHistoryVisit from './ProblemPatientHistoryVisit';
import axios from 'axios';
import DiagnosisHistoryVisit from './DiagnosisHistoryVisit';
import AdviceHistoryVisit from './AdviceHistoryVisit';
import FilesHistoryVisit from './FilesHistoryVisit';

export default function FormHistoryVisit({ setPageStateVisitHistory, receptionSelected , setIsLoading}) {
    const [medicalRecord , setMedicalRecord] = useState([])

  const account = useContext(Account);

  // get medicalrecoard
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/MedicalRecord/GetList', {
        params: {
          appointmentId: receptionSelected.appointmentId,
          typeId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMedicalRecord(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      <div className="text-start">
        <Tooltip title="برگشت به صفحه قبل" placement="bottom">
          <IconButton
            onClick={() => {
              setPageStateVisitHistory(0);
            }}
          >
            <FaArrowRight />
          </IconButton>
        </Tooltip>
      </div>
      <div className="border rounded-lg min-h-screen w-full">
        <div className="flex items-center">
          <div className="p-3">
            <img className="w-10 h-10 rounded-full" src={mainDomain + account.avatar} alt="" />
          </div>
          <div className="text-start">
            <p>
              {account.firstName} {account.lastName}
            </p>
            <p className="text-sm">{account.nationalId}</p>
          </div>
        </div>
        <hr className="mt-2" />
        <div className="flex">
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg">
            <ProblemPatientHistoryVisit  medicalRecord={medicalRecord}/>
              
            </div>
          </div>
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg">
            <PrescriptionHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading}/>
              
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg p-2">
            <DiagnosisHistoryVisit medicalRecord={medicalRecord}/>
            </div>
          </div>
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg p-2">
            <OrderHistoryVisit receptionSelected={receptionSelected} setIsLoading={setIsLoading}/>
              
            </div>
          </div>
          
        </div>
        <div className="flex">
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg p-2">
              <AdviceHistoryVisit medicalRecord={medicalRecord}/>
            </div>
          </div>
          <div className="p-2 w-1/2 flex">
            <div className="w-full border rounded-lg p-2">
              <FilesHistoryVisit medicalRecord={medicalRecord} receptionSelected={receptionSelected}/>
            </div>
          </div>
          
          
        </div>
      </div>
    </>
  );
}
