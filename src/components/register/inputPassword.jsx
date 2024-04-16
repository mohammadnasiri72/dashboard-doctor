import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function InputPassword({ password, setPassword }) {
  return (
    <>
      <div className="mt-4 w-full px-10">
        <TextField
          onChange={(event) => {
            event.preventDefault();
            setPassword(event.target.value);
          }}
          className="w-full"
          id="outlined-password-input"
          label="پسورد"
          type="password"
          value={password}
        />
      </div>
    </>
  );
}
