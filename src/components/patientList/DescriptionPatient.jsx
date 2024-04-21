import { TextField } from '@mui/material';
import React from 'react';

export default function DescriptionPatient({desc , setDesc}) {
  return (
    <>
      <div className=" text-start" dir="rtl">
        <TextField
          onChange={(e) => setDesc(e.target.value)}
          className="w-full text-end"
          id="outlined-multiline-flexible"
          label="توضیحات..."
          multiline
          dir="rtl"
          value={desc}
          maxRows={4}
        />
      </div>
    </>
  );
}
