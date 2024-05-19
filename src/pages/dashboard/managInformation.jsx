import React from 'react'
import Layout from '../../layouts';
import MainPageManagInformation from '../../components/ManageInformation/MainPageManagInformation';


managInformation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function managInformation() {
  return (
    <>
    <MainPageManagInformation />
    </>
  )
}
