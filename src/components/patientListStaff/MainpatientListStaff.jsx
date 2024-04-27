import React from 'react';
import NavBarListPatient from './NavBarListPatient';
import TableListPatient from './TableListPatient';
import { useState } from 'react';
import Page from '../Page';
import { Typography } from '@mui/material';
import UploaderImage from '../updateProfile/uploaderImage';
import FormUpdateProfile from '../updateProfile/formUpdateProfile';
import { FaArrowRight } from "react-icons/fa";

export default function MainpatientListStaff() {
  const [editState, setEditState] = useState(false);
  const [accountUpdate , setAccountUpdate] = useState([])
  return (
    <>
      {!editState && (
        <div>
          <NavBarListPatient />
          <div className="mt-5 w-11/12 mx-auto">
            <TableListPatient setEditState={setEditState} setAccountUpdate={setAccountUpdate}/>
          </div>
        </div>
      )}
      {editState && (
        <div>
          <div className='flex items-center'>
            {/* <button onClick={()=> setEditState(false)} className='bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center'>
                <FaArrowRight />
                <span className='px-2'>برگشت به صفخه قبل</span>
            </button> */}
          <Typography className="text-start px-3" variant="h3" component="h1" paragraph>
            ویرایش پروفایل
          </Typography>
          </div>
          <div className="flex justify-center flex-wrap">
            <div className="lg:w-1/3 w-full p-4">
              <UploaderImage accountUpdate={accountUpdate} setEditState={setEditState}/>
            </div>
            <FormUpdateProfile accountUpdate={accountUpdate} setEditState={setEditState}/>
          </div>
        </div>
      )}
    </>
  );
}
