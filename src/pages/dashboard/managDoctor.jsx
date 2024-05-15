import React from 'react'
import Layout from '../../layouts';
import MainPageManageDoctor from '../../components/ManageDoctor/MainPageManageDoctor';



managDoctor.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  
export default function managDoctor() {
  return (
    <>
      <MainPageManageDoctor />
    </>
  )
}
