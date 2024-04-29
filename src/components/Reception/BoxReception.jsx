import React from 'react'
import CardReception from './CardReception'

export default function BoxReception() {
  return (
    <>
    <div className='flex flex-wrap justify-center items-start'>
    {
        [0,1,2,3].map((e)=>(
            <div className='px-2 w-3/7 flex justify-center mt-3' key={e}>
                <CardReception />
            </div>

        ))
    }
    </div>
    </>
  )
}
