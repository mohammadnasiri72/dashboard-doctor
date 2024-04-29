import React from 'react'
import Layout from '../../layouts';
import MainPageReception from '../../components/Reception/MainPageReception';




reception.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };
export default function reception() {
  return (
    <>
        <MainPageReception />
    </>
  )
}
