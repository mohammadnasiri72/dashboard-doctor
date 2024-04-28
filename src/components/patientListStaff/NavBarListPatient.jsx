import { TextField } from '@mui/material';
import React from 'react';
import { FaPlus } from "react-icons/fa6";


export default function NavBarListPatient({setRegisterPatient}) {
  return (
    <>
      <div className="flex justify-between w-5/6 mx-auto">
        <TextField
          //   onChange={(e) => setEmail(e.target.value)}
          //   value={email}
          className="w-1/3"
          id="outlined-multiline-flexible"
          label={'کد ملی / نام / نام خانوادگی'}
          multiline
          maxRows={4}
          InputProps={{ className: 'textfield-style' }}
        />
        <button onClick={()=> setRegisterPatient(true)} className="flex justify-center items-center bg-green-500 px-5  rounded-md duration-300 hover:bg-green-600 text-white">
          <span className="px-1">بیمار جدید</span>
          <FaPlus />
        </button>
      </div>
    </>
  );
}
