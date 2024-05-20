import React, { useEffect, useState } from 'react';
import Iconify from '../Iconify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';

export default function ModalEditType({ item, setIsLoading, setFlag }) {
  const [open, setOpen] = useState(false);
  const [titleType, setTitleType] = useState('');
  const [priority, setPriority] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [descType, setDescType] = useState('');

  useEffect(() => {
    setisActive(item.isActive);
    setDescType(item.description)
    setTitleType(item.name)
    setPriority(item.priority)
  }, [item]);

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  //   open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   close modal
  const handleClose = () => {
    setOpen(false);
  };

  //   edit item
  const editItemHandler = (item) => {
    if (titleType.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا عنوان تایپ را وارد کنید',
      });
    } else {
      setIsLoading(true);
      const data = {
        itemId: item.itemId,
        name: titleType,
        description: descType,
        isActive,
        priority: priority
      };
      axios
        .post(mainDomain + '/api/BasicInfo/Item/Update', data, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFlag((e) => !e);
          setOpen(false);
          Toast.fire({
            icon: 'success',
            text: 'آیتم با موفقیت ویرایش شد',
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
  };

  return (
    <>
      <React.Fragment>
        <Tooltip title="ویرایش">
          <IconButton>
            <Iconify onClick={handleClickOpen} className="cursor-pointer text-2xl" icon={'eva:edit-fill'} />
          </IconButton>
        </Tooltip>

        <Dialog sx={{ zIndex: '99' }} fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>ویرایش تایپ</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <GridCloseIcon />
          </IconButton>
          <DialogContent>
            <div className="flex flex-col items-center justify-start">
              <div>
                <TextField
                  onChange={(e) => setTitleType(e.target.value)}
                  className=" text-end duration-300 w-96"
                  id="outlined-multiline-flexible"
                  label="عنوان تایپ"
                  multiline
                  dir="rtl"
                  value={titleType}
                  maxRows={4}
                />
              </div>
              <div className="mt-3">
                <TextField
                  onChange={(e) => setDescType(e.target.value)}
                  className=" text-end duration-300 w-96"
                  id="outlined-multiline-flexible"
                  label="توضیحات"
                  multiline
                  dir="rtl"
                  value={descType}
                  maxRows={4}
                />
              </div>
              <div className='flex'>
              <div className="mt-3">
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
              <div className="mt-5 pr-2">
                <FormControlLabel
                  value={isActive}
                  onChange={() => setisActive(!isActive)}
                  control={<Switch checked={isActive} />}
                  label={isActive ? 'فعال' : 'غیر فعال'}
                />
              </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => editItemHandler(item)}>ویرایش</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
