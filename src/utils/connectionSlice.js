import { createSlice } from "@reduxjs/toolkit";
import Connections from "../components/Connections";
const connectionSlice = createSlice({

    name: "connections",
    initialState: null,
    reducers: {
        addConnection:(state,action)=>{
            return action.payload
        }
    }
})

export const {addConnection} = connectionSlice.actions

export default connectionSlice.reducer