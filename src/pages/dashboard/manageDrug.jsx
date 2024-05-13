import React from 'react'
import Layout from '../../layouts';
import MainPageManageDrug from '../../components/ManageDrug/MainPageManageDrug';



manageDrug.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
  
export default function manageDrug() {
  return (
    <>
    <MainPageManageDrug />
    </>
  )
}
