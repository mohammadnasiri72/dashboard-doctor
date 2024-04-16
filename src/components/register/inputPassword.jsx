import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

export default function InputPassword({password,setPassword}) {
    
    useEffect(()=>{
        setTimeout(() => {
            setPassword('')
        }, 100);
    },[])
  return (
    <>
     
        
        <div className='mt-4 w-full'>
          <TextField
            onChange={(event) => {
                event.preventDefault()
               setPassword(event.target.value)
            }}
            id="outlined-password-input"
            label="پسورد"
            type='password'
            value={password}
          />
          
        </div>
      
    </>
  );
}
