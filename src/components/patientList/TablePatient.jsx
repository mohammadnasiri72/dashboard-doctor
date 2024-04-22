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
import { FaTrashCan } from 'react-icons/fa6';
import { GrEdit } from 'react-icons/gr';
import { IconButton, Tooltip } from '@mui/material';





export default function TablePatient({ isOpenAddPatient }) {
  const [listPatient, setListPatient] = useState([]);
  const [medicines, setMedicines] = useState([]);
  console.log(medicines);
  useEffect(() => {
    axios
      .get(mainDomain + '/api/PatientHistory/GetList', {
        params: {
          statusId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setListPatient(res.data);
      })
      .catch((err) => {});
      axios
      .get(mainDomain + '/api/Medication/GetList', {
        params: {
          categoryId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => {});
  }, [isOpenAddPatient]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>عنوان بیماری</TableCell>
            <TableCell align="center">سن ابتلا</TableCell>
            <TableCell align="center">وضعیت بیماری</TableCell>
            <TableCell align="center">داروهای مورد استفاده</TableCell>
            <TableCell align="center">توضیحات</TableCell>
            <TableCell align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPatient.map((pat) => (
            <TableRow key={pat.patientHistoryId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {pat.title}
              </TableCell>
              <TableCell align="center">{pat.age}</TableCell>
              <TableCell align="center">{pat.statusId === 0 ? 'بهبود یافته' : 'درگیر'}</TableCell>
              <TableCell align="center">
                <div>
                  {
                    pat.medicationIdList.map((e , i)=>(
                        <p className='mt-1 p-1 bg-slate-100 rounded-3xl' key={i}>
                            {
                                medicines.find((ev)=> ev.medicationId === e).name
                            }
                        </p>
                    ))
                  }
                </div>
              </TableCell>
              <TableCell align="center">{pat.description}</TableCell>
              <TableCell align="center">
                <div className="flex justify-around">
                  
                  <Tooltip title="ویرایش">
                    <IconButton>
                    <GrEdit className='text-blue-500'/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="حذف">
                    <IconButton>
                      <FaTrashCan className='text-red-500'/>
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
