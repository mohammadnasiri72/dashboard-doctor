import { TextField } from '@mui/material';

export default function InputMobilEmail({ abroad, email, setEmail, mobile, setMobile }) {
  const paternMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
  let colorEmailOrMobile = '';
  if (abroad) {
    if (email.match(paternEmail)) {
      colorEmailOrMobile = 'success';
    } else if (email.length === 0) {
      colorEmailOrMobile = 'primary';
    } else {
      colorEmailOrMobile = 'error';
    }
  } else if (mobile.match(paternMobile)) {
    colorEmailOrMobile = 'success';
  } else if (mobile.length === 0) {
    colorEmailOrMobile = 'primary';
  } else {
    colorEmailOrMobile = 'error';
  }
  
  return (
    <>
      <div className="px-10 mx-auto mt-6">
      
        <div className="mt-2">
          <TextField
            onChange={(e) => (abroad === false ? `${setMobile(e.target.value)}` : `${setEmail(e.target.value)}`)}
            value={abroad ? email : mobile}
            className="w-full"
            id="outlined-multiline-flexible"
            label={abroad ? 'ایمیل' : 'شماره موبایل'}
            multiline
            color={colorEmailOrMobile}
            maxRows={4}
            InputProps={{className:'textfield-style'}}
          />
        </div>
          
      </div>
    </>
  );
}
