import React from 'react'
import CardReception from './CardReception'

export default function BoxReception({receptions , patientList}) {
  return (
    <>
    <div className='flex flex-wrap justify-center items-start'>
    {
        receptions.map((reception)=>(
            <div className='px-2 w-3/7 flex justify-center mt-3' key={reception}>
                <CardReception reception={reception} patientList={patientList}/>
            </div>

        ))
    }
    </div>
    </>
  )
}
