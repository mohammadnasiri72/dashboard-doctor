import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import MyDocumentSend from '../Counseling/MyDocument';
import { FaImage } from 'react-icons/fa';
import { RiFileVideoLine } from 'react-icons/ri';

export default function FilesHistoryVisit({ medicalRecord, receptionSelected }) {
  console.log(medicalRecord.filter((e) => e.typeId === 6));
  //   console.log(receptionSelected);

  return (
    <>
      <h3>فایلهای ارسال شده</h3>
      {medicalRecord
        .filter((e) => e.typeId === 6)
        .map((e, i) => (
          <div key={e.id} className="px-3">
            <div className="flex items-center rounded-lg shadow-md duration-300 hover:shadow-lg hover:bg-slate-50 mt-2 p-2">
              <div className="px-1">
                <TextField
                  disabled
                  className=""
                  id="outlined-multiline-flexible"
                  label="نوع فایل"
                  multiline
                  dir="rtl"
                  value={e.medicalItemName}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{i + 1}_</InputAdornment>,
                  }}
                />
              </div>
              <div className="px-1 w-full">
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
              <div>
                {e.medicalItemName === 'تصویر' && (
                  <Tooltip title="مشاهده عکس">
                    <IconButton>
                      <FaImage className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                    </IconButton>
                  </Tooltip>
                )}
                {e.medicalItemName === 'ویدئو' && (
                  <Tooltip title="مشاهده ویدئو">
                    <IconButton>
                      <RiFileVideoLine className="text-2xl hover:text-green-700 cursor-pointer duration-300" />
                    </IconButton>
                  </Tooltip>
                )}
                {/* <MyDocumentSend apointmentId={receptionSelected.appointmentId} flagUpload={flagUpload} setFlagUpload={setFlagUpload} /> */}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
