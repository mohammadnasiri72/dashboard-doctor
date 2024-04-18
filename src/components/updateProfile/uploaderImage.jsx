import React, { useState } from 'react'
import { UploadAvatar } from '../upload'
import axios from 'axios'

export default function UploaderImage() {
  const [file , setFile] = useState('')
  // console.log(file);
  const viewImgHandler = (e)=>{
    setFile(e.target.files[0])
    
  }
  const sendImgHakdler = ()=>{
    const token = localStorage.getItem('token')
    const fileData = new FormData()
    fileData.append("file" , file)
    axios
    .post('https://cis.aitest.ir/api/File/Upload/Image', fileData ,{
          headers: {
            Authorization: 'Bearer ' + token,
          }
        } )
        .then((res)=>{
          const fileSrc = new FormData()
          fileSrc.append('fileSrc' , res.request.response)
          axios
          .post('https://cis.aitest.ir/api/Patient/Avatar/Update' , fileSrc , {
            headers: {
              Authorization: 'Bearer ' + token,
            }
          })
          .then((res)=>{
            console.log('don');
          })
          .catch((err)=>{})
        })
        .catch((err)=>{
          // console.log(err);
        })
  }
  return (
    <>
    <div className="border rounded-lg h-full pt-5 relative">
              <input onChange={viewImgHandler} type="file" />
              <UploadAvatar file={file}/>

             
             
              <p className="text-xs mt-2">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
              <p className="text-xs mt-2"> max size of 3.1 MB</p>
            <button onClick={sendImgHakdler}>ذخیره</button>
            </div>
    </>
  )
}
