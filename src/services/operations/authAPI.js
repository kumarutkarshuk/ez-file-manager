//token is saved in slice and local storage

import {endpoints} from '../api'
import toast from 'react-hot-toast'
import { setToken } from "../../slices/authSlice"
import {apiConnector} from '../apiconnector'

const { SIGNUP_API,
    LOGIN_API} = endpoints

export async function login (dispatch, navigate, formData){
    const toastId = toast.loading('Loading...')
    try{
      const response = await apiConnector('POST', LOGIN_API, formData)
      toast.dismiss(toastId)
      toast.success('Login Successful')
      dispatch(setToken(response.data.token))
      localStorage.setItem('token', JSON.stringify(response.data.token))
      navigate('/dashboard')


    }catch(error){
      // console.log("Error logging-in due to: ", error)
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
    }
}

export async function signup(navigate, formData){
    
  const toastId = toast.loading('Loading...')

  try{
    await apiConnector('POST', SIGNUP_API, formData)
    toast.dismiss(toastId)
    toast.success('Signup Successful')
    navigate('/login')

  }catch(error){
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
  }

}