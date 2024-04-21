import React from 'react';
import { mainDomain } from '../../utils/mainDomain';

export default function MyVisitedBox({ list, doctor }) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-1/3 p-3">
          <div className="w-16 h-16 border rounded-full cursor-pointer">
            <img className="w-full h-full rounded-full" src={mainDomain + doctor?.avatar} alt="" />
          </div>
        </div>
        <div className="w-2/3">
          <p className="font-nastaligh text-4xl">
            {doctor?.firstName} {doctor?.lastName}
          </p>
          <p className="mt-5 font-semibold">{doctor?.specialization}</p>
        </div>
      </div>
      <div className="px-10 mt-6">
        <div className="flex items-center mt-2">
          <p className="px-2">تاریخ:</p>
          <p className="px-2">{list.reservationTimeDateFA}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="px-2 whitespace-nowrap">زمان:</p>
          <p className="px-2 whitespace-nowrap">
            {list.reservationTimeFromTime} الی {list.reservationTimeToTime}
          </p>
        </div>
      </div>
    </>
  );
}
