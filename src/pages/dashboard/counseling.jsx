import React from 'react'
import Layout from '../../layouts';
import MainCounselingPage from '../../components/Counseling/MainCounselingPage';




Counseling.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };


export default function Counseling() {
  return (
    <>
        <MainCounselingPage />
    </>
  )
}
