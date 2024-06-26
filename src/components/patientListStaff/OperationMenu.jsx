import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Iconify from '../Iconify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import { TiGroup } from 'react-icons/ti';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import RelativePatient from './RealativePatient';
import AddRelativePatient from './AddRelativePatient';
import { useEffect } from 'react';
import { MdOutlineMoreTime } from "react-icons/md";

export default function OperationMenu({ setAccountUpdate, setPageState, pat, setIsLoading, setFlag }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenAccompanying, setIsOpenAccompanying] = useState(false);
  const [isOpenAddRelative , setIsOpenAddRelative] = useState(false);
  const [PatientRelative, setPatientRelative] = useState([]);
  const [patient , setPatient] = useState({});
  useEffect(()=>{
    if (isOpenAccompanying || isOpenAddRelative) {
      document.body.style.overflowY = 'hidden'
    }else {
      document.body.style.overflowY = 'auto'
    }
  },[isOpenAccompanying , isOpenAddRelative])
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editPatientHandler = (e) => {
    handleClose()
    setPageState(1);
    setAccountUpdate(e);
  };
  const deletePatientHandler = (e) => {
    handleClose()
    Swal.fire({
      title: 'حذف بیمار',
      text: 'آیا از ثبت درخواست خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف کاربر',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = new FormData();
        data.append('patientId', e.patientId);
        axios
          .post(mainDomain + '/api/Patient/Delete', data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            setIsLoading(false);
            setFlag((e) => !e);
            //   setChange((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'کاربر مورد نظر با موفقیت حذف شد',
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
    });
  };
  const accompanyingPatientHandler = (e) => {
    setIsOpenAccompanying(true);
    handleClose()
    setPatient(e)
  };
  const reserveToPatientHandler = (e)=>{
    setAccountUpdate(e)
    setPageState(3)
  }
  useEffect(()=>{
    if (patient.nationalId) {
      
      axios
    .get(mainDomain + '/api/PatientRelative/Patient/GetList', {
      params:{
        nationalId: patient.nationalId
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then((res) => {
      setPatientRelative(res.data)
    })
    .catch((err) => {});
    }
},[patient , isOpenAccompanying , isOpenAddRelative])
  return (
    <>
      <div>
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <BsThreeDotsVertical className="cursor-pointer text-2xl" />
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div className="px-4">
            <Tooltip title="ویرایش" placement="right">
              <IconButton>
                <Iconify onClick={() => editPatientHandler(pat)} icon={'eva:edit-fill'} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="حذف" placement="right">
              <IconButton>
                <Iconify
                  onClick={() => deletePatientHandler(pat)}
                  className="text-red-500"
                  icon={'eva:trash-2-outline'}
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="همراه" placement="right">
              <IconButton>
                <TiGroup onClick={() => accompanyingPatientHandler(pat)} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="px-4">
            <Tooltip title="نوبت دهی اینترنتی" placement="right">
              <IconButton>
                <MdOutlineMoreTime onClick={()=> reserveToPatientHandler(pat)}/>
              </IconButton>
            </Tooltip>
          </div>
        </Menu>
      </div>

      <RelativePatient isOpenAccompanying={isOpenAccompanying} PatientRelative={PatientRelative} setIsOpenAddRelative={setIsOpenAddRelative} setIsOpenAccompanying={setIsOpenAccompanying}/>
      <AddRelativePatient isOpenAddRelative={isOpenAddRelative} setIsOpenAddRelative={setIsOpenAddRelative} patient={patient}/>
      {(isOpenAccompanying || isOpenAddRelative) && (
        <div
          style={{ zIndex: 1200 }}
          onClick={() => {
            setIsOpenAccompanying(false)
            setIsOpenAddRelative(false)
          }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#000c]"
        />
      )}
    </>
  );
}
