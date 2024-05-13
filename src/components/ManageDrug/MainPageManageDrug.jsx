import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { mainDomain } from '../../utils/mainDomain';
import { MdOutlineMinimize } from 'react-icons/md';
import TableManageDrug from './TableManageDrug';

export default function MainPageManageDrug() {
  const [showManageDrug, setShowManageDrug] = useState(false);
  const [categoryDrug, setCategoryDrug] = useState([]);
  const [valCategoryDrug, setValCategoryDrug] = useState([]);
  const [nameDrug, setNameDrug] = useState('');
  const [descDrug, setDescDrug] = useState('');
  const [drugForm, setDrugForm] = useState([]);
  const [valDrugForm, setValDrugForm] = useState({});
  const [drugDose, setDrugDose] = useState([]);
  const [valDrugDose, setValDrugDose] = useState({});
  const [drugUseCycle, setDrugUseCycle] = useState([]);
  const [valDrugUseCycle, setValDrugUseCycle] = useState({});
  const [isActive, setisActive] = useState(true);
  const [priority , setPriority] = useState(0)

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
  return (
    <>
      <div className="text-start relative">
        <button
          onClick={() => setShowManageDrug(!showManageDrug)}
          className="flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
        >
          <span className="px-2">{showManageDrug ? 'بستن' : 'افزودن دارو'}</span>
          {!showManageDrug && <FaPlus />}
          {showManageDrug && <MdOutlineMinimize />}
        </button>
        <div
          style={{
            // transform: !showManageDrug ? 'translateY(-100%)' : 'translateY(0%)',
            opacity: showManageDrug ? '1' : '0',
            visibility: showManageDrug ? 'visible' : 'hidden',
            height: showManageDrug ? '22rem' : '0',
          }}
          className="border overflow-hidden sticky top-0 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg"
        >
          <div className="mt-5 flex">
            <div>
              <FormControl color="primary" className="w-56">
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
            <div className="px-2 flex">
              <button className="text-white rounded-md px-5 py-2 bg-green-500 duration-300 hover:bg-green-600">
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="text-start mt-3" dir="rtl">
              <TextField
                onChange={(e) => setNameDrug(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="نام دارو"
                multiline
                dir="rtl"
                value={nameDrug}
                maxRows={4}
              />
            </div>
            <div className="w-36 mt-3 pr-2">
              <Autocomplete
                value={valDrugForm}
                onChange={(event, newValue) => setValDrugForm(newValue)}
                freeSolo
                autoHighlight
                options={drugForm}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderInput={(params) => <TextField {...params} label={'شکل دارو ها'} placeholder="انتخاب شکل دارو" />}
              />
            </div>
            <div className="w-36 mt-3 pr-2">
              <Autocomplete
                value={valDrugDose}
                onChange={(event, newValue) => setValDrugDose(newValue)}
                freeSolo
                autoHighlight
                options={drugDose}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderInput={(params) => <TextField {...params} label={'دوز دارو ها'} placeholder="انتخاب دوز دارو" />}
              />
            </div>
            <div className="w-36 mt-3 pr-2">
              <Autocomplete
                value={valDrugUseCycle}
                onChange={(event, newValue) => setValDrugUseCycle(newValue)}
                freeSolo
                autoHighlight
                options={drugUseCycle}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderInput={(params) => <TextField {...params} label={'چرخه مصرف'} placeholder="انتخاب چرخه مصرف" />}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-start mt-3 w-1/2" dir="rtl">
              <TextField
                onChange={(e) => setDescDrug(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descDrug}
                minRows={3}
              />
            </div>
            <div className="flex flex-col justify-center pr-2">
              <div>
                <TextField
                  onChange={(e) => setPriority(e.target.value)}
                  className=" text-end w-20"
                  id="outlined-multiline-flexible"
                  label="اولویت"
                  multiline
                  dir="rtl"
                  value={priority}
                />
              </div>
              <div>
                <FormControlLabel
                  value={isActive}
                  onChange={() => setisActive(!isActive)}
                  control={<Switch defaultChecked />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <button className='px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold'>ثبت</button>
          </div>
        </div>
        <div className="mt-5">
          <TableManageDrug />
        </div>
      </div>
    </>
  );
}
