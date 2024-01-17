import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folderArray:[],
    fileArray:[],
}

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers:{
        setFolderArray: (state, value) => {
            state.folderArray = value.payload
        },
        setFileArray: (state, value) => {
            state.fileArray = value.payload
        },
        
    }
})

export const {setFolderArray, setFileArray} = dataSlice.actions
export default dataSlice.reducer

