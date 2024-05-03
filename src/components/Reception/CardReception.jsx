import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, Menu, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineMoreTime } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import Iconify from '../Iconify';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardReception({ reception, patientList }) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState([]);
  let patient = [...patientList]
  useEffect(() => {
    setUser(patient.find((e) => e.nationalId === reception.patientNationalId));
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ minWidth: 320 }}>
      <CardContent>
        <Box className={'flex justify-center'}>
          <img className="w-14 h-14 rounded-full border" src={'/images/bg.jpeg'} alt="" />
        </Box>
          <Chip className='absolute top-6 right-3' label={reception.status} color='secondary' variant="filled" />
        <div className="absolute left-3 top-6">
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <IconButton>
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="حذف" placement="right">
                <IconButton>
                  <Iconify className="text-red-500" icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="همراه" placement="right">
                <IconButton>
                  <TiGroup />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="نوبت دهی اینترنتی" placement="right">
                <IconButton>
                  <MdOutlineMoreTime />
                </IconButton>
              </Tooltip>
            </div>
          </Menu>
        </div>
        <h3 className="text-xl font-semibold">
          {reception.patientFirstName} {reception.patientLastName}
        </h3>
        <p className="mt-2">کد ملی : {reception.patientNationalId}</p>
        <p className="mt-2">ساعت ورود : {reception.startTime}</p>
        <p className="mt-2">تاریخ ورود : {reception.appointmentDateFA}</p>
        <p className="mt-2">
          نام دکتر : {reception.doctorFirstName} {reception.doctorLastName}
        </p>
        <p className="mt-2"> شماره موبایل : {user.userPhoneNumber}</p>

      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>توضیحات:</Typography>
          <p className="mt-2">نام پدر : {user.fatherName}</p>
          <p className="mt-2">تلفن ثابت : {user.tel}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
}
