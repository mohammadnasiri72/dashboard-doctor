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

export default function UpdateProfile() {
  const { themeStretch } = useSettings();

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
