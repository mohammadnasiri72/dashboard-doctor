import { useContext, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Account } from '../../../pages/_app';
import { mainDomain } from '../../../utils/mainDomain';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'تست1',
    linkTo: '/',
  },
  {
    label: 'تست2',
    linkTo: '/',
  },
  {
    label: 'تست3',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const account = useContext(Account);
  const route = useRouter();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logoutHandler = () => {
    // const userIdData = new FormData();
    // userIdData.append('userId', localStorage.getItem('userId'));
    const token = localStorage.getItem('token')
    axios
    .post('https://cis.aitest.ir/api/Authenticate/Logout' ,null, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    .then((response) => {
      // console.log(response);
    })
    .catch((error) => {
      // console.log(error);
    });
    localStorage.removeItem('token');
    route.replace('/login');
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={mainDomain+account.avatar} alt={account.firstName} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {dataProfile} */}
            {account.firstName}
            {' '}
            {account.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            rayan.moran@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logoutHandler} sx={{ m: 1, color: 'red' }}>
          خروج از حساب کاربری
        </MenuItem>
      </MenuPopover>
    </>
  );
}
