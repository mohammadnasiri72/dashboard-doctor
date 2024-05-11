import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';
import Swal from 'sweetalert2';

export default function ChechBoxDrug({
  valAllChechBox,
  e,
  setFlag,
  setIsLoading,
  listDrugCheched,
  setListDrugCheched,
}) {
  
  const [valChechBox, setValChechBox] = useState(false);
  
  

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    setValChechBox(valAllChechBox);
  }, [valAllChechBox]);



  const deleteDrugHandler = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('prescriptionIdList', e.prescriptionId)
    // listId.map((e)=>{
    //   data.append('prescriptionIdList', e);
    // })
    axios
      .post(mainDomain + '/api/Prescription/Delete', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
        Toast.fire({
          icon: 'success',
          text: 'حذف با موفقیت انجام شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  return (
    <>
      <div dir="ltr" className="flex justify-between rounded-lg bg-slate-50 mt-3 border text-xs">
        <div className=" flex items-center">
          <FormControlLabel
            onChange={() => {
              
              setValChechBox(!valChechBox);
              if (listDrugCheched.includes(e)) {
                setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
              } else {
                setListDrugCheched([...listDrugCheched, e]);
              }
            }}
            control={<Checkbox checked={valChechBox} />}
            label={''}
            // value={e.itemId}
          />

          <div className="px-4">
            <div className="flex items-center">
              <span className="px-1">{e.medicationName}</span>
              <span className="px-1">{e.form}</span>
              <span className="px-1">{e.frequency}</span>
              <span className="px-1">{e.dosage}</span>
            </div>
            <span className="pl-4">{e.instructions}</span>
          </div>
        </div>
        <button onClick={deleteDrugHandler} className="flex justify-center items-center pr-5">
          <FaTrashAlt className="text-lg duration-300 text-red-500" />
        </button>
      </div>
    </>
  );
}
