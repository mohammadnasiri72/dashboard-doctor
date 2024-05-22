import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { InputAdornment, TextField } from '@mui/material';

export default function DiagnosisHistoryVisit({ medicalRecord }) {
//   console.log(medicalRecord.filter((e) => e.typeId === 6));

  return (
    <>
      <h3>تشخیص پزشک</h3>
      {medicalRecord
        .filter((e) => e.typeId === 3)
        .map((e, i) => (
          <div key={e.id} className="px-3">
            <div className="flex items-center rounded-lg shadow-md duration-300 hover:shadow-lg hover:bg-slate-50 mt-2 p-2">
              <div className='px-1'>
              <TextField
                disabled
                className=""
                id="outlined-multiline-flexible"
                label="تشخیص پزشک"
                multiline
                dir="rtl"
                value={e.medicalItemName}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{i + 1}_</InputAdornment>,
                }}
              />
              </div>
              <div className='px-1 w-full'>
              <TextField
                disabled
                className="w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={e.description}
              />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
