import React from 'react'
import { FaFolderPlus } from "react-icons/fa6";


const UploadFolderCard = () => {
  return (
    <button className='flex border rounded-md w-[300px] justify-between p-2'>
        <div className='flex items-center gap-2'>
            <FaFolderPlus   className='text-4xl'/>
            <p>Create New Folder</p>
        </div>
    </button>
  )
}

export default UploadFolderCard