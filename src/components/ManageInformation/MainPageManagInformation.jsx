import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineMinimize } from 'react-icons/md';
import Swal from 'sweetalert2';
import { mainDomain } from '../../utils/mainDomain';
import SimpleBackdrop from '../backdrop';
import TableManageInfo from './TableManageInfo';

export default function MainPageManagInformation() {
  const [showManageInfo, setShowManageInfo] = useState(false);
  const [showManageCategoryDrug, setShowManageCategoryDrug] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [titleNewCategory, setTitleNewCategory] = useState('');
  const [descNewCategory, setDescNewCategory] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [typeList, setTypeList] = useState([]);
  const [valTypeList, setValTypeList] = useState('');
  const [typeCategoryList, setTypeCategoryList] = useState([]);
  const [valTypeCategoryList, setValTypeCategoryList] = useState('');
  const [titleType, setTitleType] = useState('');
  const [priority, setPriority] = useState(0);
  const [isActive, setisActive] = useState(true);
  const [descType, setDescType] = useState('');

  // import sweet alert-2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: 'toast-modal',
  });

  // get list typeList & category type
  useEffect(() => {
    axios
      .get(mainDomain + '/api/BasicInfo/Type/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setTypeList(res.data);
      })
      .catch((err) => {});

    if (valTypeList) {
      axios
        .get(mainDomain + '/api/BasicInfo/Category/GetList', {
          params: {
            typeId: valTypeList,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          setTypeCategoryList(res.data);
        })
        .catch((err) => {});
    }
  }, [flag, valTypeList]);

  // set new drug
  const newTypeHandler = () => {
    Swal.fire({
      title: 'ثبت تایپ جدید',
      text: 'آیا از ثبت تایپ جدید مطمئن هستید؟',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تایید ',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          medicalCategoryId: valTypeCategoryList,
          name: titleType,
          description: descType,
          isActive,
          priority,
        };
        axios
          .post(mainDomain + '/api/BasicInfo/Item/Add', data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              text: 'تایپ با موفقیت ثبت شد',
            });
            setIsEdit(false);
            setDescType('');
            setisActive(true);
            setPriority(0);
            setValTypeList('');
            setValTypeCategoryList('');
            setIsLoading(false);
            setFlag((e) => !e);
            setTitleType('');
          })
          .catch((err) => {
            setIsLoading(false);
            Toast.fire({
              icon: 'error',
              text: err.response ? err.response.data : 'خطای شبکه',
            });
          });
      }
    });
  };

  // set new category
  // const setNewCategoryHandler = () => {
  //   Swal.fire({
  //     title: 'ثبت دسته بندی جدید',
  //     text: 'آیا از ثبت دسته بندی جدید مطمئن هستید؟',
  //     showCancelButton: true,
  //     confirmButtonColor: 'green',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'انصراف',
  //     confirmButtonText: 'تایید ',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setIsLoading(true);
  //       const data = {
  //         isActive: true,
  //         priority: 0,
  //         title: titleNewCategory,
  //         description: descNewCategory,
  //       };
  //       axios
  //         .post(mainDomain + '/api/MedicationCategory/Add', data, {
  //           headers: {
  //             Authorization: 'Bearer ' + localStorage.getItem('token'),
  //           },
  //         })
  //         .then((res) => {
  //           setIsLoading(false);
  //           Toast.fire({
  //             icon: 'success',
  //             text: 'دسته بندی جدید با موفقیت ثبت شد',
  //           });
  //           // setValCategoryDrug(categoryDrug.find((ev) => ev.title === titleNewCategory).medicationCategoryId);
  //           setIsLoading(false);
  //           setFlag((e) => !e);
  //           setTitleNewCategory('');
  //           setDescNewCategory('');
  //         })
  //         .catch((err) => {
  //           setIsLoading(false);
  //           Toast.fire({
  //             icon: 'error',
  //             text: err.response ? err.response.data : 'خطای شبکه',
  //           });
  //         });
  //     }
  //   });
  // };

  // edit drug
  // const editDrugHandler = () => {
  //   setIsLoading(true);
  //   const data = {
  //     medicationId: editId,
  //     medicalCategoryId: valCategoryDrug,
  //     name: nameDrug,
  //     description: descType,
  //     defaultForm: valDrugForm.name,
  //     defaultDosage: valDrugDose.name,
  //     defaultFrequency: valDrugUseCycle.name,
  //     isActive,
  //     priority,
  //   };
  //   axios
  //     .post(mainDomain + '/api/Medication/Update', data, {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       setFlag((e) => !e);
  //       setIsEdit(false);
  //       setShowManageInfo(false);
  //       setNameDrug('');
  //       setDescType('');
  //       setValDrugForm({});
  //       setValDrugDose({});
  //       setValDrugUseCycle({});
  //       setisActive(true);
  //       setPriority(0);
  //       setValCategoryDrug('');
  //       Toast.fire({
  //         icon: 'success',
  //         text: 'دارو با موفقیت ویرایش شد',
  //       });
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       setIsEdit(false);
  //       setShowManageInfo(false);
  //       Toast.fire({
  //         icon: 'error',
  //         text: err.response ? err.response.data : 'خطای شبکه',
  //       });
  //     });
  // };

  return (
    <>
      <div className="text-start relative">
        {!isEdit && (
          <button
            onClick={() => setShowManageInfo(!showManageInfo)}
            className="sticky top-5 flex items-center text-white px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600"
          >
            <span className="px-2">{showManageInfo ? 'بستن' : 'افزودن لیست تایپ ها'}</span>
            {!showManageInfo && <FaPlus />}
            {showManageInfo && <MdOutlineMinimize />}
          </button>
        )}
        <div
          style={{
            opacity: showManageInfo ? '1' : '0',
            visibility: showManageInfo ? 'visible' : 'hidden',
            height: showManageInfo ? '22rem' : '0',
            zIndex: '12',
          }}
          className="border overflow-hidden sticky top-12 left-0 right-0 bottom-0 duration-500 px-3 bg-white shadow-lg"
        >
          {!isEdit && (
            <button onClick={() => setShowManageInfo(false)} className="absolute bottom-0 left-1/2">
              <IoIosArrowUp className="text-3xl rounded-t-full bg-slate-200 translate-y-2 w-14 hover:bg-slate-300 duration-300" />
            </button>
          )}
          <div className="mt-5 flex items-center">
            {/* select title type */}
            <div>
              <FormControl color="primary" className="w-56">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست تایپ ها
                </InputLabel>
                <Select
                  onChange={(e) => setValTypeList(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست تایپ ها"
                  color="primary"
                  value={valTypeList}
                >
                  {typeList.map((e) => (
                    <MenuItem key={e.typeId} value={e.typeId}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* select category type */}
            <div className="pr-2">
              <FormControl color="primary" className="w-56">
                <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                  لیست دسته بندی های تایپ
                </InputLabel>
                <Select
                  onChange={(e) => setValTypeCategoryList(e.target.value)}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="لیست دسته بندی های تایپ"
                  color="primary"
                  value={valTypeCategoryList}
                >
                  {typeCategoryList.map((e) => (
                    <MenuItem key={e.categoryId} value={e.categoryId}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {!isEdit && (
              <div className="px-2 flex">
                <button
                  onClick={() => setShowManageCategoryDrug(!showManageCategoryDrug)}
                  className="text-white rounded-md p-4 bg-green-500 duration-300 hover:bg-green-600"
                >
                  {showManageCategoryDrug ? <FaMinus /> : <FaPlus />}
                </button>
              </div>
            )}
            <div className="text-start " dir="rtl">
              <TextField
                style={{
                  transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManageCategoryDrug ? '1' : '0',
                  visibility: showManageCategoryDrug ? 'visible' : 'hidden',
                }}
                onChange={(e) => setTitleNewCategory(e.target.value)}
                className=" text-end duration-300"
                id="outlined-multiline-flexible"
                label="نام دسته بندی جدید"
                multiline
                dir="rtl"
                value={titleNewCategory}
                maxRows={4}
              />
            </div>
            <div className="text-start px-2" dir="rtl">
              <TextField
                style={{
                  transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                  opacity: showManageCategoryDrug ? '1' : '0',
                  visibility: showManageCategoryDrug ? 'visible' : 'hidden',
                }}
                onChange={(e) => setDescNewCategory(e.target.value)}
                className=" text-end duration-300 w-96"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descNewCategory}
                maxRows={4}
              />
            </div>
            <div
              style={{
                transform: showManageCategoryDrug ? 'translateY(0)' : 'translateY(-101%)',
                opacity: showManageCategoryDrug ? '1' : '0',
                visibility: showManageCategoryDrug ? 'visible' : 'hidden',
              }}
              className="duration-300"
            >
              <button
                //   onClick={setNewCategoryHandler}
                className="p-4 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white"
              >
                ثبت
              </button>
            </div>
          </div>
          <div className="flex mt-3">
            {/* title type */}
            <div className="text-start" dir="rtl">
              <TextField
                onChange={(e) => setTitleType(e.target.value)}
                className=" text-end w-96"
                id="outlined-multiline-flexible"
                label="عنوان"
                multiline
                dir="rtl"
                value={titleType}
                maxRows={4}
              />
            </div>
            {/* select priority */}
            <div className="pr-2">
              <TextField
                onChange={(e) => setPriority(e.target.value)}
                className=" text-end w-20"
                id="outlined-multiline-flexible"
                label="اولویت"
                multiline
                dir="rtl"
                value={priority}
              />
            </div>
            {/* select condition */}
            <div className="pr-5 mt-1">
              <FormControlLabel
                value={isActive}
                onChange={() => setisActive(!isActive)}
                control={<Switch checked={isActive} />}
                label={isActive ? 'فعال' : 'غیر فعال'}
              />
            </div>
          </div>
          <div className="flex items-center">
            {/* set description */}
            <div className="text-start mt-3 w-1/2" dir="rtl">
              <TextField
                onChange={(e) => setDescType(e.target.value)}
                className=" text-end w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                multiline
                dir="rtl"
                value={descType}
                minRows={3}
              />
            </div>
          </div>
          {!isEdit && (
            <div className="mt-3">
              <button
                onClick={newTypeHandler}
                className="px-5 py-2 rounded-md bg-green-500 duration-300 hover:bg-green-600 text-white font-semibold"
              >
                ثبت
              </button>
            </div>
          )}
          {isEdit && (
            <div className="flex mt-3">
              <div className="px-2">
                <button
                  // onClick={editDrugHandler}
                  className="bg-green-500 hover:bg-green-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  ویرایش
                </button>
              </div>
              <div className="px-2">
                <button
                  onClick={() => {
                    // setIsEdit(false);
                    // setNameDrug('');
                    // setDescType('');
                    // setValDrugForm({});
                    // setValDrugDose({});
                    // setValDrugUseCycle({});
                    // setisActive(true);
                    // setPriority(0);
                    // setShowManageInfo(false);
                    // setValCategoryDrug('');
                  }}
                  className="bg-red-500 hover:bg-red-600 duration-300 px-5 py-2 rounded-md text-white"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5">
          {/* <TableManageDrug
              valCategoryDrug={valCategoryDrug}
              categoryDrug={categoryDrug}
              flag={flag}
              setShowManageInfo={setShowManageInfo}
              setDescType={setDescType}
              drugForm={drugForm}
              setValDrugForm={setValDrugForm}
              drugDose={drugDose}
              setValDrugDose={setValDrugDose}
              drugUseCycle={drugUseCycle}
              setValDrugUseCycle={setValDrugUseCycle}
              setNameDrug={setNameDrug}
              setValCategoryDrug={setValCategoryDrug}
              setPriority={setPriority}
              setisActive={setisActive}
              setIsLoading={setIsLoading}
              setFlag={setFlag}
              setIsEdit={setIsEdit}
              setEditId={setEditId}
            /> */}
          <TableManageInfo />
        </div>
      </div>
      {isLoading && <SimpleBackdrop />}
    </>
  );
}
