import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function TemplateVisit() {
  return (
    <>
    <div className='flex items-center'>
    <div className="w-80 pr-4 mt-5">
            <FormControl color="primary" className="w-full">
              <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست تمپلیت ها
              </InputLabel>
              <Select
                // onChange={(e) => setValDrugForm(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="لیست تمپلیت ها"
                color="primary"
                // value={valDrugForm}
              >
                {/* {drugForm.map((e) => (
                <MenuItem key={e.medicationCategoryId} value={e.medicationCategoryId}>
                  {e.title}
                </MenuItem>
              ))} */}
              </Select>
            </FormControl>
          </div>
          <div className="pr-8 flex items-center mt-5">
        <button className="px-5 py-4 rounded-lg bg-green-500 duration-300 hover:bg-green-600 text-white flex items-center">
          <span className="px-2">ثبت</span>
          <FaPlus />
        </button>
      </div>
    </div>
    </>
  )
}
