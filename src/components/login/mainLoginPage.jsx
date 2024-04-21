import React, { useState } from 'react';
import NationalIdLogin from './nationalIdLogin';
import MobileLogin from './mobileLogin';
import SimpleBackdrop from '../backdrop';

export default function MainLoginPage() {
  const [abroad, setAbroad] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-login bg-cover bg-no-repeat bg-[#0008] bg-blend-multiply">
        <div className="lg:w-1/3 sm:w-1/2 w-full bg-[#000d] p-3 shadow-lg rounded-lg min-h-[50vh]">
          {!abroad && <MobileLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
          {abroad && <NationalIdLogin abroad={abroad} setAbroad={setAbroad} setIsLoading={setIsLoading}/>}
        </div>
      </div>
      {
        isLoading &&
        <SimpleBackdrop />
      }
    </>
  );
}
