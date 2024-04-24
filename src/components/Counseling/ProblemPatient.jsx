import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import Swal from 'sweetalert2';
import { Account } from '../../pages/_app';

export default function ProblemPatient({ setPageNumber, valDoctor , service , setApointmentId}) {
  const [problemList, setProblemList] = useState([]);
  const [desc, setDesc] = useState('');
  const [valProblem, setValProblem] = useState([]);
  const [complaints , setComplaints] = useState([]);
  
  const account = useContext(Account);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    axios
      .get(mainDomain + '/api/BasicInfo/PatientComplaints/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setProblemList(res.data);
      })
      .catch((err) => {});
  }, []);
  const goToNext = () => {
    if (desc.length === 0 && valProblem.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا مشخصات خواسته شده را وارد کنید',
      });
    } else {
      const data = {
        patientUserId: account.userId,
        doctorId: valDoctor,
        notes: desc,
        serviceList:[
            {
                appointmentId:0,
                medicalServiceId:service,
                number:1
            }
        ],
        complaints,
      };
      axios
      .post(mainDomain + '/api/AppointmentCounseling/Add', data , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setApointmentId(res.data);
        setPageNumber(4);
        Toast.fire({
          icon: 'success',
          text: 'مشخصات شما با موفقیت ثبت شد',
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          text: err.response.data,
        });
      });
      
    }
  };
  const changProblem = (event, newValue) => {
    setValProblem(newValue);
    if (newValue.length>0) {
      let arr = []
      newValue.map((e)=>{
        let complaintsChild =
        {
          appointmentId: 0,
          typeId: 2,
          medicalItemId: e.itemId,
        }
        arr.push(complaintsChild)
      })
      setComplaints(arr)
    }
  };
  return (
    <>
      <div className="w-1/2 mx-auto">
        <h2 className="text-start mb-5 text-xl">لطفا مشکل خود را وارد کنید</h2>
        <div className="px-4 w-full" dir="rtl">
          <Stack spacing={3}>
            <Autocomplete
              value={valProblem}
              onChange={(event, newValue) => {
                changProblem(event, newValue);
              }}
              multiple
              id="tags-outlined"
              options={problemList}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="مشکلات بیمار" placeholder="انتخاب عارضه" />}
            />
          </Stack>
        </div>
        <div className="mt-10 px-5">
          <TextField
            onChange={(e) => setDesc(e.target.value)}
            className="w-full"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            minRows={3}
            value={desc}
            maxRows={8}
          />
        </div>
        <div className="flex justify-between mt-5 px-4">
          <button
            onClick={() => setPageNumber(2)}
            className="px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600"
          >
            برگشت به صفحه قبل
          </button>
          <button
            onClick={goToNext}
            className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600"
          >
            مرحله بعد
          </button>
        </div>
      </div>
    </>
  );
}
