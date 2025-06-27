import { createSlice } from "@reduxjs/toolkit"


const initialState = {
      user : null,
      loading : false,
      error : null,
}

const userSlice = createSlice({
          name : 'user',
          initialState, 
          reducers :{
            SignInStart : (state) =>{
                         state.loading = true;
            },
            SignInProgress : (state , action) =>{
                    state.loading = false;
                    state.error =null;
                    state.user = action.payload
            },
             SignInFailure : (state , action) =>{
                 state.error = action.payload;
                 state.loading = false;

             }
          }
})

export const {SignInFailure ,SignInProgress ,SignInStart} = userSlice.actions
export default userSlice.reducer