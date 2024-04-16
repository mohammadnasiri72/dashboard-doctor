import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectGenderUpdateProfile({gender , setGender}) {
  return (
    <>
    <div className="w-1/2 mx-auto mt-6 px-5">
                  <div className=" mx-auto flex items-center">
                    <div className="px-4 w-full" dir="rtl">
                      <FormControl color="primary" className="w-24">
                        <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                          جنسیت
                        </InputLabel>
                        <Select
                          onChange={(e) => setGender(e.target.value)}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="جنسیت"
                          color="primary"
                          value={gender}
                        >
                          <MenuItem value="m">مرد</MenuItem>
                          <MenuItem value="f">زن</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
    </>
  )
}
