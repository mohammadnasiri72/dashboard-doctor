import React from 'react'
import Layout from '../../layouts';
import MainpatientListStaff from '../../components/patientListStaff/MainpatientListStaff';



patientListStaff.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  
export default function patientListStaff() {
  return (
    <>
        <MainpatientListStaff />
    </>
  )
}
