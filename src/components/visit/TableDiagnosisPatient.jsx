import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { mainDomain } from '../../utils/mainDomain';
import Swal from 'sweetalert2';

export default function TableDiagnosisPatient({ medicalRecord, setIsLoading, setFlag, alignment }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const deleteProblemHandler = (e) => {
    Swal.fire({
      title: 'حذف آیتم',
      text: 'آیا از حذف درخواست خود مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'green',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'حذف ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const dataDelete = {
          appointmentId: e.appointmentId,
          medicalRecordId: e.id,
        };
        axios
          .post(mainDomain + '/api/MedicalRecord/Delete', dataDelete, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'درخواست با موفقیت حذف شد',
            });
            setIsLoading(false);
            setFlag((e) => !e);
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };
  return (
    <>
      <div className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">عنوان</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecord
                .filter((e) => e.typeId === (alignment === 'Problem' ? 2 : alignment === 'Diagnosis' ? 3 : 4))
                .map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="pr-3 font-semibold">{i + 1}</span>
                    </TableCell>
                    <TableCell align="center">{e.medicalItemName}</TableCell>
                    <TableCell align="center">{e.description}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <Tooltip title="حذف" placement="left">
                          <IconButton onClick={() => deleteProblemHandler(e)}>
                            <FaTrashAlt className="cursor-pointer text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
