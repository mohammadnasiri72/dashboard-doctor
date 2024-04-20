import React, { useState } from "react";
import MainRegisterPage from "../../components/register/mainRegisterPage";
import SecoundRegisterPage from "../../components/register/secoundRegisterPage";
import Loader from "../../components/loader";



function Register() {
  const [isRegister , setIsRegister] = useState(false)
  const [registerModel , setRegisterModel] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
    {
        !isRegister&&
        <MainRegisterPage setIsRegister={setIsRegister} setRegisterModel={setRegisterModel} setIsLoading={setIsLoading}/>
    }
    {
        isRegister&& 
        <SecoundRegisterPage registerModel={registerModel} setIsRegister={setIsRegister} setIsLoading={setIsLoading}/>
    }
    {/* <div
        style={{ display: isLoading ? "flex" : "none" }}
        className="bg-[#0009] fixed top-0 left-0 right-0 bottom-0 justify-center items-center"
      >
        <img className="w-52" src={"/images/preloader.gif"} alt="" />
      </div> */}
      {
        isLoading && 
        <Loader />
      }
    </>
  );
}

export default Register;


