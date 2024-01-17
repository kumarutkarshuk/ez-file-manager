import React from 'react'
import { logout } from '../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        logout(navigate, dispatch)
    }
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
  return (
    <div className='bg-[#0766AD] flex justify-between p-2 text-[#F3F3F3]'>
        <p className='capitalize'>
            {"Welcome, " + `${firstName} ${lastName}`}
        </p>
        <button className='w-fit hover:text-[#C5E898] duration-200' onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Navbar