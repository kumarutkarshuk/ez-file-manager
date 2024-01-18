import React from 'react'
import { FaFolderPlus } from "react-icons/fa6";
import { useState } from 'react';
import { FcCancel } from "react-icons/fc";
import { MdCheck } from "react-icons/md";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createFolder } from '../../services/operations/dataAPI';

const NewFolderCard = () => {
  const [clicked, setClicked] = useState(false)
  const [newName, setNewName] = useState("")
  const {currentFolder} = useSelector(state => state.data)
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleCreateFolder = () => {
    if(newName === ""){
      toast.error('Please enter name of new folder')
    }
    else{
      createFolder(dispatch, {token, name: newName, parentFolder: currentFolder})
      setClicked(false)
    }
  }
  return (
    <div className='flex flex-col'>
      <button className='flex border rounded-md w-[300px] justify-between p-2'
      onClick={()=>setClicked(true)}>
        <div className='flex items-center gap-2'>
            <FaFolderPlus   className='text-4xl'/>
            <p>Create New Folder</p>
        </div>
      </button>
      <div className={`flex justify-between ${clicked ? 'block' : 'hidden'} w-[300px]`}>
            <input type="text" className='border w-full outline-none px-2' 
            placeholder='Enter new folder name'
            onChange={(e) => setNewName(e.target.value)}
            />
            <div className='flex text-xl'>
              <button onClick={()=>{setClicked(false)}}><FcCancel /></button>
              <button onClick={handleCreateFolder}><MdCheck className='text-[#00FF00]'/></button>
            </div>
        </div>
    </div>
  )
}

export default NewFolderCard