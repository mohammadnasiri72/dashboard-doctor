import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { mainDomain } from '../../utils/mainDomain';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function SecoundPageVisit({patSelected}) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [infoPat, setInfoPat] = React.useState({});
    console.log(infoPat);

  useEffect(() => {
    axios
      .get(mainDomain + '/api/Patient/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setInfoPat(res.data.find((e)=>e.nationalId === patSelected.patientNationalId));
      })
      .catch((err) => {});
  }, []);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className='flex'>
        
        <Box
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 200,
        width: '100%'
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="اطلاعات بیمار" {...a11yProps(0)} />
          <Tab label="تشخیص و توصیه ها و شکایت های بیمار" {...a11yProps(1)} />
          <Tab label="دارو ها" {...a11yProps(2)} />
          <Tab label="اردها" {...a11yProps(2)} />
          <Tab label="فایل های ضمیمه" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {infoPat.firstName? infoPat.firstName : ""}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item four
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Item five
        </TabPanel>
      </SwipeableViews>
     
    </Box>
   
    </div>
  );
}