import React from 'react';

export default function Loader() {
  return (
    <>
      <div
        className="bg-[#0009] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      >
        <img className="w-52" src={'/images/preloader.gif'} alt="" />
      </div>
    </>
  );
}
