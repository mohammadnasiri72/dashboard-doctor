import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Iconify from '../Iconify';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GiCancel } from 'react-icons/gi';
import { TbDoorEnter } from 'react-icons/tb';
import { FaMobile } from 'react-icons/fa';
import { BiDetail } from "react-icons/bi";

export default function BoxReceptionPatient({ reception , setPageStateVisitHistory , setReceptionSelected}) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <>
      <Card className="relative w-full">
        <CardContent>
          {/* <Box className={'flex justify-center'}>
          <img
            className="w-14 h-14 rounded-full border"
            // src={patientList.length>0 ? mainDomain + patientList.find((e) => e.nationalId === reception.patientNationalId).avatar:''}
            alt=""
          />
        </Box> */}

          {/* <div className="absolute left-3 top-6">
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
              <Tooltip title="مرحله بعد" placement="right">
                <IconButton
                //   disabled={reception.statusId > 2}
                  onClick={() => {
                    handleClose();
                    // nextToRoomDoctor(reception);
                  }}
                >
                  <TbDoorEnter
                //    style={{ color: reception.statusId > 2 ? 'rgb(51 51 51 51)' : 'rgb(34 197 94)' }} 
                   />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="ویرایش" placement="right">
                <IconButton
                  onClick={() => {
                    // editHandler(reception);
                    handleClose();
                  }}
                //   disabled={reception.statusId > 2}
                >
                  <Iconify icon={'eva:edit-fill'} />
                </IconButton>
              </Tooltip>
            </div>
            <div className="px-4">
              <Tooltip title="کنسل" placement="right">
                <IconButton
                  onClick={() => {
                    // cancelHandler(reception);
                    handleClose();
                  }}
                //   disabled={reception.statusId > 2}
                >
                  <GiCancel
                //    style={{ color: reception.statusId > 2 ? 'rgb(51 51 51 51)' : 'rgb(239 68 68)' }} 
                   />
                </IconButton>
              </Tooltip>
            </div>
          </Menu>
        </div> */}
          <div className="flex justify-between items-center">
            <Chip
            size='small'
              className=""
              label={reception.status}
              color={
                reception.statusId === 5
                  ? 'error'
                  : reception.statusId === 4
                  ? 'success'
                  : reception.statusId === 3
                  ? 'primary'
                  : reception.statusId === 2
                  ? 'warning'
                  : 'info'
              }
              variant="filled"
            />

            <h3 className="text-xl font-semibold">
              <span className="">مشخصات پذیرش</span>
            </h3>
            <Tooltip title="مشاهده جزئیات" placement="bottom">
              <IconButton onClick={()=>{
                setPageStateVisitHistory(1)
                setReceptionSelected(reception)
              }}>
                <BiDetail />
              </IconButton>
            </Tooltip>
          </div>
          <p className="mt-2">
            <span>تاریخ پذیرش :</span>
            {reception.appointmentDateFA}
          </p>
        </CardContent>
        {/* <CardActions className="h-10" disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions> */}
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>توضیحات:</Typography>
            <p className="mt-2">ساعت ورود :{reception?.startTime}</p>
            <p className="mt-2">تاریخ ورود :{reception?.appointmentDateFA}</p>
            <p className="mt-2">نام دکتر :{reception?.doctorFirstName} {reception?.doctorLastName}</p>
            <p className="mt-2 flex items-center justify-center">
              <Tooltip title="پیامک" placement="right">
                <IconButton>
                  <FaMobile className="cursor-pointer" />
                </IconButton>
              </Tooltip>
              {user? user.userPhoneNumber ? user.userPhoneNumber : '____' : '____'}
            </p>
            <p className="mt-2">نام پدر : {user? user.fatherName ? user.fatherName : '____' :'____'}</p>
          <p className="mt-2">تلفن ثابت : {user?user.tel ? user.tel : '____':'____'}</p>
          </CardContent>
        </Collapse> */}
      </Card>
    </>
  );
}
