import React from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/operations/authAPI'
import image from '../../assets/Portfolio.jpg'
import { FaHeart } from "react-icons/fa";
import { Navigate } from 'react-router-dom'
const Login = () => {

  //I'll explore this
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (data) => {
    // console.log(data);
    login(dispatch, navigate, data)
  }

  if(localStorage.getItem('token')){
    return <Navigate to='/dashboard'></Navigate>
  }
  else{
    return (
      <div className='flex w-screen max-h-screen'>
          <form className='flex flex-col lg:w-[50%] lg:pl-32 lg:pt-20 p-4 w-full'
          onSubmit={handleSubmit(submitHandler)}>
              <h1 className='text-4xl text-[#29ADB2] -ml-1'>EZ File Manager</h1>
              <p className='flex gap-[2px] items-center text-xs'>Made with <span><FaHeart
                className='text-pink-500'
              /></span> by Utkarsh Kumar</p>
              <div className='flex mt-2 gap-2'>
                <p>New user?</p>
                <Link to='/' className='underline text-[#0766AD] hover:text-[#29ADB2] duration-200'>
                Signup</Link>
              </div>
  
              <div className='lg:w-[75%] mt-8 flex flex-col gap-2 w-full'>
  
              
                <label>
                    <p className='font-semibold'>Email</p>
                    <input type="email" className='border-b-[1px] border-black outline-none mb-2 w-full'
                      {...register('email', {required:true})}
                    />
                    
                </label>
                <span className='text-pink-600'>{errors.email && 'Please fill in your email'}</span>
  
                <label>
                    <p className='font-semibold'>Password</p>
                    <input type="password" className='border-b-[1px] border-black outline-none mb-2 w-full'
                      {...register('password', {required:true})}
                    />
                    
                </label>
                <span className='text-pink-600'>{errors.password && 'Please fill in your password'}</span>
                
                <div className='w-full flex justify-center items-center'>
                  <button className='w-fit text-white rounded-full hover:bg-[#0766AD] px-10 py-2
                  bg-[#29ADB2] duration-100'>
                    Login
                  </button>
                </div>
                
              </div>
  
              
          </form>
          
          <img src={image} className='w-[50%] lg:block hidden'/>
          
  
      </div>
    )
  }
  
}

export default Login