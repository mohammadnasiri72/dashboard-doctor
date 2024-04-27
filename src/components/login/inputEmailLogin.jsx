import { TextField } from '@mui/material';
import React from 'react';

export default function InputEmailLogin({setEmail , email}) {
    const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
    let colorEmail = ''
    if (email.match(paternEmail)) {
        colorEmail = 'success';
      } else if (email.length === 0) {
        colorEmail = 'primary';
      } else {
        colorEmail = 'error';
      }
  return (
    <>
      <div className="mt-5 px-10">
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full"
          id="outlined-multiline-flexible"
          label={'ایمیل'}
          multiline
          color={colorEmail}
          maxRows={4}
          InputProps={{className:'textfield-style'}}
        />
      </div>
    </>
  );
}
