import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

export default function TableInsuranceSelected({ insuranceListSelected }) {
  return (
    <>
      {insuranceListSelected.length === 0 && <p>بیمه ای وارد نشده است</p>}
      {insuranceListSelected.length !== 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="center">نام بیمه</TableCell>
                  <TableCell align="center">نوع پوشش</TableCell>
                  <TableCell align="center">درصد پوشش</TableCell>
                  <TableCell align="center">تاریخ شروع</TableCell>
                  <TableCell align="center">تاریخ اتمام</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insuranceListSelected.map((e , i) => (
                  <TableRow key={e.insuranceCompanyId}>
                    <TableCell><span className='pr-3 font-semibold'>{i+1}</span></TableCell>
                    <TableCell align="center">{e.insuranceCompanyName}</TableCell>
                    <TableCell align="center">{e.coverageType}</TableCell>
                    <TableCell align="center">{e.coverageAmount}%</TableCell>
                    <TableCell align="center">{e.startDateFa}</TableCell>
                    <TableCell align="center">{e.endDateFa}</TableCell>
                    <TableCell align="center"><div className='flex justify-center'><BsThreeDotsVertical className='cursor-pointer text-xl'/></div></TableCell>
                  </TableRow>
                ))}
                {/* {listPatient.map((pat) => (
              <TableRow
              className='hover:bg-[#f4f6f8] duration-300'
                key={pat.patientHistoryId}
                sx={{  borderBottom: 'dotted #0001' , borderBottomWidth:'2px' , '&:last-child td, &:last-child th': { border: 0 } , }}
              >
                <TableCell  component="th" scope="row">
                  {pat.title}
                </TableCell>
                <TableCell align="center">{pat.age}</TableCell>
                <TableCell align="center">{pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}</TableCell>
                <TableCell align="center">
                  <div>
                    {pat.medicationIdList.map((e, i) => (
                      <p className="mt-1 p-1 bg-slate-200 rounded-3xl" key={i}>
                        {medicines.length > 0 && medicines.find((ev) => ev.medicationId === e).name}
                      </p>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="center">{pat.description}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-around">
                    <Tooltip title="ویرایش">
                      <IconButton>
                        <Iconify onClick={() => editPatientHandler(pat)} icon={'eva:edit-fill'} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف">
                      <IconButton>
                      <Iconify className="text-red-500" onClick={()=> deletePatientHandler(pat)} icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
