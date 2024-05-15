import { useState } from 'react';
import SelectTimeReserve from './SelectTimeReserve';
import SimpleBackdrop from '../backdrop';

export default function MainPageManageReserve() {
    const [isLoading , setIsLoading] = useState(false)
  return (
    <>
      <SelectTimeReserve setIsLoading={setIsLoading}/>
      {
        isLoading &&
        <SimpleBackdrop />
      }
    </>
  );
}
