import React from 'react'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/operations/authAPI'

const Signup = () => {

  //I'll explore this
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful},
  } = useForm();

  //I'll explore this
  useEffect( () => {
    if(isSubmitSuccessful) {
        reset({
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            confirmPassword:"",
        })
    }
  },[reset, isSubmitSuccessful] );

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (data) => {
    // console.log(data);
    signup(navigate, data)
  }

  return (
    <div>
        <form className='flex flex-col' onSubmit={handleSubmit(submitHandler)}>
            
            <label>
                <p>First Name</p>
                <input type="text" className='border-black border text-black'
                  {...register('firstName', {required:true})}
                />
                <span className='text-pink-300'>{errors.email && 'Please fill in your first name'}</span>
            </label>

            <label>
                <p>Last Name</p>
                <input type="text" className='border-black border text-black'
                  {...register('lastName', {required:true})}
                />
                <span className='text-pink-300'>{errors.email && 'Please fill in your last name'}</span>
            </label>
            
            <label>
                <p>Email</p>
                <input type="email" className='border-black border text-black'
                  {...register('email', {required:true})}
                />
                <span className='text-pink-300'>{errors.email && 'Please fill in your email'}</span>
            </label>

            <label>
                <p>Password</p>
                <input type="password" className='border-black border'
                  {...register('password', {required:true})}
                />
                <span className='text-pink-300'>{errors.password && 'Please fill in your password'}</span>
            </label>

            <label>
                <p>Confirm Password</p>
                <input type="password" className='border-black border'
                  {...register('confirmPassword', {required:true})}
                />
                <span className='text-pink-300'>{errors.confirmPassword && 'Please fill confirm password'}</span>
            </label>

            <button className='w-fit underline'>Login</button>
        </form>
    </div>
  )
}

export default Signup