import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import TableDiagnosis from './TableDiagnosis';
import TableAdvice from './TableAdvice';
import TableProblemPatient from './TableProblemPatient';
import Swal from 'sweetalert2';
import AddNewItem from './AddNewItem';

export default function DiagnosisPatient({ patSelected, setIsLoading }) {
  const [alignment, setAlignment] = useState('Problem');
  const [descDiagnosis, setDescDiagnosis] = useState('');
  const [descAdvice, setDescAdvice] = useState('');
  const [descProblem, setDescProblem] = useState('');
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [valDiagnosis, setValDiagnosis] = useState([]);
  const [valProblem, setValProblem] = useState([]);
  const [problemList, setProblemList] = useState([]);
  const [adviceList, setAdviceList] = useState([]);
  const [valAdvice, setValAdvice] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [flag, setFlag] = useState(false);
  // console.log(medicalRecord);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  // get list problem patient
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/BasicInfo/PatientComplaints/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setProblemList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  // get list diagnosis
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/BasicInfo/DoctorDiagnoses/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDiagnosisList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  // get list Advice
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/BasicInfo/DoctorRecommendations/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setAdviceList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  // get medicalrecoard
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/MedicalRecord/GetList', {
        params: {
          appointmentId: patSelected.appointmentId,
          typeId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMedicalRecord(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [flag]);

  
  const setItemHandler = () => {
    setIsLoading(true);
    const data = {
      appointmentId: patSelected.appointmentId,
      typeId: alignment === 'Problem'? 2: alignment === 'Diagnosis'? 3 : 4,
      medicalItemId: alignment === 'Problem'? valProblem.itemId : alignment === 'Diagnosis'? valDiagnosis.itemId : valAdvice.itemId,
      description: alignment === 'Problem'? descProblem : alignment === 'Diagnosis'? descDiagnosis : descAdvice,
    };
    axios
      .post(mainDomain + '/api/MedicalRecord/Add', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setFlag((e) => !e);
        setIsLoading(false);
        setDescProblem('');
        setDescDiagnosis('')
        setDescAdvice('')
        setValProblem([]);
        setValDiagnosis([])
        setValAdvice([])
        Toast.fire({
          icon: 'success',
          text: 'با موفقیت ثبت شد',
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
  const setDiagnosisHandler = ()=>{
setIsLoading(true);
    const data = {
      appointmentId: patSelected.appointmentId,
      typeId: 3,
      medicalItemId: valDiagnosis,
      description: descDiagnosis,
    };
    axios
      .post(mainDomain + '/api/MedicalRecord/Add', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFlag((e) => !e);
        setDescDiagnosis('');
        setValDiagnosis([]);
        Toast.fire({
          icon: 'success',
          text: 'مشکل با موفقیت ثبت شد',
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
  return (
    <>
      {/* <div className="flex">
        <div className="w-80 pr-4" dir="rtl">
          <Stack spacing={3}>
            <Autocomplete
              value={valProblem}
              onChange={(event, newValue) => {
                changProblem(event, newValue);
              }}
              // multiple
              id="tags-outlined"
              options={problemList}
              getOptionLabel={(option) => (option.name ? option.name : '')}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="مشکلات بیمار" placeholder="انتخاب عارضه" />}
            />
          </Stack>
        </div>
        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => setDescProblem(e.target.value)}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={descProblem}
          />
        </div>
        <div className="pr-8 flex items-center">
          <button
            onClick={setProblemHandler}
            className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center"
          >
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableProblemPatient
        medicalRecord={medicalRecord.filter((e) => e.typeId === 2)}
        setIsLoading={setIsLoading}
        setFlag={setFlag}
      />
      <div className="flex mt-5">
        <div className="pr-4">
          <AddNewItem />
        </div>
        <div className="w-80 pr-4">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              تشخیص ها
            </InputLabel>
            <Select
              onChange={(e) => setValDiagnosis(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="تشخیص ها"
              color="primary"
              value={valDiagnosis}
            >
              {diagnosisList.map((e) => (
                <MenuItem key={e.itemId} value={e.itemId}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => setDescDiagnosis(e.target.value)}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={descDiagnosis}
          />
        </div>
        <div className="pr-8 flex items-center">
          <button onClick={setDiagnosisHandler} className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableDiagnosis  medicalRecord={medicalRecord.filter((e) => e.typeId === 3)} setIsLoading={setIsLoading} setFlag={setFlag}/>
      <div className="flex mt-5">
      <div className="pr-4">
          <AddNewItem />
        </div>
        <div className="w-80 pr-4">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              توصیه ها
            </InputLabel>
            <Select
              // onChange={(e) => setConditionVal(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="توصیه ها"
              color="primary"
              // value={conditionVal}
            >
              <MenuItem value={-1}>
                <span>همه</span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => setDescAdvice(e.target.value)}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={descAdvice}
            //   minRows={2}
          />
        </div>
        <div className="pr-8 flex items-center">
          <button className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableAdvice /> */}
     <div className='text-start -mt-5'>
     <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(event , newEvent)=> {
        if (newEvent !== null) {
          setAlignment(newEvent)
        }
      }}
      aria-label="Platform"
    >
      <ToggleButton value="Problem">مشکل بیمار</ToggleButton>
      <ToggleButton value="Diagnosis">تشخیص</ToggleButton>
      <ToggleButton value="Advice">توصیه</ToggleButton>
    </ToggleButtonGroup>
     </div>
     {
      <div>
        <div className="flex mt-5">
        <div className="pr-4">
          <AddNewItem />
        </div>
        <div className="w-80 pr-4" dir="rtl">
          <Stack spacing={3}>
            <Autocomplete
              value={alignment === 'Problem'? valProblem : alignment === 'Diagnosis'? valDiagnosis: valAdvice}
              onChange={(event, newValue) => {
                alignment === 'Problem'? setValProblem(newValue):
                alignment === 'Diagnosis'? setValDiagnosis(newValue):
                setValAdvice(newValue)
              }}
              id="tags-outlined"
              options={alignment === 'Problem'? problemList: alignment === 'Diagnosis'? diagnosisList : adviceList}
              getOptionLabel={(option) => (option.name ? option.name : '')}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params}
              label={alignment === 'Problem'? "مشکلات بیمار": alignment === 'Diagnosis'? 'تشخیص ها' : 'توصیه ها'}
              placeholder={alignment === 'Problem'? "انتخاب عارضه" : alignment === 'Diagnosis'? 'انتخاب تشخیص' : 'انتخاب توصیه'} />}
            />
          </Stack>
        </div>
        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => {
              alignment === 'Problem'?
              setDescProblem(e.target.value):
              alignment === 'Diagnosis'?
              setDescDiagnosis(e.target.value):
              setDescAdvice(e.target.value)
            }}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={
              alignment === 'Problem'? descProblem:
              alignment === 'Diagnosis'? descDiagnosis:
              descAdvice
          }
          />
        </div>
        <div className="pr-8 flex items-center">
          <button
            onClick={setItemHandler}
            className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center"
          >
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableProblemPatient
        medicalRecord={medicalRecord}
        setIsLoading={setIsLoading}
        setFlag={setFlag}
        alignment={alignment}
      />
      </div>
     }
     {/* {
      alignment=== 'Diagnosis' &&
      <div>
        <div className="flex mt-5">
        <div className="pr-4">
          <AddNewItem />
        </div>
        <div className="w-80 pr-4">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              تشخیص ها
            </InputLabel>
            <Select
              onChange={(e) => setValDiagnosis(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="تشخیص ها"
              color="primary"
              value={valDiagnosis}
            >
              {diagnosisList.map((e) => (
                <MenuItem key={e.itemId} value={e.itemId}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => setDescDiagnosis(e.target.value)}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={descDiagnosis}
          />
        </div>
        <div className="pr-8 flex items-center">
          <button onClick={setDiagnosisHandler} className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableDiagnosis  medicalRecord={medicalRecord.filter((e) => e.typeId === 3)} setIsLoading={setIsLoading} setFlag={setFlag}/>
      </div>
     }
     {
      alignment=== 'Advice' &&
      <div>
        <div className="flex mt-5">
      <div className="pr-4">
          <AddNewItem />
        </div>
        <div className="w-80 pr-4">
          <FormControl color="primary" className="w-full">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              توصیه ها
            </InputLabel>
            <Select
              // onChange={(e) => setConditionVal(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="توصیه ها"
              color="primary"
              // value={conditionVal}
            >
              <MenuItem value={-1}>
                <span>همه</span>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-80 text-start pr-4" dir="rtl">
          <TextField
            onChange={(e) => setDescAdvice(e.target.value)}
            className="w-80 text-end"
            id="outlined-multiline-flexible"
            label="توضیحات"
            multiline
            dir="rtl"
            value={descAdvice}
            //   minRows={2}
          />
        </div>
        <div className="pr-8 flex items-center">
          <button className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
            <span className="px-2">ثبت</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <TableAdvice />
      </div>
     } */}
    </>
  );
}
