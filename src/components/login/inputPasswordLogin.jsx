import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function InputPasswordLogin({ password, setPassword }) {
   

  return (
    <>
      <div className="mt-4 px-10">
        <TextField
          className="w-full"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="outlined-password-input"
          label="رمز عبور"
          type="password"
          value={password}
        />
      </div>
    </>
  );
}
