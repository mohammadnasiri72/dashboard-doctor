import React from 'react'
import Layout from '../../layouts';
import MyReservation from '../../components/myReservation/myReservation';

ViewReservation.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };

export default function ViewReservation() {
  return (
    <>
        <div className='text-start'>
            <h3 className='text-3xl font-bold'>نوبت های من</h3>
        </div>
        <MyReservation />
    </>
  )
}
