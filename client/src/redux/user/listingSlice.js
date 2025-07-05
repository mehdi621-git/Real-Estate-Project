import { createSlice } from "@reduxjs/toolkit"



const initialState = {
      list : null,

}
const listSlice = createSlice({
          name : 'list',
          initialState, 
          reducers :{
                   setListings :(state,action)=>{
                        state.list =action.payload
                   }
                   ,
                   updateList  : (state,action )=>{
                     
                   }
          }

        })
export const {setListings} = listSlice.actions
export default listSlice.reducer