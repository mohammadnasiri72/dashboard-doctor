import { TextField } from '@mui/material';

export default function InputLastName({lastName , setLastName}) {
  let colorLName = '';
  if (lastName.length > 2) {
    colorLName = 'success';
  } else if (lastName.length === 0) {
    colorLName = 'primary';
  } else {
    colorLName = 'error';
  }
  
  return (
    <>
      <div className="px-10 mx-auto mt-4">
        
            <div className="mt-2 text-start" dir="rtl">
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-end pl-20"
                id="outlined-multiline-flexible"
                label="نام خانوادگی"
                multiline
                dir="rtl"
                maxRows={4}
                color={colorLName}
              />
            </div>
          
      </div>
    </>
  );
}
