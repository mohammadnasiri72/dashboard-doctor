import { TextField } from '@mui/material';
import React from 'react';

export default function InputNameUpdateProfile({setName}) {
  return (
    <>
      <div className="w-1/2 mx-auto mt-4 px-5">
        <TextField onChange={(e)=> setName(e.target.value)} className="w-full" id="outlined-multiline-flexible" label="نام" multiline maxRows={4} />
      </div>
    </>
  );
}
