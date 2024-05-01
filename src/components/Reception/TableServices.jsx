import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function TableServices({ listServices }) {
  return (
    <>
    {
        listServices.length>0 &&
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead className="">
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="center">نوع خدمات</TableCell>
              <TableCell align="center">نام خدمات</TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell align="center">توضیحات</TableCell>
              <TableCell align="center">قیمت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...new Set(listServices)].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="pr-3 font-semibold">{i + 1}</span>
                </TableCell>
                <TableCell align="center">{e.medicalCategoryTitle}</TableCell>
                <TableCell align="center">{e.title}</TableCell>
                <TableCell align="center">{e.number}</TableCell>
                <TableCell align="center">{e.description}</TableCell>
                <TableCell align="center">{e.rate}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <BsThreeDotsVertical className="cursor-pointer text-xl" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    {
        listServices.length===0 && 
        <p className='border rounded-md py-5'>لیست خدمات خالی است</p>
    }
    </>
  );
}
