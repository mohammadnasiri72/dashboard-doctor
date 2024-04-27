import { TextField } from '@mui/material';
import useSettings from '../../hooks/useSettings';

export default function InputNationalId({ nationalId, setNationalId }) {
  const { themeDirection } = useSettings();
  const paternNationalId = /^[0-9]{10}$/;
  let colorNationId = '';
  if (nationalId.match(paternNationalId)) {
    colorNationId = 'success';
  } else if (nationalId.length === 0) {
    colorNationId = 'primary';
  } else {
    colorNationId = 'error';
  }

  return (
    <>
      <div className="px-10 mx-auto mt-4">
        <div className="mt-2" dir={themeDirection}>
          <TextField
            className="w-full"
            onChange={(e) => setNationalId(e.target.value)}
            id="outlined-multiline-flexible"
            label="کد ملی"
            multiline
            value={nationalId}
            color={colorNationId}
            maxRows={4}
            InputProps={{ className: 'textfield-style' }}
          />
        </div>
      </div>
    </>
  );
}
