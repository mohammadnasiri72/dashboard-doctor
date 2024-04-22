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
          label="توضیحات(درصورت نبود داروی مورد استفاده در لیست آن را اینجا وارد کنید)"
          multiline
          dir="rtl"
          value={desc}
          maxRows={4}
        />
      </div>
    </>
  );
}
