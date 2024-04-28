import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { mainDomain } from '../../utils/mainDomain';
import AddRelativePatient from './AddRelativePatient';
import { FaChevronRight } from "react-icons/fa6";
import TableRelative from './TableRelative';
import BoxRelative from './BoxRelative';
import SimpleBackdrop from '../backdrop';


export default function RelativePatient({isOpenAccompanying  , setIsOpenAddRelative , setIsOpenAccompanying , PatientRelative}) {
    const [isLoading , setIsLoading] = useState(false)

    const addPatientRelativeHandler = ()=>{
        setIsOpenAddRelative(true)
    }
  return (
    <>
      <div
        style={{ zIndex: '1300', transform: isOpenAccompanying ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        <div className='text-start mb-3'>
        <button onClick={()=>{
            setIsOpenAccompanying(false)
          }} className='bg-slate-200 rounded-full p-3 duration-300 hover:bg-slate-300'>
            <FaChevronRight style={{transform: isOpenAccompanying?'rotate(0deg)':'rotate(180deg)'}} className='text-xl text-slate-700'/>
          </button>
        </div>
        <div>
          <button onClick={addPatientRelativeHandler} className="flex justify-center items-center bg-green-500 px-5 py-2 text-white rounded-md duration-300 hover:bg-green-600">
            <span className="px-2">افزودن همراه</span>
            <FaPlus />
          </button>
        </div>
        <div className="mt-3">
          <h3 className="text-xl font-semibold">لیست همراهان</h3>
        </div>
        {
            PatientRelative &&
            // <TableRelative PatientRelative={PatientRelative}/>
            <BoxRelative PatientRelative={PatientRelative} setIsLoading={setIsLoading}/>
        }
        {
            PatientRelative.length === 0 &&
            <p className='mt-5'>لیست همراهان خالی است</p>
        }
      </div>
      {
        isLoading && 
        <SimpleBackdrop />
      }
    </>
  );
}
