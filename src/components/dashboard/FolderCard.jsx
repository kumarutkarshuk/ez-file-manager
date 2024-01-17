import React from 'react'
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa6";
import { useState } from 'react';
import { FcCancel } from "react-icons/fc";
import { MdCheck } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { renameFolder } from '../../services/operations/dataAPI';
import { deleteFolder } from '../../services/operations/dataAPI';

const FolderCard = ({name, folderId}) => {
  const [clicked, setClicked] = useState(false)
  const [newName, setNewName] = useState("")
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleRename = () => {
    if(newName === ""){
      toast.error('Please enter a new folder name')
    }
    else{
      renameFolder(dispatch, {token, folderId, name: newName})
      setClicked(false)
    }
  }
  const handleDelete = () => {
    deleteFolder(dispatch, {token, folderId})
  }
  return (
    <div className='flex flex-col'>
      <div className='flex border rounded-md w-[300px] justify-between p-2'>
        <div className='flex items-center gap-2'>
            <FaFolder className='text-4xl text-[#F8D775]'/>
            <p>{name}</p>
        </div>
        
        <div className='flex items-center text-xl gap-4'>
            <FaRegFolderOpen />
            <button onClick={()=>{setClicked(true)}}><MdDriveFileRenameOutline /></button>
            <button onClick={handleDelete}><MdDelete/></button>
        </div>
        
      </div>
      <div className={`flex justify-between ${clicked ? 'block' : 'hidden'}`}>
          <input type="text" className='border w-full outline-none px-2' 
          placeholder='Enter new folder name'
          onChange={(e) => setNewName(e.target.value)}
          />
          <div className='flex text-xl'>
            <button onClick={()=>{setClicked(false)}}><FcCancel /></button>
            <button onClick={handleRename}><MdCheck className='text-[#00FF00]'/></button>
            
          </div>
        </div>
    </div>
    
  )
}

export default FolderCard