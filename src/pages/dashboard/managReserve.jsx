import React from 'react'
import Layout from '../../layouts';
import MainPageManageReserve from '../../components/ManageReserve/MainPageManageReserve';


managReserve.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function managReserve() {
  return (
    <>
        <MainPageManageReserve />
    </>
  )
}
