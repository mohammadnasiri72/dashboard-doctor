import { useEffect, useState } from 'react';
import SelectTimeReserve from './SelectTimeReserve';
import SimpleBackdrop from '../backdrop';
import BoxTimeReserve from './BoxTimeReserve';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';

export default function MainPageManageReserve() {
  const [isLoading, setIsLoading] = useState(false);
  const [valDoctor, setValDoctor] = useState([]);
  const [year, setYear] = useState('');
  const [mount, setMount] = useState('');
  const [numberMoon, setNumberMoon] = useState(0);
  const [flag, setFlag] = useState(flag);
  const [doctors, setDoctors] = useState([]);

  // get list doctors
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Doctor/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setDoctors(res.data);
        setValDoctor(res.data[0].doctorId);
      })
      .catch((err) => {});
  }, []);

  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
  useEffect(() => {
    setNumberMoon(
      converter(
        new Date()
          .toLocaleDateString('fa-IR')
          .slice(
            new Date().toLocaleDateString('fa-IR').indexOf('/') + 1,
            new Date().toLocaleDateString('fa-IR').lastIndexOf('/')
          )
      ) * 1
    );
    setMount(
      converter(
        new Date()
          .toLocaleDateString('fa-IR')
          .slice(
            new Date().toLocaleDateString('fa-IR').indexOf('/') + 1,
            new Date().toLocaleDateString('fa-IR').lastIndexOf('/')
          )
      ) * 1
    );
    setYear(
      converter(new Date().toLocaleDateString('fa-IR').slice(0, new Date().toLocaleDateString('fa-IR').indexOf('/'))) *
        1
    );
  }, []);

  return (
    <>
      <SelectTimeReserve
        setIsLoading={setIsLoading}
        valDoctor={valDoctor}
        setValDoctor={setValDoctor}
        setNumberMoon={setNumberMoon}
        setYear={setYear}
        setMount={setMount}
        setFlag={setFlag}
        doctors={doctors}
      />
      <hr className="mt-3" />
      <BoxTimeReserve
        moon={mount}
        year={year}
        valDoctor={valDoctor}
        numberMoon={numberMoon}
        setIsLoading={setIsLoading}
        flag={flag}
        setFlag={setFlag}
      />
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
