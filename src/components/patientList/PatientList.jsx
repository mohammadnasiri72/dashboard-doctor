import React from 'react'
import AddPatient from './AddPatient'

export default function PatientList() {
  return (
    <div>
        <h2 className='text-start text-2xl font-semibold'>لیست بیماریهای من</h2>
        <div className='w-11/12 border rounded-md'>
            <h3 className='bg-slate-300 rounded-t-md mb-5 font-semibold text-xl text-gray-600 p-2'>لیست بیماریهای من</h3>
            <div className='p-3'>
            <AddPatient />
            </div>
            <hr />
            <div>123</div>
        </div>
    </div>
  )
}
