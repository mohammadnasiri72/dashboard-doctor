import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainDomain } from '../../utils/mainDomain'

export default function BoxTimeReserve({moon , year , valDoctor}) {
    const [listDay , setListDay] = useState([])
    const [listTime , setListTime] = useState([])
console.log(listTime);
    // get day reserve
    useEffect(()=>{
        if (moon && year && valDoctor) {
            axios
            .get(mainDomain+'/api/ReservationTime/GetList' , {
                params:{
                    doctorId: valDoctor,
                    dateFa: year+'/'+moon+'/00'
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
            })
            .then((res)=>{
                setListDay(res.data);
            })
            .catch((err)=>{
    
            })
            
        }
    },[moon , year , valDoctor])


    const setTimeReserveHandler = (e)=>{
        axios
        .get(mainDomain+'/api/ReservationTime/GetList' , {
            params:{
                doctorId: valDoctor,
                dateFa: e.dateFa
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
        })
        .then((res)=>{
            setListTime(res.data[0].reservationTimes);
        })
        .catch((err)=>{

        })
    }
  return (
    <>
    <div className='flex mt-3'>
        <div className='w-1/4 px-3'>
            <div className='h-[80vh] border rounded-lg overflow-auto p-3  pb-10'>
                {
                    listDay.map((e , i)=>(
                       <div  key={i} className='mt-7 flex'>
                         <span onClick={()=> setTimeReserveHandler(e)} className='bg-slate-200 rounded-md px-5 py-2 cursor-pointer duration-300 hover:bg-slate-300 w-full'>{e.dateFa}</span>
                       </div>

                    ))
                }
            </div>
        </div>
        <div className='w-3/4 px-5 h-[80vh] border rounded-lg overflow-auto'>
           <div className='flex flex-wrap py-4'>
           {
                listTime.map((e)=>(
                    <div className='w-1/5 px-2 mt-5' key={e.reservationTimeId}>
                        <div className='bg-slate-200 rounded-md px-5 py-4 w-full cursor-pointer duration-300 hover:bg-slate-300'>{e.toTime} - {e.fromTime}</div>
                    </div>
                ))
            }
           </div>
        </div>
    </div>
    </>
  )
}
