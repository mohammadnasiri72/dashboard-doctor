import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SelectCityUpdateProfile({province , setProvince , setCity}) {
    const [provinces, setProvinces] = useState([{ name: 'تهران' }, { name: 'مشهد' }]);
    const [cities, setCities] = useState([{ name: 'لطفا اول استان را انتخاب کنید' }]);
    useEffect(() => {
        province &&
          axios
            .get(`https://iran-locations-api.ir/api/v1/fa/cities?state=${province}`)
            .then((res) => {
            //   console.log(res.data.cities);
              setCities(res.data.cities);
            })
            .catch((err) => {
            //   console.log(err);
            });
      }, [province]);
    
      useEffect(() => {
        axios
          .get('https://iran-locations-api.ir/api/v1/fa/states')
          .then((res) => {
            setProvinces(res.data);
          })
          .catch((err) => {
            // console.log(err);
          });
      }, []);
  return (
    <>
      <div className="flex">
        <div className="w-1/2 mt-6 px-5">
          <Autocomplete
            onChange={(e) => setProvince(e.target.innerText)}
            id="province"
            options={provinces.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="استان محل سکونت" />}
          />
        </div>
        <div className="w-1/2 mt-6 px-5">
          <Autocomplete
            onChange={(e) => setCity(e.target.innerText)}
            id="شهر محل سکونت"
            freeSolo
            options={cities.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="شهر محل سکونت" />}
          />
        </div>
      </div>
    </>
  );
}
