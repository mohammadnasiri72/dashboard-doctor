import React from 'react'
import Layout from '../../layouts';
import MyReservation from '../../components/myReservation/myReservation';

ViewReservation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default function ViewReservation() {
  return (
    <>
        
        <MyReservation />
    </>
  )
}
