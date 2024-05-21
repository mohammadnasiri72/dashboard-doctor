import React from 'react'
import MainPageVisitHistory from '../../components/VisitHistory/mainPageHistoryVisit'
import Layout from '../../layouts';


visitHistory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function visitHistory() {
  return (
    <>
    <MainPageVisitHistory />
    </>
  )
}
