import {
  Container,
  Typography
} from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import FormUpdateProfile from '../../components/updateProfile/formUpdateProfile';
import UploaderImage from '../../components/updateProfile/uploaderImage';
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
