import React from 'react'
import Layout from '../../layouts';
import MainPageManageServices from '../../components/ManageServices/MainPageManageServices';



manageServices.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  
export default function manageServices() {
  return (
    <>
    <MainPageManageServices />
    </>
  )
}
