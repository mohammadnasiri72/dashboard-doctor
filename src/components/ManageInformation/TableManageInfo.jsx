import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

export default function TableManageInfo() {
  return (
   <>
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">عنوان دسته بندی</TableCell>
                <TableCell align="center">عنوان</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">اولویت</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {listDoctor.map((doctor, i) => (
                <TableRow key={doctor.doctorId}>
                  <TableCell>
                    <span className="pr-2 font-semibold">{i + 1}</span>
                  </TableCell>
                  <TableCell align="center">
                    {doctor.firstName} {doctor.lastName}
                  </TableCell>
                  <TableCell align="center">{doctor.medicalSystemId}</TableCell>
                  <TableCell align="center">{doctor.userPhoneNumber}</TableCell>
                  <TableCell align="center">{doctor.userEmail}</TableCell>
                  <TableCell align="center">{doctor.specialization}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-around">
                      <Tooltip title="ویرایش" placement="bottom">
                        <IconButton
                          onClick={() => {
                            editDoctorHandler(doctor);
                          }}
                        >
                          <Iconify icon={'eva:edit-fill'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف" placement="bottom">
                        <IconButton
                          onClick={() => {
                            deleteDoctorHandler(doctor);
                          }}
                        >
                          <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
   </>
  )
}
