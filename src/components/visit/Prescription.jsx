import { Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';
import { PiNotePencilLight } from 'react-icons/pi';
import ChechBoxDrug from './ChechBoxDrug';
import NameTemplate from './NameTemplate';
import Swal from 'sweetalert2';

export default function Prescription({ patSelected, flag, setIsLoading, setFlag, templateId }) {
  const [listDrugSelected, setListDrugSelected] = useState([]);
  const [listDrugCheched, setListDrugCheched] = useState([]);
  const [valAllChechBox, setValAllChechBox] = useState(false);
  const [prescriptionsId , setPrescriptionsId] = useState([])
  const [listId , setListId] = useState([])
  console.log(listId);
  useEffect(()=>{
    const arr = []
    listDrugCheched.map((ev)=>{
      arr.push(ev.prescriptionId)
      
    })
    setListId(arr);
  },[listDrugCheched])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  

  // get list drug selected
  useEffect(()=>{
    setPrescriptionsId([])
    const arr = []
    listDrugCheched.map((e)=>{
          arr.push(e.prescriptionId)
      })
      setPrescriptionsId(arr);
      if (listDrugCheched.length === listDrugSelected.length && listDrugCheched.length !==0) {
        setValAllChechBox(true)
      }

  },[listDrugCheched]) 

  useEffect(() => {
    setListDrugCheched([])
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/Prescription/GetList', {
        params: {
          appointmentId: patSelected.appointmentId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListDrugSelected(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  const editTemplateHandler = ()=>{
    setIsLoading(true);
    const data = {
      templateId,
      prescriptionsId,
    }
    axios
    .post(mainDomain+'/api/PrescriptionTemplate/Update' , data , {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then((res)=>{
      setIsLoading(false);
      Toast.fire({
        icon: 'success',
        text: 'تمپلیت با موفقیت ویرایش شد',
      });
    })
    .catch((err)=>{
      setIsLoading(false);
      Toast.fire({
        icon: 'error',
        text: err.response ? err.response.data : 'خطای شبکه',
      });
    })
  }
  const deleteAllHandler = ()=>{
    const data = new FormData();
     listId.map((e)=>{
      data.append('prescriptionIdList', e);
    })
    axios
      .post(mainDomain + '/api/Prescription/Delete', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        // setListDrugCheched(listDrugCheched.filter((ev) => ev.prescriptionId !== e.prescriptionId));
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
  }

  
  const classBtnActiv = 'px-3 py-2 rounded-md text-white flex items-center bg-green-500 hover:bg-green-600'
  const classBtnDisActive = 'px-3 py-2 rounded-md text-white flex items-center bg-slate-300'

  return (
    <>
      <div className="text-start w-full min-h-[90vh]">
        <div className="text-center">
          <h3 className="text-xl font-semibold ">جزئیات نسخه</h3>
          <p className="text-xs">تاریخ ویزیت: {patSelected.appointmentDateFA}</p>
        </div>
        <hr className="mt-2" />
        {listDrugSelected.length > 0 && (
          <div className="bg-slate-100 rounded-lg flex justify-between" dir="ltr">
            <FormControlLabel
              onChange={() => {
                setValAllChechBox(!valAllChechBox);
                if (!valAllChechBox) {
                  setListDrugCheched(listDrugSelected);
                } else if (valAllChechBox) {
                  setListDrugCheched([]);
                }
              }}
              control={<Checkbox checked={valAllChechBox} />}
              label={'انتخاب همه'}
              // value={valAllChechBox}
            />

            <button onClick={deleteAllHandler} disabled={prescriptionsId.length === 0} className="flex justify-center items-center pr-5">
              <FaTrashAlt
                style={{ color: prescriptionsId.length === 0? 'rgb(203 213 225)' : 'rgb(239 68 68)' }}
                className="text-lg duration-300"
              />
            </button>
          </div>
        )}
        {listDrugSelected.length === 0 && <p className="text-center mt-5">نسخه خالی است</p>}

        {listDrugSelected.map((e, i) => (
          <ChechBoxDrug
            key={e.prescriptionId}
            valAllChechBox={valAllChechBox}
            e={e}
            setFlag={setFlag}
            setIsLoading={setIsLoading}
            setListDrugCheched={setListDrugCheched}
            listDrugCheched={listDrugCheched}
          />
        ))}
      </div>
      <div className="flex justify-around w-full">
        {/* <button className="flex items-center rounded-md bg-blue-500 text-white duration-300 hover:bg-blue-600 px-4 py-2">
          <span className="px-1">ذخیره به عنوان تمپلیت جدید</span>
          <CiViewList />
        </button> */}
        <NameTemplate setIsLoading={setIsLoading} listDrugCheched={listDrugCheched} />

        {templateId !== -1 && (
          <button onClick={editTemplateHandler} className={prescriptionsId.length === 0? classBtnDisActive : classBtnActiv}>
            <span className="px-1">ویرایش تمپلیت</span>
            <PiNotePencilLight />
          </button>
        )}
      </div>
    </>
  );
}
