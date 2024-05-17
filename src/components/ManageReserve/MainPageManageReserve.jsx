import { useEffect, useState } from 'react';
import SelectTimeReserve from './SelectTimeReserve';
import SimpleBackdrop from '../backdrop';
import BoxTimeReserve from './BoxTimeReserve';

export default function MainPageManageReserve() {
  const [isLoading, setIsLoading] = useState(false);
  const [valDoctor, setValDoctor] = useState([]);
  const [year, setYear] = useState('');
  const [mount, setMount] = useState('');

  const converter = (text) => text.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
  useEffect(() => {
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
      
       setYear={setYear}
      
       setMount={setMount}
      />
      <hr className="mt-3" />
      <BoxTimeReserve moon={mount} year={year} valDoctor={valDoctor}/>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
