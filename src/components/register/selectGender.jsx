import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectGender({ gender, setGender }) {
  
  return (
    <>
      <div className="px-10 mx-auto mt-4 flex items-center">
        <h3 className="text-start">جنسیت:</h3>
            <div className="px-4" dir="rtl">
              <FormControl color="primary">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  Gender
                </InputLabel>
                <Select
                className='w-36'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  color="primary"
                  onChange={(e) => setGender(e.target.value)}
                  InputProps={{className:'textfield-style'}}
                >
                  <MenuItem value="m">مرد</MenuItem>
                  <MenuItem value="f">زن</MenuItem>
                </Select>
              </FormControl>
            </div>
      </div>
    </>
  );
}
