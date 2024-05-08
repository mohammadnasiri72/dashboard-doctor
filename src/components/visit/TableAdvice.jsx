import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export default function TableAdvice() {
  return (
    <>
      <div className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sticky table">
            <TableHead className="">
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell>ردیف</TableCell>
                <TableCell align="center">نوع توصیه</TableCell>
                <TableCell align="center">نام توصیه</TableCell>
                <TableCell align="center">توضیحات</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    onChange={(e) => alert('jjj')}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell align="center">x</TableCell>
                <TableCell align="center">x</TableCell>
                <TableCell align="center">x</TableCell>
                <TableCell align="center">x</TableCell>
                <TableCell align="center">x</TableCell>
              </TableRow>
              {/* {[...new Set(listServices)].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="pr-3 font-semibold">{i + 1}</span>
                </TableCell>
                <TableCell align="center">{e.medicalCategoryTitle}</TableCell>
                <TableCell align="center">{e.title}</TableCell>
                <TableCell align="center">{e.number}</TableCell>
                <TableCell align="center">{e.rate}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <FaTrashCan onClick={()=> deletServiceHandler(e)} className="cursor-pointer text-xl text-red-500" />
                  </div>
                </TableCell>
              </TableRow>
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
