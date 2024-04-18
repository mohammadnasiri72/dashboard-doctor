import { TextField } from '@mui/material';
import React from 'react';

export default function InputTelUpdateProfile({ setTel , tel}) {
  return (
    <>
      <div className="w-1/2 mx-auto mt-6 px-5">
        <TextField
          onChange={(e) => setTel(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="تلفن ثابت(اختیاری)"
          multiline
          value={tel}
          maxRows={4}
        />
      </div>
    </>
  );
}
