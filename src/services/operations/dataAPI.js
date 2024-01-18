
import {endpoints} from '../api'
import toast from 'react-hot-toast'
import {apiConnector} from '../apiconnector'
import { setFolderArray, setFileArray } from '../../slices/dataSlice'

const {GET_ALL_FOLDERS_API, 
GET_ALL_FILES_API,
RENAME_FILE_API,
DELETE_FILE_API,
DELETE_FOLDER_API,
RENAME_FOLDER_API,
CREATE_FOLDER_API,
UPLOAD_FILE_API,
MOVE_FILE_API
} = endpoints

export async function getAllFilesAndFolders(dispatch, token){
    const toastId = toast.loading('Loading...')
    try{
      const FolderResponse = await apiConnector('POST', GET_ALL_FOLDERS_API, {token})
      const FileResponse = await apiConnector('POST', GET_ALL_FILES_API, {token})
      dispatch(setFolderArray(FolderResponse.data.folderArray))
      dispatch(setFileArray(FileResponse.data.fileArray))
      toast.dismiss(toastId)
      toast.success('Success')

    }catch(error){
      // console.log("Error logging-in due to: ", error.message)
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
}

export async function renameFile(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('PUT', RENAME_FILE_API, data)
    dispatch(setFileArray(response.data.fileArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function deleteFile(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('DELETE', DELETE_FILE_API, data)
    dispatch(setFileArray(response.data.fileArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function renameFolder(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('PUT', RENAME_FOLDER_API, data)
    dispatch(setFolderArray(response.data.folderArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function deleteFolder(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('DELETE', DELETE_FOLDER_API, data)
    dispatch(setFolderArray(response.data.folderArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function createFolder(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('POST', CREATE_FOLDER_API, data)
    dispatch(setFolderArray(response.data.folderArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function uploadFile(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('POST', UPLOAD_FILE_API, data)
    dispatch(setFileArray(response.data.fileArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}

export async function moveFile(dispatch, data){
  const toastId = toast.loading('Loading...')
  try{
    // console.log(data);
    const response = await apiConnector('POST', MOVE_FILE_API, data)
    dispatch(setFileArray(response.data.fileArray))
    toast.dismiss(toastId)
    toast.success(response.data.message)
  }catch(error){
    // console.log("Error logging-in due to: ", error.message)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }
}