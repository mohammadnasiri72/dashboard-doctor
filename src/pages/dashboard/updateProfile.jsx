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
import UploaderImage from '../../components/updateProfile/uploaderImage';
import FormUpdateProfile from '../../components/updateProfile/formUpdateProfile';
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
            <UploaderImage />
          </div>
          <FormUpdateProfile />
        </div>
      </Container>
    </Page>
  );
}
