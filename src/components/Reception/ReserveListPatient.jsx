import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function ReserveListPatient({
  valReservPatient,
  setValReservPatient,
  userSelected,
  setReservUser,
  reservUser,
}) {
  useEffect(() => {
    if (userSelected.userId) {
      axios
        .get(mainDomain + '/api/Reservation/GetList', {
          params: {
            patientUserId: userSelected.userId,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setReservUser(res.data);
        })
        .catch((err) => {});
    }
  }, [userSelected]);
  return (
    <>
      <div className="w-64 mt-3">
        <FormControl color="primary" className="w-full">
          <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
            لیست رزروهای بیمار
          </InputLabel>
          <Select
            onChange={(e) => setValReservPatient(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="لیست رزروهای بیمار"
            color="primary"
            value={valReservPatient}
          >
            {reservUser.length > 0 &&
              reservUser.map((e) => (
                <MenuItem key={e.reservationId} value="all">
                  <span>{e.reservationTimeDateFA}</span>
                  <span>
                    ساعت {e.reservationTimeFromTime} تا {e.reservationTimeToTime}
                  </span>
                </MenuItem>
              ))}
            {reservUser.length === 0 && <MenuItem>صفحه رزرو خالی است</MenuItem>}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
