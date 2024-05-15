import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageDoctor from './TableManageDoctor';
// import TableManageService from './TableManageService';

export default function MainPageManageDoctor() {
  const [showManageDoctor, setShowManageDoctor] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [medicalSystemId, setMedicalSystemId] = useState('');
  const [firstNameDoctor, setFirstNameDoctor] = useState('');
  const [lastNameDoctor, setLastNameDoctor] = useState('');
  const [mobileDoctor, setMobileDoctor] = useState('');
  const [emailDoctor, setEmailDoctor] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [expertiseDoctor, setExpertiseDoctor] = useState('');

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  let colorMobile = '';
  let colorEmail = '';
  if (mobileDoctor.match(paternMobile)) {
    colorMobile = 'success';
  } else if (mobileDoctor.length === 0) {
    colorMobile = 'primary';
  } else {
    colorMobile = 'error';
  }
  if (emailDoctor.match(paternEmail)) {
    colorEmail = 'success';
  } else if (emailDoctor.length === 0) {
    colorEmail = 'primary';
  } else {
    colorEmail = 'error';
  }

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list expertises
  useEffect(() => {
    axios
      .get(mainDomain + '/api/BasicInfo/Specialization/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setExpertise(res.data);
      })
      .catch((err) => {});
  }, [flag]);

  // set new doctor
  const newDoctorHandler = () => {
    if (medicalSystemId.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا کد نظام پزشکی را به درستی وارد کنید',
      });
    } else if (!mobileDoctor.match(paternMobile)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا شماره موبایل را به درستی وارد کنید',
      });
    } else if (!emailDoctor.match(paternEmail)) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ایمیل را به درستی وارد کنید',
      });
    } else if (firstNameDoctor.length < 2 || lastNameDoctor.length < 2 || expertiseDoctor.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا موارد خواسته شده را به درستی وارد کنید',
      });
    } else {
      Swal.fire({
        title: 'ثبت پزشک جدید',
        text: 'آیا از ثبت پزشک مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        cancelButtonText: 'انصراف',
        confirmButtonText: 'تایید ',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const data = {
            medicalSystemId,
            specializationId: expertiseDoctor,
            firstName: firstNameDoctor,
            lastName: lastNameDoctor,
            mobile: mobileDoctor,
            email: emailDoctor,
          };
          axios
            .post(mainDomain + '/api/Doctor/Add', data, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
            .then((res) => {
              Toast.fire({
                icon: 'success',
                text: 'پزشک با موفقیت ثبت شد',
              });
              setMedicalSystemId('');
              setFirstNameDoctor('');
              setLastNameDoctor('');
              setMobileDoctor('');
              setExpertiseDoctor('');
              setEmailDoctor('');
              setFlag((e) => !e);
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              Toast.fire({
                icon: 'error',
                text: err.response ? err.response.data : 'خطای شبکه',
              });
            });
        }
      });
    }
  };

  // edit doctor
  const editDoctorHandler = () => {
    setIsLoading(true);
    const data = {
      medicalSystemId,
      specializationId: expertiseDoctor,
      firstName: firstNameDoctor,
      lastName: lastNameDoctor,
    };
    axios
      .post(mainDomain + '/api/Doctor/Update', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setShowManageDoctor(false);
        setIsLoading(false);
        setFlag((e) => !e);
        setIsEdit(false);
        setMedicalSystemId('');
        setFirstNameDoctor('');
        setLastNameDoctor('');
        setMobileDoctor('');
        setExpertiseDoctor('');
        setEmailDoctor('');
        Toast.fire({
          icon: 'success',
          text: 'پزشک با موفقیت ویرایش شد',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsEdit(false);
        setShowManageDoctor(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };

  return (
    <>
      <div className="text-start relative">
        {!isEdit && (
          <button
            onClick={() => setShowManageDoctor(!showManageDoctor)}
            className="sticky top-5 flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
          >
            <span className="px-2">{showManageDoctor ? 'بستن' : 'افزودن پزشک'}</span>
            {!showManageDoctor && <FaPlus />}
            {showManageDoctor && <MdOutlineMinimize />}
          </button>
        )}
        <div
          style={{
            opacity: showManageDoctor ? '1' : '0',
            visibility: showManageDoctor ? 'visible' : 'hidden',
            maxHeight: showManageDoctor ? '22rem' : '0',
            zIndex: '12',
          }}
          className="border overflow-hidden sticky top-12 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg pb-3"
        >
          {!isEdit && (
            <button onClick={() => setShowManageDoctor(false)} className="absolute bottom-0 left-1/2">
              <IoIosArrowUp className="text-3xl rounded-t-full bg-slate-200 translate-y-2 w-14 hover:bg-slate-300 duration-300" />
            </button>
          )}
          <div className="mt-5 flex items-center">
            {/* medicalSystemId */}
            <div className="text-start mt-3" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setMedicalSystemId(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="کد نظام پزشکی"
                multiline
                dir="rtl"
                value={medicalSystemId}
                maxRows={4}
              />
            </div>
            {/* first name */}
            <div className="text-start mt-3 pr-2" dir="rtl">
              <TextField
                onChange={(e) => setFirstNameDoctor(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="نام پزشک"
                multiline
                dir="rtl"
                value={firstNameDoctor}
                maxRows={4}
              />
            </div>
            {/* last name */}
            <div className="text-start mt-3 pr-2" dir="rtl">
              <TextField
                onChange={(e) => setLastNameDoctor(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="نام خانوادگی پزشک"
                multiline
                dir="rtl"
                value={lastNameDoctor}
                maxRows={4}
              />
            </div>
          </div>
          <div className="flex items-center">
            {/* mobile */}
            <div className="text-start mt-3" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setMobileDoctor(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="شماره موبایل پزشک"
                multiline
                dir="rtl"
                value={mobileDoctor}
                maxRows={4}
                color={colorMobile}
              />
            </div>
            {/* expertise title */}
            <div className="text-start mt-3 pr-2">
              <FormControl color="primary" className="w-56">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  تخصص
                </InputLabel>
                <Select
                  onChange={(e) => setExpertiseDoctor(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="تخصص"
                  color="primary"
                  value={expertiseDoctor}
                >
                  {expertise.map((e) => (
                    <MenuItem key={e.itemId} value={e.itemId}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* email */}
            <div className="text-start mt-3 pr-2" dir="rtl">
              <TextField
                disabled={isEdit}
                onChange={(e) => setEmailDoctor(e.target.value)}
                className=" text-end"
                id="outlined-multiline-flexible"
                label="ایمیل"
                multiline
                dir="rtl"
                value={emailDoctor}
                maxRows={4}
                color={colorEmail}
              />
            </div>
          </div>
          {!isEdit && (
            <div className="mt-3">
              <button
                onClick={newDoctorHandler}
                className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold"
              >
                ثبت
              </button>
            </div>
          )}
          {isEdit && (
            <div className="flex mt-3">
              <div className="px-2">
                <button
                  onClick={editDoctorHandler}
                  className="bg-green-500 hover:bg-green-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  ویرایش
                </button>
              </div>
              <div className="px-2">
                <button
                  onClick={() => {
                    setShowManageDoctor(false);
                    setIsEdit(false);
                    setMedicalSystemId('');
                    setFirstNameDoctor('');
                    setLastNameDoctor('');
                    setMobileDoctor('');
                    setExpertiseDoctor('');
                    setEmailDoctor('');
                  }}
                  className="bg-red-500 hover:bg-red-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <TableManageDoctor
            flag={flag}
            setIsLoading={setIsLoading}
            setFlag={setFlag}
            setShowManageDoctor={setShowManageDoctor}
            setIsEdit={setIsEdit}
            setMedicalSystemId={setMedicalSystemId}
            setFirstNameDoctor={setFirstNameDoctor}
            setLastNameDoctor={setLastNameDoctor}
            setMobileDoctor={setMobileDoctor}
            setEmailDoctor={setEmailDoctor}
            setExpertiseDoctor={setExpertiseDoctor}
          />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
