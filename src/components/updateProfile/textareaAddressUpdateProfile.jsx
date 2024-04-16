import React from 'react';

export default function TextareaAddressUpdateProfile({setAddress}) {
  return (
    <>
      <div className="px-5 mt-3">
        <textarea onChange={(e)=> setAddress(e.target.value)} className="outline-none border w-full h-36 p-2" placeholder="آدرس محل سکونت" />
      </div>
    </>
  );
}
