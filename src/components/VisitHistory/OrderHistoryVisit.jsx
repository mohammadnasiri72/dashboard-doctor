import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaDownload } from 'react-icons/fa';

export default function OrderHistoryVisit({ receptionSelected, setIsLoading }) {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + '/api/MedicalRecord/Order/GetList', {
        params: {
          appointmentId: receptionSelected.appointmentId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListOrder(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <h3>اردر های پزشک</h3>
        {listOrder.map((e, i) => (
          <div key={e.orderId} className="px-3 flex justify-between rounded-lg bg-slate-50 mt-2 px-2">
            <div className="flex items-center  ">
              <span>{i + 1}_</span>
              <span className="px-1 text-sm">{e.status}</span>
              <span className="px-1 text-sm">{e.medicalItemName}</span>
              <span className="px-1 text-sm">{e.doctorComments}</span>
            </div>
              <Button
                onClick={() => {
                  // setIsOpenOrder(true)
                  // setOrderEdit(e);
                }}
                //   color="primary"
                className="text-slate-600 px-0"
              >
                پاسخ
              </Button>
          </div>
        ))}
        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="center">وضعیت</TableCell>
                  <TableCell align="center">نام اردر</TableCell>
                  <TableCell align="center">توضیحات پزشک</TableCell>
                  <TableCell align="center">دانلود</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrder.map((e,i) => (
                  <TableRow key={e.orderId}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell align="center">
                    <Chip color={e.statusId===1?'warning':e.statusId===2?'primary':e.statusId===3?'success':'error'} label={<span className='text-xs'>{e.status}</span>} />
                        </TableCell>
                    <TableCell align="center">{e.medicalItemName}</TableCell>
                    <TableCell align="center">{e.doctorComments}</TableCell>
                    <TableCell align="center">
                        <div className='flex justify-center'>
                        <a target='_blank' rel="noreferrer" href={mainDomain} download ><FaDownload /></a>
                        </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-around">
                      <Button
                onClick={() => {
                  // setIsOpenOrder(true)
                  // setOrderEdit(e);
                }}
                //   color="primary"
                className="text-slate-600 px-0"
              >
                پاسخ
              </Button>
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
      </div>
    </>
  );
}
