import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div className='w-full flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0002]'>
      
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
  );
}