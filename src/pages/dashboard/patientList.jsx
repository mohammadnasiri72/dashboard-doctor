import React from 'react'
import Layout from '../../layouts';
import PatientList from '../../components/patientList/PatientList';




patientList.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };


export default function patientList() {
  return (
    <>
        <PatientList />
    </>
  )
}
