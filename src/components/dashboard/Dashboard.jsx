import React from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFilesAndFolders } from '../../services/operations/dataAPI'
import FolderCard from './FolderCard'
import FileCard from './FileCard'
import { FaCaretLeft } from "react-icons/fa";
import UploadFileCard from './UploadFileCard'
import UploadFolderCard from './UploadFolderCard'

const Dashboard = () => {

  const {folderArray, fileArray} = useSelector(state => state.data)
  const {token} = useSelector(state => state.auth)
  // console.log(folderArray);
  // console.log(fileArray);
  const dispatch = useDispatch()

  useEffect(()=>{
    getAllFilesAndFolders(dispatch, token)
  },[])

  
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <button className='ml-4 mt-4'>
        <div className='flex items-center'>
        <FaCaretLeft />
        <p>Back</p>
        </div>
      </button>
      <p className='ml-8 mt-2'>
        Current Folder: <span className='font-semibold'>root</span>
      </p>
      <div className='flex gap-2 ml-8 mt-2'>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>Folders</p>
          {
            folderArray.map((element)=>(
              <FolderCard name={element.name} key={element._id} folderId={element._id}/>
            ))
          }
          <UploadFolderCard></UploadFolderCard>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>Files</p>
          {
            fileArray.map((element)=>(
              <FileCard name={element.name} url={element.url} key={element._id} fileId={element._id}/>
            ))
          }
          <UploadFileCard></UploadFileCard>
        </div>
      </div>
      
      
      
      
      
      

    </div>
    
  )
}

export default Dashboard