import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';
import { FaTrashAlt } from 'react-icons/fa';
import { RiFileVideoLine } from 'react-icons/ri';
import { IoIosDocument } from 'react-icons/io';
import { FaImage } from 'react-icons/fa6';
import { MdAudioFile } from 'react-icons/md';
import Swal from 'sweetalert2';
import SimpleBackdrop from '../backdrop';
import BoxImg from './BoxImg';
import BoxVideo from './BoxVideo';
import BoxAudio from './BoxAudio';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MyDocumentSend({ apointmentId, flagUpload, setFlagUpload }) {
  const [filesUpload, setFilesUpload] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowImg, setIsShowImg] = useState(false);
  const [isShowAudio, setIsShowAudio] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [src, setSrc] = useState('');
  const [srcVideo, setSrcVideo] = useState('');
  const [srcAudio, setSrcAudio] = useState('');

  const route = useRouter()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  useEffect(() => {
    axios
      .get(mainDomain + '/api/MedicalRecord/GetList', {
        params: {
          appointmentId: apointmentId,
          typeId: 6,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setFilesUpload(res.data);
      })
      .catch((err) => {});
  }, [flagUpload]);
  const deleteFileHandler = (e) => {
    Swal.fire({
      title: 'حذف فایل',
      text: 'آیا از حذف فایل خود مطمئن هستید؟',

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDeleteFile = {
          appointmentId: apointmentId,
          medicalRecordId: e.id,
        };
        axios
          .post(mainDomain + '/api/MedicalRecord/Delete', dataDeleteFile, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'فایل با موفقیت حذف شد',
            });
            setIsLoading(false);
            // console.log(res);
            setFlagUpload(!flagUpload);
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response.data ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };

  const showImgHandler = (e) => {
    setIsShowImg(true);
    setSrc(e.attachmentSrc);
  };

  return (
    <>
      <div className="border rounded-xl p-4">
        {filesUpload.length === 0 && <p>صفحه مدارک خالی است</p>}
        {filesUpload.length !== 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>شماره ردیف</TableCell>
                  <TableCell>توضیحات</TableCell>
                  <TableCell align="center">نوع فایل</TableCell>
                  <TableCell align="center">مشاهده فایل</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filesUpload.map((file, index) => (
                  <TableRow key={file.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <span className="pr-5 font-semibold">{index + 1}</span>
                    </TableCell>
                    <TableCell component="th" scope="file">
                      {file.description}
                    </TableCell>
                    <TableCell align="center">{file.medicalItemName}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        {file.medicalItemName === 'ویدئو' ? (
                          <RiFileVideoLine
                            onClick={() => {
                              setIsShowVideo(true);
                              setSrcVideo(file.attachmentSrc);
                            }}
                            className="text-2xl cursor-pointer"
                          />
                        ) : file.medicalItemName === 'سند' ? (
                          <a target='_blank' rel='noreferrer' href={mainDomain+file.attachmentSrc}><IoIosDocument className="text-2xl cursor-pointer" /></a>
                        ) : file.medicalItemName === 'تصویر' ? (
                          <FaImage
                            onClick={() => {
                              setIsShowImg(true);
                              setSrc(file.attachmentSrc);
                            }}
                            className="text-2xl cursor-pointer"
                          />
                        ) : (
                          <MdAudioFile
                            onClick={() => {
                              setIsShowAudio(true);
                              setSrcAudio(file.attachmentSrc);
                            }}
                            className="text-2xl cursor-pointer"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <FaTrashAlt onClick={() => deleteFileHandler(file)} className="text-2xl cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <BoxImg isShowImg={isShowImg} setIsShowImg={setIsShowImg} src={src} filesUpload={filesUpload} setSrc={setSrc} />
        <BoxVideo
          srcVideo={srcVideo}
          setSrcVideo={setSrcVideo}
          isShowVideo={isShowVideo}
          setIsShowVideo={setIsShowVideo}
          filesUpload={filesUpload}
        />
        <BoxAudio isShowAudio={isShowAudio} srcAudio={srcAudio} setIsShowAudio={setIsShowAudio}/>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
