import { TextField } from '@mui/material';
import React from 'react';

export default function InputLastNameProfileUpdate({setLastName}) {
  return (
    <>
      <div className="w-1/2 mx-auto mt-4 px-5">
        <TextField onChange={(e)=> setLastName(e.target.value)} className="w-full" id="outlined-multiline-flexible" label="نام خانوادگی" multiline maxRows={4} />
      </div>
    </>
  );
}
