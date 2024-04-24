import {
  CircularProgress,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { MdDriveFolderUpload } from 'react-icons/md';
import Swal from 'sweetalert2';
import MyDocumentSend from './MyDocument';
import SimpleBackdrop from '../backdrop';
import ProgressBarUpload from './ProgressBarUpload';
export default function UploadDocuments({ setPageNumber, apointmentId }) {
  const [fileType, setFileType] = useState([]);
  const [fileVal, setFileVal] = useState('');
  const [savedfile, setSavedFile] = useState('');
  const [flagUpload, setFlagUpload] = useState(false);
  const [valProgres, setValProgres] = useState(0);
  const [addressType, setAddressType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [desc , setDesc] = useState('')
  const inpRef = useRef();
  useEffect(() => {
    if (valProgres === 100) {
      setValProgres(0);
      setIsLoading(true);
    }
  }, [valProgres]);

  // get type file
  useEffect(() => {
    axios
      .get(mainDomain + '/api/BasicInfo/MedicalDocument/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setFileType(res.data);
      })
      .catch((err) => {});
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  const selectFileHandler = () => {
    if (fileVal.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا نوع فایل را انتخاب کنید',
      });
    } else {
      inpRef.current.click();
    }
  };
  const uploadDocumentHandler = (e) => {
    setSavedFile(e.target.files[0]);

    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    axios
      .post(mainDomain + '/api/File/Upload/' + addressType, fileData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        onUploadProgress: (val) => {
          setValProgres(parseInt(Math.round((val.loaded * 100) / val.total)));
        },
      })
      .then((res) => {
        const data = {
          appointmentId: apointmentId,
          typeId: 6,
          medicalItemId: fileVal,
          attachment: res.data,
          description: desc
        };
        axios
          .post(mainDomain + '/api/MedicalRecord/Add', data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'فایل با موفقیت آپلود شد',
            });
            setIsLoading(false);
            setFlagUpload(!flagUpload);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          text: err.response.data,
        });
        setValProgres(0);
        setIsLoading(false);
      });
  };
  const changTypeFileHandler = (e) => {
    setFileVal(e.target.value);
    fileType.map((t) => {
      if (t.itemId === e.target.value) {
        setAddressType(t.description);
      }
    });
  };
  return (
    <>
      <div>
        <div>
          <h2 className="text-2xl font-semibold pb-4">در صورت داشتن مدارک پزشکی آن را برای دکتر ارسال کنید</h2>
        </div>
        <div className="px-4 w-full flex justify-start items-center" dir="rtl">
          <FormControl color="primary" className="w-36">
            <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
              نوع فایل
            </InputLabel>
            <Select
              onChange={changTypeFileHandler}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="نوع فایل"
              color="primary"
              value={fileVal}
            >
              {fileType.map((e) => (
                <MenuItem key={e.itemId} value={e.itemId}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
          <div className=" text-start px-2" dir="rtl">
              <TextField
                onChange={(e) => setDesc(e.target.value)}
                className="w-full text-end"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                maxRows={4}
                value={desc}
                
              />
            </div>
          </div>
          <input className="opacity-0 invisible absolute" ref={inpRef} type="file" onChange={uploadDocumentHandler} />
          {/* <Tooltip onClick={selectFileHandler} title="آپلود فایل">
            <div className="px-3">
              <button className="text-2xl bg-slate-100 rounded-full p-4 cursor-pointer hover:bg-slate-300 duration-300">
                <MdDriveFolderUpload />
                <span>آپلود فایل</span>
              </button>
            </div>
          </Tooltip> */}
          <div className="px-3">
            <button
              onClick={selectFileHandler}
              className="p-3 flex justify-center items-center bg-slate-100 hover:bg-slate-300 duration-300 rounded-full"
            >
              <span className="px-2">آپلود فایل</span>
              <MdDriveFolderUpload className="text-3xl" />
            </button>
          </div>
          <div>{<span dir="ltr">{savedfile.name}</span>}</div>
          {/* <CircularProgress variant="determinate" value={valProgres} /> */}
          <div className="px-5">
            <ProgressBarUpload valProgres={valProgres} />
          </div>
        </div>
        <div className="p-5">
          <MyDocumentSend apointmentId={apointmentId} flagUpload={flagUpload} />
        </div>

        <div className="flex justify-between mt-5 px-4">
          <button
            onClick={() => setPageNumber(3)}
            className="px-5 py-2 rounded-md bg-red-500 text-white duration-300 hover:bg-red-600"
          >
            برگشت به صفحه قبل
          </button>
          <button
            // onClick={goToNext}
            className="px-5 py-2 rounded-md bg-green-500 text-white duration-300 hover:bg-green-600"
          >
            مرحله بعد
          </button>
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
