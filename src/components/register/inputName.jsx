import { TextField } from '@mui/material';

export default function InputName({ fristName, setFristName }) {
  let colorName = '';
  if (fristName.length > 2) {
    colorName = 'success';
  } else if (fristName.length === 0) {
    colorName = 'primary';
  } else {
    colorName = 'error';
  }

  return (
    <>
      <div className="px-5 mx-auto mt-4 lg:w-2/3 w-full">
        <TextField
          onChange={(e) => setFristName(e.target.value)}
          className="w-full"
          id="outlined-multiline-flexible"
          label="نام"
          multiline
          maxRows={4}
          color={colorName}
          // InputProps={{ className: 'textfield-style' }}
        />
      </div>
    </>
  );
}
