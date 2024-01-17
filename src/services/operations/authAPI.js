//token is saved in slice and local storage

import {endpoints} from '../api'
import toast from 'react-hot-toast'
import {setToken } from "../../slices/authSlice"
import {apiConnector} from '../apiconnector'
import { setFolderArray } from '../../slices/dataSlice'

const { SIGNUP_API,
    LOGIN_API} = endpoints

export async function login (dispatch, navigate, formData){
    const toastId = toast.loading('Loading...')
    try{
      const response = await apiConnector('POST', LOGIN_API, formData)
      dispatch(setToken(response.data.token))
      localStorage.setItem('firstName',response.data.user.firstName)
      localStorage.setItem('lastName',response.data.user.lastName)
      localStorage.setItem('token', JSON.stringify(response.data.token))
      toast.dismiss(toastId)
      navigate('/dashboard')
    
    }catch(error){
      // console.log("Error logging-in due to: ", error.message)
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
}

export async function signup(navigate, formData){
    
  const toastId = toast.loading('Loading...')

  try{
    await apiConnector('POST', SIGNUP_API, formData)
    navigate('/login')
    toast.dismiss(toastId)
    toast.success('Signup Successful')

  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }

}

export function logout(navigate, dispatch){
    
  const toastId = toast.loading('Loading...')

  try{
    dispatch(setToken(null))
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    dispatch(setFolderArray([]))
    navigate('/login')
    toast.dismiss(toastId)
    toast.success('Logout Successful')

  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.message)
  }

}