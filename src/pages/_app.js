// https://cis.aitest.ir/swagger/index.html

// scroll bar
import 'simplebar/src/simplebar.css';
import '../assets/style.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';
// utils
import { getSettings } from '../utils/settings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import Settings from '../components/settings';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
export const Account = createContext(null);
export const Change = createContext(null);
// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

export default function MyApp(props) {
  const [account, setAccount] = useState('');
  const [show, setShow] = useState(false);
  const [change, setChang] = useState(false);
  const router = useRouter();
  // console.log(account);
  useEffect(() => {
    if (!router.pathname.includes('/dashboard')) {
      setShow(true);
    }
  });
  let token = '';
  useEffect(() => {
    token = localStorage.getItem('token');
    if (!token) {
      if (router.pathname.includes('/dashboard')) {
        router.replace('/login');
        setShow(false);
      }
    } else {
      axios
        .get('https://cis.aitest.ir/api/Patient/Get', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAccount(res.data);
            setShow(true);
          } else {
            router.replace('/login');
          }
        })
        .catch((err) => {
          if (router.pathname.includes('/dashboard')) {
            router.replace('/login');
          }
        });
    }
  }, []);

  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Change.Provider value={setChang}>
        <Account.Provider value={account}>
          <CollapseDrawerProvider>
            <SettingsProvider defaultSettings={settings}>
              <ThemeProvider>
                <MotionLazyContainer>
                  <ThemeColorPresets>
                    <RtlLayout>
                      <Settings />
                      <ProgressBar />
                      {show && getLayout(<Component {...pageProps} />)}
                    </RtlLayout>
                  </ThemeColorPresets>
                </MotionLazyContainer>
              </ThemeProvider>
            </SettingsProvider>
          </CollapseDrawerProvider>
        </Account.Provider>
      </Change.Provider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
