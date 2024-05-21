import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function InputPassword({ password, setPassword }) {
  return (
    <>
      <div className="mt-4 mx-auto px-5 lg:w-2/3 w-full">
        <TextField
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value);
          }}
          className="w-full bg-white"
          id="outlined-password-input"
          label="پسورد"
          type="password"
          value={password}
          autoComplete='new-password'
          // InputProps={{ className: 'textfield-style' }}
        />
      </div>
    </>
  );
}
