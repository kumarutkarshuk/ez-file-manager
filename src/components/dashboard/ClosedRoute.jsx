import React from 'react'
import { Navigate } from 'react-router-dom'

const ClosedRoute = ({children}) => {
  
    if(!localStorage.getItem('token')){
        return <Navigate to='/login'></Navigate>
    }
    else{
        return children
    }
}

export default ClosedRoute