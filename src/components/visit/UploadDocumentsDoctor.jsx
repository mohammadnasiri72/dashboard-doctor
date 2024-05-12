import React, { useState } from 'react'
import UploadDocuments from '../Counseling/UploadDocuments'

export default function UploadDocumentsDoctor({patSelected , setIsLoading}) {
   const [flag , setFlag] = useState(false)
    
  return (
    <>
        <UploadDocuments apointmentId={patSelected.appointmentId} flagUpload={flag} setFlagUpload={setFlag} patSelected={patSelected}/>
    </>
  )
}
