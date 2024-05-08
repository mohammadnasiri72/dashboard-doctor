import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";

export default function AddNewItem() {
  const [open, setOpen] = React.useState(false);
  const [value , setValue] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className='px-3 py-2 rounded-md bg-green-500 duration-300 text-white hover:bg-green-600' onClick={handleClickOpen}>
      <FaPlus /> 

      </button>
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <div className='w-96'>
        <DialogTitle>آیتم جدید</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیتم جدید را وارد کنید
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="آیتم جدید"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>انصراف</Button>
          <Button onClick={()=> console.log(value)} color='success' type="submit">تایید</Button>
        </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}