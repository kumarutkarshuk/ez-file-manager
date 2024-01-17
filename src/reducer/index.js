import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import dataReducer from '../slices/dataSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
})

export default rootReducer