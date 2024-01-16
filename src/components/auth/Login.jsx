import React from 'react'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/operations/authAPI'

const Login = () => {

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
        })
    }
  },[reset, isSubmitSuccessful] );

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (data) => {
    // console.log(data);
    login(dispatch, navigate, data)
  }

  return (
    <div>
        <form className='flex flex-col' onSubmit={handleSubmit(submitHandler)}>
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
            <button className='w-fit underline'>Login</button>
        </form>
    </div>
  )
}

export default Login