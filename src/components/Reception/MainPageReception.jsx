import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaPlus } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import MainRegisterPage from '../register/mainRegisterPage';
import SecoundRegisterPage from '../register/secoundRegisterPage';
import AddInsurance from './AddInsurance';
import BoxChangDate from './BoxChangDate';
import BoxReception from './BoxReception';
import CheckBoxDoctor from './CheckBoxDoctor';
import FilterCondition from './FilterCondition';
import InputCondition from './InputCondition';
import InputConditionReception from './InputConditionReception';
import InputDate from './InputDate';
import InputDoctorSelect from './InputDoctorSelect';
import InputPatientList from './InputPatientList';
import InputTypeReception from './InputTypeReception';
import InsuranceList from './InsuranceList';
import ReserveListPatient from './ReserveListPatient';
import ServicesList from './ServicesList';
import TableInsuranceSelected from './TableInsuranceSelected';

export default function MainPageReception() {
  const [pageStateReception, setPageStateReception] = useState(0);
  const [valReservPatient, setValReservPatient] = useState('');
  const [userSelected, setUserSelected] = useState([]);
  const [reservUser, setReservUser] = useState([]);
  const [showAddInsurance, setShowAddInsurance] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [registerModel, setRegisterModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [paid, setPaid] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [valTimeStart, setValTimeStart] = useState(new Date().toLocaleDateString('fa-IR'));
  const [valTimeEnd, setValTimeEnd] = useState(new Date());
  const [insuranceListSelected, setInsuranceListSelected] = useState([]);
  const [insuranceList, setInsuranceList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [valCondition, setValCondition] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [turn, setTurn] = useState(1);
  const [notes, setNotes] = useState('');
  const [statusId, setStatusId] = useState(1);
  const [valType, setValType] = useState(1);
  const [conditionVal, setConditionVal] = useState(-1);
  const [receptions, setReceptions] = useState([]);
  const [fromPersianDate, setFromPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [toPersianDate, setToPersianDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [statusCondition, setStatusCondition] = useState('');
  const [changStatusCondition, setChangStatusCondition] = useState(false);
  const [editeUser, setEditeUser] = useState({});
  const [insuranceUser, setInsuranceUser] = useState([]);
  const [valInsurance, setValInsurance] = useState([]);
  const [servicesUser, setServicesUser] = useState([]);
  const [listServices, setListServices] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState([]);


  useEffect(() => {
    if (editeUser.paid) {
      setPaid(editeUser.paid);
    }
    if (editeUser.appointmentId) {
      axios
        .get(mainDomain + '/api/Appointment/Insurance/GetList', {
          params: {
            appointmentId: editeUser.appointmentId,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setInsuranceUser(res.data);
        })
        .catch((err) => {});

      axios
        .get(mainDomain + '/api/Appointment/Service/GetList', {
          params: {
            appointmentId: editeUser.appointmentId,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setServicesUser(res.data);
        })
        .catch((err) => {});

      axios
        .get(mainDomain + '/api/MedicalRecord/GetList', {
          params: {
            appointmentId: editeUser.appointmentId,
            typeId: 1,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setMedicalRecord(res.data);
        })
        .catch((err) => {});
    }
  }, [editeUser]);
  useEffect(() => {
    axios
      .get(mainDomain + '/api/Appointment/GetList', {
        params: {
          typeId: valType,
          patientNationalId: userSelected.nationalId,
          doctorMedicalSystemId: -1,
          fromPersianDate,
          toPersianDate,
          statusId: -1,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setReceptions(res.data);
      })
      .catch((err) => {});
  }, [toPersianDate, fromPersianDate, userSelected, valType, changStatusCondition, pageStateReception]);

  useEffect(() => {
    let arr = [];
    insuranceListSelected.map((e) => {
      arr.push({
        appointmentId: 0,
        insuranceId: e.insuranceId,
      });
    });
    setInsuranceList(arr);
  }, [insuranceListSelected]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });
  const showAddInsuranceHandler = () => {
    if (userSelected.length === 0) {
      Toast.fire({
        icon: 'error',
        text: 'لطفا ابتدا بیمار را ثبت کنید',
      });
    } else {
      setShowAddInsurance(true);
    }
  };
  useEffect(() => {
    setNotes(editeUser?.notes ? editeUser.notes : '');
    // setTurn(1);
    // setPaid(false);
    // setValReservPatient('');
    // setReservUser([]);
    // setValType(1)
  }, [pageStateReception]);
  const submitFormHandler = () => {
    setIsLoading(true);
    const dataForm = {
      patientId: userSelected.patientId,
      paid,
      doctorId,
      dateFa: date,
      startTime: valTimeStart.format(),
      endTime: valTimeEnd.format(),
      insuranceList,
      serviceList,
      statusAdmissionIdList: [...new Set(valCondition)],
      turn,
      notes,
      statusId,
    };
    axios
      .post(mainDomain + '/api/Appointment/Add', dataForm, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'پذیرش با موفقیت انجام شد',
        });
        setPageStateReception(0);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  };
  const editeFormHandler = ()=>{
    setIsLoading(true);
    const dataForm = {
      appointmentId:editeUser.appointmentId,
      patientId: userSelected.patientId,
      paid,
      doctorId,
      dateFa: date,
      startTime: valTimeStart.format(),
      endTime: valTimeEnd.format(),
      insuranceList,
      serviceList,
      statusAdmissionIdList: [...new Set(valCondition)],
      turn,
      notes,
      statusId,
    }
    axios
      .post(mainDomain + '/api/Appointment/Edit', dataForm, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'success',
          text: 'پذیرش با موفقیت ویرایش شد',
        });
        setPageStateReception(0);
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: 'error',
          text: err.response ? err.response.data : 'خطای شبکه',
        });
      });
  }
  return (
    <>
      {pageStateReception === 0 && (
        <div>
          <div className="flex justify-start">
            <InputTypeReception valType={valType} setValType={setValType} editeUser={editeUser}/>
            <InputCondition conditionVal={conditionVal} setConditionVal={setConditionVal} />
            <InputDoctorSelect pageStateReception={pageStateReception} setDoctorId={setDoctorId} doctorId={doctorId} />
            <InputPatientList
              pageStateReception={pageStateReception}
              setUserSelected={setUserSelected}
              patientList={patientList}
              setPatientList={setPatientList}
              userSelected={userSelected}
            />
            <InputDate setFromPersianDate={setFromPersianDate} setToPersianDate={setToPersianDate} />
            <div className="px-5 py-2 rounded-md text-white bg-green-500 duration-300 hover:bg-green-600 flex items-center">
              <button
                onClick={() => {
                  setPageStateReception(1);
                  setEditeUser([]);
                  setValInsurance([]);
                  setInsuranceListSelected([]);
                  setInsuranceUser([]);
                  setListServices([]);
                  setPaid(false);
                  setStatusId(1);
                  setValType(1);
                  setServicesUser([])
                  setMedicalRecord([])
                  setServiceList([])
                  setValCondition([])
                }}
                className=" flex items-center"
              >
                <span className="px-2 whitespace-nowrap">پذیرش جدید</span>
                <FaPlus />
              </button>
            </div>
          </div>

          <FilterCondition
            pageStateReception={pageStateReception}
            receptions={receptions}
            setStatusCondition={setStatusCondition}
            userSelected={userSelected}
            fromPersianDate={fromPersianDate}
            toPersianDate={toPersianDate}
          />
          <div className="mt-5">
            <BoxReception
              receptions={receptions}
              patientList={patientList}
              statusCondition={statusCondition}
              setChangStatusCondition={setChangStatusCondition}
              setPageStateReception={setPageStateReception}
              setUserSelected={setUserSelected}
              setEditeUser={setEditeUser}
            />
          </div>
        </div>
      )}
      {pageStateReception === 1 && (
        <div>
          <div className="text-start mb-5">
            <button
              onClick={() => {
                setPageStateReception(0)
                setValType(1)
                setEditeUser([])
                setMedicalRecord([])
                setListServices([]);
                setServiceList([])
                setServicesUser([])
                setValCondition([])
              }}
              className="bg-blue-500 text-white px-5 py-2 rounded-md duration-300 hover:bg-blue-600"
            >
              برگشت به صفحه قبل
            </button>
          </div>
          <div className="flex justify-start">
            <InputTypeReception valType={valType} setValType={setValType} editeUser={editeUser} />
            <InputDoctorSelect pageStateReception={pageStateReception} setDoctorId={setDoctorId} doctorId={doctorId} />
            <InputPatientList
              pageStateReception={pageStateReception}
              setUserSelected={setUserSelected}
              patientList={patientList}
              setPatientList={setPatientList}
              userSelected={userSelected}
              editeUser={editeUser}
            />
            <button
              onClick={() => setPageStateReception(2)}
              className="px-5 py-2 rounded-md text-white bg-green-500 duration-300 hover:bg-green-600"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex justify-start mt-5">
            <ReserveListPatient
              valReservPatient={valReservPatient}
              setValReservPatient={setValReservPatient}
              userSelected={userSelected}
              reservUser={reservUser}
              setReservUser={setReservUser}
              pageStateReception={pageStateReception}
            />
            <BoxChangDate
              valReservPatient={valReservPatient}
              reservUser={reservUser}
              userSelected={userSelected}
              setDate={setDate}
              date={date}
              valTimeStart={valTimeStart}
              setValTimeStart={setValTimeStart}
              setValTimeEnd={setValTimeEnd}
              valTimeEnd={valTimeEnd}
              setTurn={setTurn}
              turn={turn}
              editeUser={editeUser}
            />
          </div>
          <div className="flex items-center">
            <InsuranceList
              insuranceUser={insuranceUser}
              flag={flag}
              userSelected={userSelected}
              setInsuranceListSelected={setInsuranceListSelected}
              valInsurance={valInsurance}
              setValInsurance={setValInsurance}
            />
            <div className="px-4">
              <button
                onClick={showAddInsuranceHandler}
                className="px-5 py-2 rounded-md bg-blue-500 text-white duration-300 hover:bg-blue-600 mt-4"
              >
                افزودن بیمه
              </button>
            </div>
          </div>
          <div className="mt-4">
            <TableInsuranceSelected insuranceListSelected={insuranceListSelected} />
          </div>
          <div>
            <ServicesList
              userSelected={userSelected}
              setServiceList={setServiceList}
              servicesUser={servicesUser}
              listServices={listServices}
              setListServices={setListServices}
            />
          </div>
          <div className="mt-10">
            <CheckBoxDoctor
              valCondition={valCondition}
              setValCondition={setValCondition}
              medicalRecord={medicalRecord}
            />
          </div>
          <div className="mt-5 flex items-center">
            <InputConditionReception setStatusId={setStatusId} statusId={statusId} editeUser={editeUser}/>
            <FormControlLabel
              onChange={() => setPaid(!paid)}
              className="px-10"
              control={<Checkbox checked={paid} />}
              label={'پرداخت شده'}
            />
          </div>
          <div className=" text-start mt-4" dir="rtl">
            <TextField
              onChange={(e) => setNotes(e.target.value)}
              className="w-1/2 text-end"
              id="outlined-multiline-flexible"
              label="یادداشت"
              multiline
              dir="rtl"
              value={notes}
              minRows={4}
            />
          </div>
          <div className="text-start mt-5">
            {
              editeUser.appointmentId &&
              <button
              onClick={editeFormHandler}
              className="px-5 py-2 bg-green-500 text-white rounded-md duration-300 hover:bg-green-600"
            >
              ویرایش
            </button>
            }
            {
              !editeUser.appointmentId &&
            <button
              onClick={submitFormHandler}
              className="px-5 py-2 bg-green-500 text-white rounded-md duration-300 hover:bg-green-600"
            >
              ثبت پذیرش
            </button>
            }
          </div>
          <div
            style={{ zIndex: '1300', transform: showAddInsurance ? 'translateX(0)' : 'translateX(-100%)' }}
            className="fixed top-0 bottom-0 right-2/3 left-0 bg-slate-50 duration-500 p-5 shadow-lg overflow-y-auto"
          >
            <AddInsurance userSelected={userSelected} setShowAddInsurance={setShowAddInsurance} setFlag={setFlag} />
          </div>
          <div
            style={{ zIndex: '1299', display: showAddInsurance ? 'block' : 'none' }}
            onClick={() => setShowAddInsurance(false)}
            className="fixed top-0 left-0 right-0 bottom-0 bg-[#000c]"
          />
        </div>
      )}
      {pageStateReception === 2 && (
        <div>
          {
            <div className="px-3">
              <button
                onClick={() => setPageStateReception(1)}
                className="bg-blue-500 px-5 py-2 rounded-md duration-300 text-white hover:bg-blue-600 flex items-center"
              >
                <FaArrowRight />
                <span className="px-2">برگشت به صفخه قبل</span>
              </button>
            </div>
          }
          {!isRegister && (
            <MainRegisterPage
              setIsRegister={setIsRegister}
              setRegisterModel={setRegisterModel}
              setIsLoading={setIsLoading}
            />
          )}
          {isRegister && (
            <SecoundRegisterPage
              setPageStateReception={setPageStateReception}
              pageStateReception={pageStateReception}
              registerModel={registerModel}
              setIsRegister={setIsRegister}
              setIsLoading={setIsLoading}
            />
          )}
          {isLoading && <SimpleBackdrop />}
        </div>
      )}
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
