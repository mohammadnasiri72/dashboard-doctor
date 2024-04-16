import React, { useState } from 'react';
import SelectAbroadLogin from './SelectAbroadLogin';
import NationalIdLogin from './nationalIdLogin';
import MobileLogin from './mobileLogin';

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
      <div
        style={{ display: isLoading ? "flex" : "none" }}
        className="bg-[#0009] fixed top-0 left-0 right-0 bottom-0 justify-center items-center"
      >
        <img className="w-52" src={"/images/preloader.gif"} alt="" />
      </div>
    </>
  );
}
