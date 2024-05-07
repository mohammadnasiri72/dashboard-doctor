import React from 'react'
import Layout from '../../layouts';
import MainPageVisit from '../../components/visit/MainPageVisit';


visit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function visit() {
  return (
    <>
        <MainPageVisit />
    </>
  )
}
