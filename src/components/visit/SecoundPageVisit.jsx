import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { mainDomain } from '../../utils/mainDomain';
import InformationPatient from './InformationPatient';
import DiagnosisPatient from './DiagnosisPatient';
import DrugPatient from './DrugPatient';
import TemplateVisit from './TemplateVisit';

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

export default function SecoundPageVisit({ patSelected , setIsLoading}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [infoPat, setInfoPat] = React.useState({});

  useEffect(() => {
    axios
      .get(mainDomain + '/api/Patient/GetList', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setInfoPat(res.data.find((e) => e.nationalId === patSelected.patientNationalId));
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
    <div className="flex">
      <Box
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          minHeight: 200,
          width: '100%',
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
            <InformationPatient infoPat={infoPat} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <DiagnosisPatient patSelected={patSelected} setIsLoading={setIsLoading}/>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <DrugPatient patSelected={patSelected} setIsLoading={setIsLoading}/>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
           test
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            Item five
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
