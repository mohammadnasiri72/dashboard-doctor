import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function InputDesc({descRelative , setDescRelative}) {
    
  return (
    <>
     <div className="mt-3 px-5">
        <TextField
          onChange={(e) => setDescRelative(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="توضیحات"
          multiline
          value={descRelative}
          minRows={4}
        />
      </div>
    </>
  )
}
