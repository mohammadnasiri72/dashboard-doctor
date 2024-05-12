import React from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { IoCloseSharp } from 'react-icons/io5';

export default function BoxVideo({ srcVideo, setSrcVideo, isShowVideo, setIsShowVideo, filesUpload }) {
  return (
    <>
      <div
        style={{ display: isShowVideo ? 'block' : 'none', zIndex: '9999999999' }}
        className="absolute top-0 bottom-0 right-0 left-0 bg-[#000a]"
      >
      <IoCloseSharp onClick={()=> setIsShowVideo(false)} className='absolute top-10 right-10 text-white cursor-pointer rounded-full bg-[#0002] p-3 text-5xl duration-300 hover:bg-[#0006]'/>

      </div>
        <div
              style={{ transform: isShowVideo ? 'scale(1)' : 'scale(0)' , zIndex:'9999999999'}}
              className="absolute top-10 bottom-10 right-1/4 left-1/4 duration-300  rounded-lg shadow-lg cursor-pointer flex items-center"
            >
              <video src={mainDomain + srcVideo} controls className='w-full'/>
              
            </div>
    </>
  );
}
