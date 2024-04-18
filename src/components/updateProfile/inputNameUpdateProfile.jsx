import { TextField } from '@mui/material';
import React from 'react';

export default function InputNameUpdateProfile({ name , setName }) {
  let color = ''
  if (name.length > 2) {
    color = 'success'
  }else if (name.length === 0) {
    color = 'primary'
  }else{
    color = 'error'
  }
  return (
    <>
      <div className="w-1/2 mx-auto mt-4 px-5">
        <TextField
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام"
          multiline
          value={name}
          maxRows={4}
          color={color}
        />
      </div>
    </>
  );
}
