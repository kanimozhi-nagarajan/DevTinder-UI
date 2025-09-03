import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequests:(state,action)=>{
            const newRequests = state.filter((user)=> user._id!==action.payload._id)
            return newRequests
        }
    }
})

export const {addRequests,removeRequests} = requestsSlice.actions

export default requestsSlice.reducer