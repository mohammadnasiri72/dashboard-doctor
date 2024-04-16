import {
  Autocomplete,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import UploadAvatar from '../../components/upload/UploadAvatar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { RHFUploadAvatar } from '../../components/hook-form';
import { useRouter } from 'next/router';
import { fData } from '../../utils/formatNumber';
// import { RHFUploadAvatar } from '../../components/hook-form';

// ----------------------------------------------------------------------

UpdateProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UpdateProfile({ isEdit = false, currentUser }) {
  const { themeStretch } = useSettings();
  const [gender, setGender] = useState('m');
  const [provinces, setProvinces] = useState([{ name: 'تهران' }, { name: 'مشهد' }]);
  const [province, setProvince] = useState('');
  const [cities, setCities] = useState([{ name: 'لطفا اول استان را انتخاب کنید' }]);
  const [city, setCity] = useState('');
  const [date, setDate] = useState();

  useEffect(() => {
    province &&
      axios
        .get(`https://iran-locations-api.ir/api/v1/fa/cities?state=${province}`)
        .then((res) => {
          console.log(res.data.cities);
          setCities(res.data.cities);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [province]);

  useEffect(() => {
    axios
      .get('https://iran-locations-api.ir/api/v1/fa/states')
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { push } = useRouter();


  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || '',
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  // const onSubmit = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
  //     push(PATH_DASHBOARD.user.list);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title="Update Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography className="text-start" variant="h3" component="h1" paragraph>
          ویرایش پروفایل
        </Typography>
        <div className="flex justify-center flex-wrap">
          <div className="lg:w-1/3 w-full p-4">
            <div className="border rounded-lg h-full pt-5 relative">
              {/* <UploadAvatar /> */}

              {/* <input
                className="border rounded-full w-36 h-36 absolute top-5 left-0 translate-x-1/2 opacity-0 cursor-pointer"
                type="file"
                onChange={(e) => {
                  setFileimg(e.target.files[0].name);
                  console.log(fileimg);
                }}
              /> */}
              <div>
                {/* <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                
                
              /> */}

                {/* <RHFUploadAvatar
                  name="avatarUrl"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                /> */}
              </div>
              <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
              <p className="text-xs mt-2"> max size of 3.1 MB</p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full p-4">
            <div className="border rounded-lg pb-5">
              <div className="flex">
                <div className="w-1/2 mx-auto mt-4 px-5">
                  <TextField className="w-full" id="outlined-multiline-flexible" label="نام" multiline maxRows={4} />
                </div>
                <div className="w-1/2 mx-auto mt-4 px-5">
                  <TextField
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="نام خانوادگی"
                    multiline
                    maxRows={4}
                  />
                </div>
              </div>
              <div className="flex">
                {/* <div className="w-1/2 mx-auto mt-6 px-5">
                  <TextField
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="نام کاربری"
                    multiline
                    maxRows={4}
                  />
                </div> */}

                <div className="w-1/2 mx-auto mt-6 px-5">
                  <TextField
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="نام پدر"
                    multiline
                    maxRows={4}
                  />
                </div>
                <div className="w-1/2 mx-auto mt-6 px-5">
                  <div className=" mx-auto flex items-center">
                    <div className="px-4 w-full" dir="rtl">
                      <FormControl color="primary" className="w-24">
                        <InputLabel color="primary" className="px-2" id="demo-simple-select-label">
                          جنسیت
                        </InputLabel>
                        <Select
                          onChange={(e) => setGender(e.target.value)}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="جنسیت"
                          color="primary"
                          value={gender}
                        >
                          <MenuItem value="m">مرد</MenuItem>
                          <MenuItem value="f">زن</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mt-6 px-4">
                  <DatePicker
                    inputClass="outline-none border rounded-lg w-full h-14 px-3"
                    locale={persian_fa}
                    calendar={persian}
                    value={date}
                    onChange={(e) => {
                      setDate(new Date(e));
                    }}
                    placeholder="تاریخ تولد خود را وارد کنید"
                  />
                </div>
                <div className="w-1/2 mx-auto mt-6 px-5">
                  <TextField
                    className="w-full"
                    id="outlined-multiline-flexible"
                    label="شماره موبایل"
                    multiline
                    maxRows={4}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 mt-6 px-5">
                  <Autocomplete
                    onChange={(e) => setProvince(e.target.innerText)}
                    id="استان محل سکونت"
                    freeSolo
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
              <div className="px-5 mt-3">
                <textarea className="outline-none border w-full h-36 p-2" placeholder="آدرس محل سکونت" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}
