import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SelectExpertises from './SelectExpertises';
import SelecDoctor from './SelecDoctor';
import { useState } from 'react';
import SelectServicesNotPersonal from './SelectServicesNotPersonal';

export default function SelectServices() {
    const [expertise, setExpertise] = useState('همه');
    
  return (
    <>
      <div className='w-1/2 mx-auto'>
        <h2 className="text-2xl font-semibold">لطفا خدمات مد نظر خود را وارد کنید</h2>
        <SelectExpertises expertise={expertise} setExpertise={setExpertise}/>
        <SelecDoctor expertise={expertise} setExpertise={setExpertise}/>
        <SelectServicesNotPersonal />
        
        <div className='flex justify-between mt-5 px-4'>
            <button className='px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600'>برگشت به صفحه قبل</button>
            <button className='px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600'>مرحله بعد</button>
        </div>
      </div>
    </>
  );
}
