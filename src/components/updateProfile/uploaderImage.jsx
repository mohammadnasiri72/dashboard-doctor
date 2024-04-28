import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { Account, Change } from '../../pages/_app';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import ProgressBarUpdateProfile from './ProgressBarUpdateProfile';
import SimpleBackdrop from '../backdrop';

export default function UploaderImage({accountUpdate , setPageState}) {
  const account = useContext(Account);
  let avatar = ''
  if (accountUpdate) {
    avatar = accountUpdate.avatar
  }else{
    avatar = account.avatar
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // const [file, setFile] = useState('');
  const [valProgres, setValProgres] = useState(0);
  const [isLoading , setIsLoading] = useState(false)
  const setChange = useContext(Change);
  const viewImgHandler = (e) => {
    setIsLoading(true)
    // setFile(e.target.files[0]);
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    axios
      .post(mainDomain + '/api/File/Upload/Image', fileData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        // const fileSrc = new FormData();
        // fileSrc.append('fileSrc', res.request.response);
        const data = {
          fileSrc: res.request.response,
          userId: accountUpdate? accountUpdate.userId : localStorage.getItem("userId")
        }
        axios
          .post(mainDomain + '/api/Patient/Avatar/Update', data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            
            onUploadProgress: (val) => {
              setValProgres(parseInt(Math.round((val.loaded * 100) / val.total)));
            },
          })
          .then(() => {
            setIsLoading(false)
            setValProgres(0);
            setChange((e) => !e);
            setPageState(0)
            Toast.fire({
              icon: 'success',
              text: 'تصویر پروفایل با موفقیت بروز رسانی شد',
            });
          })
          .catch((err) => {
            setIsLoading(false)
          });
      })
      .catch((err) => {
        setIsLoading(false)
      });
  };
  
  const inpImg = useRef();
  const selectImgHandler = () => {
    inpImg.current.click();
  };
  return (
    <>
      <div className="border rounded-lg h-full pt-5 relative">
        <input className="opacity-0 invisible absolute" ref={inpImg} onChange={viewImgHandler} type="file" />
        {/* <UploadAvatar file={file} /> */}
        <div
          onClick={selectImgHandler}
          className="border-dashed relative border border-black w-32 h-32 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer mx-auto  box-avatar"
        >
          {(account.picture || accountUpdate) && (
            <img className="w-full h-full rounded-full duration-300 object-cover" src={mainDomain + avatar} alt="" />
          )}
          

          {(!account.picture && !accountUpdate) && (
            <div className="flex justify-center items-center flex-col opacity-50 hover:opacity-100 duration-300 w-full h-full rounded-full absolute">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">آپلود تصویر</span>
            </div>
          )}
          {(account.picture || accountUpdate) && (
            <div className="flex justify-center items-center flex-col opacity-0 hover:opacity-50 duration-300 w-full h-full rounded-full absolute text-white">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">تغییر تصویر</span>
            </div>
          )}
        </div>

        <div className='p-5 mx-auto'>
          {/* <LinearProgress style={{display: valProgres===100?'none':'block'}} variant="determinate" value={valProgres} /> */}
          <div>
            <ProgressBarUpdateProfile valProgres={valProgres}/>
          </div>
        </div>
        <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        <p className="text-xs mt-2"> max size of 3.1 MB</p>
        
      </div>
      {
        isLoading && 
        <SimpleBackdrop/>
      }
    </>
  );
}
