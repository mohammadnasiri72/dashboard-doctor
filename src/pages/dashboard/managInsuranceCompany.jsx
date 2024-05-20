import React from 'react'
import Layout from '../../layouts';
import MainPageManagInsuranceCompany from '../../components/ManagInsuranceCompany/MainPageManagInsuranceCompany';



managInsuranceCompany.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function managInsuranceCompany() {
  return (
    <>
    <MainPageManagInsuranceCompany />
    </>
  )
}
