import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FcCancel } from "react-icons/fc";
import { MdCheck } from "react-icons/md";
import toast from 'react-hot-toast';
import { uploadFile } from '../../services/operations/dataAPI';

const UploadFileCard = () => {
  const {token} = useSelector(state => state.auth)
  const {currentFolder} = useSelector(state => state.data)
  const [clicked, setClicked] = useState(false)
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const handleUploadFile = () => {
    if(file === null){
      toast.error('Upload file')
    }
    else{
      const data = new FormData()
      data.append('uploadedFile', file)
      data.append('token', token)
      data.append('name', file.name)
      data.append('parentFolder', currentFolder)
      // console.log(data);
      uploadFile(dispatch, data)
      setClicked(false)
    }
  }
  return (
    <div className='flex flex-col'>
      <button className='flex border rounded-md w-[300px] justify-between p-2' onClick={()=>setClicked(true)}>
        <div className='flex items-center gap-2'>
            <FaCloudUploadAlt  className='text-4xl'/>
            <p>Upload New File</p>
        </div>
      </button>

      <div className={`flex ${clicked ? 'block' : 'hidden'} relative items-center w-[300px]`}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <div className='flex text-xl right-[-3px] absolute'>
              <button onClick={()=>{setClicked(false)}}><FcCancel /></button>
              <button onClick={handleUploadFile}><MdCheck className='text-[#00FF00]'/></button>
        </div>
      </div>
    </div>
  )
}

export default UploadFileCard