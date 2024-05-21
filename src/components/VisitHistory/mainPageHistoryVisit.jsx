import React, { useContext, useEffect, useState } from 'react'
import InputTypeVisit from '../visit/inputTypeVisit'
import SimpleBackdrop from '../backdrop'
import { Account } from '../../pages/_app'
import { mainDomain } from '../../utils/mainDomain'
import axios from 'axios'
import InputDateVisit from '../visit/InputDateVisit'

export default function MainPageVisitHistory() {
  const[valType , setValType] = useState(1)
  const[isLoading , setIsLoading] = useState(false)
  const[fromPersianDate , setFromPersianDate] = useState('')
  const[toPersianDate , setToPersianDate] = useState('')
  const account = useContext(Account);
  console.log(account.nationalId);


  useEffect(()=>{
    axios
    .get(mainDomain + '/api/Appointment/GetList', {
      params: {
        typeId: valType,
        patientNationalId: account.nationalId,
        doctorMedicalSystemId: -1,
        fromPersianDate: '',
        toPersianDate: '',
        statusId: -1,
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{

    })
  },[account , valType])
  return (
    <>
    <div className='flex '>
    <InputTypeVisit valType={valType} setValType={setValType} setIsLoading={setIsLoading}/>
    <InputDateVisit setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
    </div>
    <hr className='mt-3'/>

    {
      isLoading &&
      <SimpleBackdrop/>
    }
    </>
  )
}
