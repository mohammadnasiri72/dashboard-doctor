import { Typography } from '@mui/material';
import { useState } from 'react';
import SimpleBackdrop from '../backdrop';
import MainRegisterPage from '../register/mainRegisterPage';
import SecoundRegisterPage from '../register/secoundRegisterPage';
import FormUpdateProfile from '../updateProfile/formUpdateProfile';
import UploaderImage from '../updateProfile/uploaderImage';
import NavBarListPatient from './NavBarListPatient';
import TableListPatient from './TableListPatient';
import Reserve from '../reserve/reserve';
import { FaArrowRight } from 'react-icons/fa';
import MyReservation from '../myReservation/myReservation';

export default function MainpatientListStaff() {
  const [pageState, setPageState] = useState(0);
  const [accountUpdate, setAccountUpdate] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <div>
        {pageState === 0 && (
          <div>
            <NavBarListPatient setPageState={setPageState} searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="mt-5 w-11/12 mx-auto">
              <TableListPatient
                setPageState={setPageState}
                setAccountUpdate={setAccountUpdate}
                searchValue={searchValue}
              />
            </div>
          </div>
        )}
        {pageState === 1 && (
          <div>
            <div className="flex items-center">
              <Typography className="text-start px-3" variant="h3" component="h1" paragraph>
                ویرایش پروفایل
              </Typography>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="lg:w-1/3 w-full p-4">
                <UploaderImage accountUpdate={accountUpdate} setPageState={setPageState} />
              </div>
              <FormUpdateProfile accountUpdate={accountUpdate} setPageState={setPageState} />
            </div>
          </div>
        )}
        {pageState === 2 && (
          <div>
            {accountUpdate && (
              <div className="px-3">
                <button
                  onClick={() => setPageState(0)}
                  className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                >
                  <FaArrowRight />
                  <span className="px-2">برگشت به صفخه قبل</span>
                </button>
              </div>
            )}
            {!isRegister && (
              <MainRegisterPage
                setIsRegister={setIsRegister}
                setRegisterModel={setRegisterModel}
                setIsLoading={setIsLoading}
              />
            )}
            {isRegister && (
              <SecoundRegisterPage
                pageState={pageState}
                setPageState={setPageState}
                registerModel={registerModel}
                setIsRegister={setIsRegister}
                setIsLoading={setIsLoading}
              />
            )}
            {isLoading && <SimpleBackdrop />}
          </div>
        )}
        {pageState === 3 && (
          <div>
            {accountUpdate && (
              <div className="flex">
                <div className="px-3">
                  <button
                    onClick={() => setPageState(0)}
                    className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                  >
                    <FaArrowRight />
                    <span className="px-2">برگشت به صفخه قبل</span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setPageState(4)}
                    className="bg-slate-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-slate-600 flex items-center"
                  >
                    <span className="px-2">مشاهده نوبت های بیمار</span>
                  </button>
                </div>
              </div>
            )}
            <Typography variant="h3" component="h1" paragraph>
              نوبت دهی آنلاین
            </Typography>
            <Reserve accountUpdate={accountUpdate} setPageState={setPageState} />
          </div>
        )}
        {pageState === 4 && (
          <div>
            {accountUpdate && (
              <div className="px-3 mb-5">
                <button
                  onClick={() => setPageState(0)}
                  className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
                >
                  <FaArrowRight />
                  <span className="px-2">برگشت به صفحه لیست بیماران</span>
                </button>
              </div>
            )}
            <MyReservation accountUpdate={accountUpdate} setPageState={setPageState}/>
          </div>
        )}
      </div>
    </>
  );
}
