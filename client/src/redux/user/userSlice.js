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

             },
             UpdateUserProgress :(state,action)=>{
               state.user ={  ...state.user,
      ...action.payload,}
             state.loading = false;
             state.error=null
              },
             UpdateProfileError : (state,action)=>{
              state.error = action.payload,
              state.loading = false
             },
             ProfileUpdationStart : (state)=>{
              state.loading =true
             } ,
             deleteUserStart : (state)=>{
              state.loading =true
             },
            deleteUserSuccess:(state)=>{
              state.loading =false;
              state.user = null;
              state.error = null
            },
            SignoutFailure:(state,action)=>{
              state.error =action.payload;
              state.loading = false
            },
               SignoutStart : (state)=>{
              state.loading =true
             },
            SignoutSuccess:(state)=>{
              state.loading =false;
              state.user = null;
              state.error = null
            },
            deleteUserFailure:(state,action)=>{
              state.error =action.payload;
              state.loading = false
            },

          }
})

export const {SignInFailure ,SignInProgress ,SignInStart,UpdateUserProgress,UpdateProfileError,ProfileUpdationStart,deleteUserStart,deleteUserFailure,deleteUserSuccess,SignoutFailure,SignoutSuccess,SignoutStart} = userSlice.actions
export default userSlice.reducer