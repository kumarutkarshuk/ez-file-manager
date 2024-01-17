import React from 'react'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../services/operations/authAPI'
import image from '../../assets/Portfolio.jpg'
const Signup = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();


  const navigate = useNavigate()
  const submitHandler = (data) => {
    // console.log(data);
    signup(navigate, data)
  }
  return (
    <div className='flex w-screen max-h-screen'>
        <form className='flex flex-col w-[50%] pl-32 pt-20'
        onSubmit={handleSubmit(submitHandler)}>
            <h1 className='text-4xl text-[#29ADB2]'>React File Manager</h1>

            <div className='flex mt-2 gap-2'>
              <p>Already a user?</p>
              <Link to='/login' className='underline text-[#0766AD] hover:text-[#29ADB2] duration-200'>
              Login</Link>
            </div>

            <div className='w-fit mt-8 flex flex-col gap-2'>
              <div className='flex gap-4'>
                <div className='flex flex-col'>
                  <label>
                    <p className='font-semibold'>First Name</p>
                    <input type="text" className='border-b-[1px] border-black outline-none mb-2'
                      {...register('firstName', {required:true})}
                    />
                    
                </label>
                <span className='text-pink-600'>{errors.email && 'Please fill in your first name'}</span>
                </div>

                <div className='flex flex-col'>
                  <label>
                    <p className='font-semibold'>Last Name</p>
                    <input type="text" className='border-b-[1px] border-black outline-none mb-2'
                      {...register('lastName', {required:true})}
                    />
                    
                </label>
                <span className='text-pink-600'>{errors.email && 'Please fill in your last name'}</span>
                </div>
              </div>
            
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

              <label>
                  <p className='font-semibold'>Confirm Password</p>
                  <input type="password" className='border-b-[1px] border-black outline-none mb-2 w-full'
                    {...register('confirmPassword', {required:true})}
                  />
                  
              </label>
              <span className='text-pink-600'>{errors.confirmPassword && 'Please fill confirm password'}</span>
              
              <div className='w-full flex justify-center items-center'>
                <button className='w-fit text-white rounded-full hover:bg-[#0766AD] px-10 py-2
                bg-[#29ADB2] duration-100'>
                  Signup
                </button>
              </div>
              
            </div>

            
        </form>
        
        <img src={image} className='w-[50%]'/>
        

    </div>
  )
}

export default Signup