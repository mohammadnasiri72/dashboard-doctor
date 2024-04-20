import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { Account, Change } from '../../pages/_app';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';

export default function UploaderImage() {
  const account = useContext(Account);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const [file, setFile] = useState('');
  const [fileUpload, setFileUpload] = useState('');
  const setChange = useContext(Change);
  const viewImgHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const sendImgHakdler = () => {
    const token = localStorage.getItem('token');
    const fileData = new FormData();
    fileData.append('file', file);
    axios
      .post(mainDomain+'/api/File/Upload/Image', fileData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        const fileSrc = new FormData();
        fileSrc.append('fileSrc', res.request.response);
        axios
          .post(mainDomain+'/api/Patient/Avatar/Update', fileSrc, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(() => {
            setChange((e) => !e);
            Toast.fire({
              icon: 'success',
              text: 'تصویر پروفایل با موفقیت بروز رسانی شد',
            });
          })
          .catch((err) => {});
      })
      .catch((err) => {});
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
          {(fileUpload || account.picture) && (
            <img className="w-full h-full rounded-full duration-300" src={mainDomain+account.avatar} alt="" />
          )}
          {!fileUpload && !account.picture && (
            <div className="flex justify-center items-center flex-col opacity-50 hover:opacity-100 duration-300 w-full h-full rounded-full absolute">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">آپلود تصویر</span>
            </div>
          )}
          {(fileUpload || account.picture) && (
            <div className="flex justify-center items-center flex-col opacity-0 hover:opacity-50 duration-300 w-full h-full rounded-full absolute text-white">
              <MdAddAPhoto className="text-2xl" />
              <span className="text-xl">تغییر تصویر</span>
            </div>
          )}
        </div>

        <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        <p className="text-xs mt-2"> max size of 3.1 MB</p>
        <button className='bg-green-500 px-5 py-2 absolute bottom-5 right-5 text-white rounded-md duration-300 hover:bg-green-600' onClick={sendImgHakdler}>ذخیره</button>
      </div>
    </>
  );
}
