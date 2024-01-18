import React from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFilesAndFolders } from '../../services/operations/dataAPI'
import FolderCard from './FolderCard'
import FileCard from './FileCard'
import { FaCaretLeft } from "react-icons/fa";
import UploadFileCard from './UploadFileCard'
import NewFolderCard from './NewFolderCard'
import { setCurrentFolder } from '../../slices/dataSlice'

const Dashboard = () => {

  const {folderArray, fileArray} = useSelector(state => state.data)
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const {currentFolder} = useSelector(state => state.data)

  let currentFolderName
  if(currentFolder === undefined){
    currentFolderName = "root"
  }
  else{
    //find current folder's name
    for(let i=0; i<folderArray.length; i++){
      if(folderArray[i]._id === currentFolder){
        currentFolderName = folderArray[i].name
        break
      }
    }
  }

  const handleBack = () => {
    let parentFolder
    for(let i=0; i<folderArray.length; i++){
      if(folderArray[i]._id === currentFolder){
        parentFolder = folderArray[i].parentFolder
        break
      }
    }
    dispatch(setCurrentFolder(parentFolder))
  }


  useEffect(()=>{
    getAllFilesAndFolders(dispatch, token)
  },[])

  
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <button className={`ml-4 mt-4 ${currentFolder === undefined ? 'text-white pointer-events-none' : 'block'}`}
      onClick={handleBack}>
        <div className='flex items-center'>
        <FaCaretLeft />
        <p>Back</p>
        </div>
      </button>
      <p className='ml-8 mt-2'>
        Current Folder: <span className='font-semibold'>{`${currentFolderName}`}</span>
      </p>
      <div className='flex gap-2 ml-8 mt-2 flex-col lg:flex-row'>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>Folders</p>
          {
            folderArray.map((element)=>{
              if(currentFolder === element.parentFolder){
                return <FolderCard name={element.name} key={element._id} folderId={element._id}/>
              }
              
          })
          }
          <NewFolderCard></NewFolderCard>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>Files</p>
          {
            fileArray.map((element)=>{
              if(currentFolder === element.parentFolder){
                return <FileCard name={element.name} url={element.url} key={element._id} fileId={element._id}/>
              }
              
          })
          }
          <UploadFileCard></UploadFileCard>
        </div>
      </div>
      
      
      
      
      
      

    </div>
    
  )
}

export default Dashboard