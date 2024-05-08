import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { FaPlus } from 'react-icons/fa6';

export default function DrugPatient({ patSelected, setIsLoading }) {
  const [categoryDrug, setCategoryDrug] = useState([]);
  const [valCategoryDrug, setValCategoryDrug] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [valDrugList, setValDrugList] = useState([]);
  const [drugForm, setDrugForm] = useState([]);
  const [valDrugForm, setValDrugForm] = useState([]);
  const [drugDose, setDrugDose] = useState([]);
  const [valDrugDose, setValDrugDose] = useState([]);
  const [drugUseCycle, setDrugUseCycle] = useState([]);
  const [valDrugUseCycle, setValDrugUseCycle] = useState([]);
  const [descDrug, setDescDrug] = useState('');
  // console.log(descDrug);

  // get description drug
  useEffect(() => {
    axios
      .get(mainDomain + '/api/MedicationCategory/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setCategoryDrug(res.data);
      })
      .catch((err) => {});

    axios
      .get(mainDomain + '/api/Medication/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDrugList(res.data);
      })
      .catch((err) => {});

    axios
      .get(mainDomain + '/api/BasicInfo/DrugForm/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDrugForm(res.data);
      })
      .catch((err) => {});

    axios
      .get(mainDomain + '/api/BasicInfo/DrugDose/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDrugDose(res.data);
      })
      .catch((err) => {});

    axios
      .get(mainDomain + '/api/BasicInfo/DrugUseCycle/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDrugUseCycle(res.data);
      })
      .catch((err) => {});
  }, []);
const setDrugHandler = ()=>{
  const data = {
    appointmentId: patSelected.appointmentId,
    medicationId: valDrugList.medicationId,
    form: valDrugForm,
    dosage: valDrugDose,
    frequency: valDrugUseCycle,
    instructions: descDrug
  }
  axios
  .post(mainDomain+'/api/Prescription/Add' , data , {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{

  })
}
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-1/3 w-full pl-2">
          <div className="w-full pr-4">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                لیست دسته بندی دارو ها
              </InputLabel>
              <Select
                onChange={(e) => setValCategoryDrug(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="لیست دسته بندی دارو ها"
                color="primary"
                value={valCategoryDrug}
              >
                {categoryDrug.map((e) => (
                  <MenuItem key={e.medicationCategoryId} value={e.medicationCategoryId}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full pr-4 mt-5">
            <Autocomplete
              value={valDrugList}
              onChange={(event, newValue) => setValDrugList(newValue)}
              freeSolo
              autoHighlight
              options={drugList.filter((e) => e.medicalCategoryId === valCategoryDrug)}
              getOptionLabel={(option) => (option.name ? option.name : '')}
              renderInput={(params) => <TextField {...params} label={'لیست دارو ها'} placeholder="انتخاب دارو" />}
            />
          </div>
          <div className="w-full pr-4 mt-5">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                شکل دارو ها
              </InputLabel>
              <Select
                onChange={(e) => setValDrugForm(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="شکل دارو ها"
                color="primary"
                value={valDrugForm}
              >
                {drugForm.map((e) => (
                  <MenuItem key={e.itemId} value={e.name}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full pr-4 mt-5">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                دوز دارو ها
              </InputLabel>
              <Select
                onChange={(e) => setValDrugDose(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="دوز دارو ها"
                color="primary"
                value={valDrugDose}
              >
                {drugDose.map((e) => (
                  <MenuItem key={e.itemId} value={e.name}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full pr-4 mt-5">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                چرخه مصرف
              </InputLabel>
              <Select
                onChange={(e) => setValDrugUseCycle(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="چرخه مصرف"
                color="primary"
                value={valDrugUseCycle}
              >
                {drugUseCycle.map((e) => (
                  <MenuItem key={e.itemId} value={e.name}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-full text-start pr-4 mt-5" dir="rtl">
            <TextField
              onChange={(e) => setDescDrug(e.target.value)}
              className="w-full text-end"
              id="outlined-multiline-flexible"
              label="توضیحات (دستور مصرف)"
              multiline
              dir="rtl"
              value={descDrug}
              minRows={4}
            />
          </div>
          <div className="pr-8 flex items-center mt-5">
            <button onClick={setDrugHandler} className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
              <span className="px-2">ثبت</span>
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="lg:w-2/3 w-full border p-4">
          <div className="text-start">
            <h3 className="text-xl font-semibold">جزئیات نسخه</h3>
            <p>تاریخ ویزیت: {2}</p>
          </div>
        </div>
      </div>
    </>
  );
}
