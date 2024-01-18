import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folderArray:[],
    fileArray:[],
    currentFolder: undefined
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
        setCurrentFolder: (state, value) => {
            state.currentFolder = value.payload
        },
        
    }
})

export const {setFolderArray, setFileArray, setCurrentFolder} = dataSlice.actions
export default dataSlice.reducer

