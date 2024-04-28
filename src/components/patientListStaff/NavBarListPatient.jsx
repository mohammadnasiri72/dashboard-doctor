import { TextField } from '@mui/material';
import React from 'react';
import { FaPlus } from "react-icons/fa6";


export default function NavBarListPatient({setPageState}) {
  return (
    <>
    <div className="flex justify-between w-5/6 mx-auto">
         <div className=" px-5">
        <TextField
          // onChange={(e) => setDescRelative(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="کدملی / نام / نام خانوادگی"
          multiline
          // value={descRelative}
          minRows={1}
        />
      </div>
        <button onClick={()=> setPageState(2)} className="flex justify-center items-center bg-green-500 px-5  rounded-md duration-300 hover:bg-green-600 text-white">
          <span className="px-1">بیمار جدید</span>
          <FaPlus />
        </button>
      </div>
    </>
  );
}
