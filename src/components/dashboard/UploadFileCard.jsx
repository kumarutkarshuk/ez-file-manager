import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";


const UploadFileCard = () => {
  return (
    <button className='flex border rounded-md w-[300px] justify-between p-2'>
        <div className='flex items-center gap-2'>
            <FaCloudUploadAlt  className='text-4xl'/>
            <p>Upload New File</p>
        </div>
    </button>
  )
}

export default UploadFileCard