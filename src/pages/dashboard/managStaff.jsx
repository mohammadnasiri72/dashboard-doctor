import React from 'react'
import Layout from '../../layouts';
import MainPageManageStaff from '../../components/ManageStaff/MainPageManageStaff';



managStaff.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  
export default function managStaff() {
  return (
    <>
        <MainPageManageStaff />
    </>
  )
}
