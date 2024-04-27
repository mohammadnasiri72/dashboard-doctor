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

export default function OperationMenu({ setAccountUpdate, setEditState, pat, setIsLoading, setFlag }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenAccompanying , setIsOpenAccompanying] = React.useState(false)
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
    setEditState(true);
    setAccountUpdate(e);
  };
  const deletePatientHandler = (e) => {
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
  const accompanyingPatientHandler = () => {
    setIsOpenAccompanying(true)
  };
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
                <TiGroup onClick={accompanyingPatientHandler} />
              </IconButton>
            </Tooltip>
          </div>
        </Menu>
      </div>
      <div
        style={{ zIndex: '2300', transform: isOpenAccompanying ? 'translateX(0)' : 'translateX(-100%)' }}
        className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
      >
        1
      </div>
      {
        isOpenAccompanying &&
        <div onClick={()=> setIsOpenAccompanying(false)} className='fixed top-0 left-0 right-0 bottom-0 bg-[#000c] '/>
      }
    </>
  );
}
