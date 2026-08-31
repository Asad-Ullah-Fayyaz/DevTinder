import { createSlice } from "@reduxjs/toolkit"

const connectionSlice = createSlice({
    name:"connection",
    initialState:[],
    reducers:{
        addConnection:(state,action)=>{
            return action.payload
        },
        removeConnection:(state,action)=>{
            const newArray = state.filter((con)=>{return con._id!==action.payload.connection_id})
            return newArray
        }
    }
})
export const {addConnection,removeConnection} = connectionSlice.actions
export default connectionSlice.reducer
