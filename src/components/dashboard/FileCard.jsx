import React, { useState } from 'react'
import { CiFileOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdFileOpen } from "react-icons/md";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, moveFile, renameFile } from '../../services/operations/dataAPI';
import toast from 'react-hot-toast';

const FileCard = ({name, url, fileId}) => {
  const {folderArray} = useSelector(state => state.data)
  const [renameClicked, setRenameClicked] = useState(false)
  const [moveClicked, setMoveClicked] = useState(false)
  const [newName, setNewName] = useState("")
  const [option, setOption] = useState(null)
  const dispatch = useDispatch()
  const {token} = useSelector(state => state.auth)
  let displayName
  if(name.length > 10){
    displayName = name.substring(0,10) + "..."
  }
  else{
    displayName = name
  }
  

  const handleRename = () => {
    if(newName === ""){
      toast.error('Please enter a new file name')
    }
    else{
      renameFile(dispatch, {token, name: newName, fileId})
      setRenameClicked(false)
    }
  }
  const handleDelete = () => {
    deleteFile(dispatch, {token, fileId})
  }

  const handleMove = () => {
    // console.log(option);
    if(!option){
      moveFile(dispatch, {token, parentFolderId: folderArray[0]._id, fileId})
    }
    else{
      moveFile(dispatch, {token, parentFolderId: option, fileId})
    }
      
  }

  return (
    <div className='flex flex-col'>
        <div className='flex border rounded-md w-[300px] justify-between p-2'>

          <div className='flex items-center gap-2'>
              <CiFileOn  className='text-4xl'/>
              <p>{displayName}</p>
          </div>
          
          <div className='flex items-center text-xl gap-4'>
              <a href={url} target='_blank'><MdFileOpen/></a>
              <button onClick={()=>{setRenameClicked(true)}}><MdDriveFileRenameOutline /></button>
              <button onClick={()=>{setMoveClicked(true)}}><MdOutlineDriveFileMove /></button>
              <button onClick={handleDelete}><MdDelete/></button>
              
          </div>
        </div>

        {/* rename */}
        <div className={`flex justify-between ${renameClicked? 'block' : 'hidden'} w-[300px]`}>
          <input type="text" className='border w-full outline-none px-2'
            onChange={(e) => setNewName(e.target.value)} placeholder='Enter new file name'
          />
          <div className='flex text-xl'>
            <button onClick={()=>{
              setRenameClicked(false)
              }}>
                <FcCancel />
              </button>
            <button onClick={handleRename}><MdCheck className='text-[#00FF00]'/></button>
            
          </div>
        </div>
        
        {/* move */}
        <div className={`flex justify-between ${moveClicked? 'block' : 'hidden'} w-[300px]`}>
          <select className='w-full px-2' onChange={(e) => setOption(e.target.value)}>
            {
              folderArray.map((element) => (
                <option value={element._id} key={element._id}>{element.name}</option>
              ))
            }
            <option>root</option>
          </select>
          <div className='flex text-xl'>
            <button onClick={()=>{
              setMoveClicked(false)
              }}>
                <FcCancel />
              </button>
            <button onClick={handleMove}><MdCheck className='text-[#00FF00]'/></button>
            
          </div>
        </div>
    </div>
  )
}

export default FileCard