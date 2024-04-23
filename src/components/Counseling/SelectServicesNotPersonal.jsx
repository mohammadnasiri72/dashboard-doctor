import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectServicesNotPersonal() {
  return (
    <>
    <div className=" mx-auto flex items-center mt-5">
          <div className="px-4 w-full" dir="rtl">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست خدمات غیر حضوری
              </InputLabel>
              <Select
                //   onChange={(e) => setGender(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="لیست خدمات غیر حضوری"
                color="primary"
                //   value={gender}
              >
                <MenuItem value="m">مرد</MenuItem>
                <MenuItem value="f">زن</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
    </>
  )
}
