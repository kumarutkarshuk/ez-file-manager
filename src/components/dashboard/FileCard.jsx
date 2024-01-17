import React, { useState } from 'react'
import { CiFileOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdFileOpen } from "react-icons/md";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, renameFile } from '../../services/operations/dataAPI';
import toast from 'react-hot-toast';

const FileCard = ({name, url, fileId}) => {
  const [clicked, setClicked] = useState(false)
  const [newName, setNewName] = useState("")
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth) 

  const handleRename = () => {
    if(newName === ""){
      toast.error('Please enter a new file name')
    }
    else{
      renameFile(dispatch, {token, name: newName, fileId})
      setClicked(false)
    }
  }
  const handleDelete = () => {
    deleteFile(dispatch, {token, fileId})
  }
  return (
    <div className='flex flex-col'>
        <div className='flex border rounded-md w-[300px] justify-between p-2'>

          <div className='flex items-center gap-2'>
              <CiFileOn  className='text-4xl'/>
              <p>{name}</p>
          </div>
          
          <div className='flex items-center text-xl gap-4'>
              <a href={url} target='_blank'><MdFileOpen/></a>
              <button onClick={()=>{setClicked(true)}}><MdDriveFileRenameOutline /></button>
              <MdOutlineDriveFileMove />
              <button onClick={handleDelete}><MdDelete/></button>
              
          </div>
        </div>
        <div className={`flex justify-between ${clicked ? 'block' : 'hidden'}`}>
          <input type="text" className='border w-full outline-none px-2'
            onChange={(e) => setNewName(e.target.value)} placeholder='Enter new file name'
          />
          <div className='flex text-xl'>
            <button onClick={()=>{
              setClicked(false)
              }}>
                <FcCancel />
              </button>
            <button onClick={handleRename}><MdCheck className='text-[#00FF00]'/></button>
            
          </div>
        </div>
    </div>
  )
}

export default FileCard