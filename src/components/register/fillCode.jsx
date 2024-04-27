import React, { createRef, useRef, useState } from 'react';

export default function InputFillCode({ setCode }) {
  const inpCode = useRef(new Array(6).fill('').map(() => createRef()));
  const [valueInputCode, setValueInputCode] = useState(new Array(6).fill(''));
  let numberCode = '';
  const arrCode = valueInputCode;
  const fillCodeHandler = (e, i) => {
    arrCode[i] = e.target.value.slice(0, 1);
    if (arrCode[i].match(/^[0-9]?$/)) {
      setValueInputCode([...arrCode]);
      if (i < 5) {
        inpCode.current[i + 1].current.focus();
      }
      if (valueInputCode[i] === '') {
        inpCode.current[i].current.focus();
      }
    }
    valueInputCode.map((e) => numCodHandler(e));
    setCode(numberCode);
  };
  function numCodHandler(e) {
    numberCode += e;
  }
  return (
    <>
      <div className=" mx-auto mt-4">
        <div className=" mx-auto mt-4">
          <h3 className="text-start w-1/2 mx-auto">کد ارسال شده:</h3>
          <div className="flex mt-5 justify-center px-2 w-full" dir="ltr">
            {new Array(6).fill().map((e, i) => (
              <div key={i} className="px-1 overflow-hidden">
                <input
                  tabIndex={i + 1}
                  ref={inpCode.current[i]}
                  value={valueInputCode[i]}
                  onChange={(e) => fillCodeHandler(e, i)}
                  className="sm:w-16 w-12 bg-slate-400 text-[#fff8] text-3xl text-center outline-none p-2 rounded-lg"
                  type="text"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
