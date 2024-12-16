import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import API from '../http'

enum AuthStatus{
  Loading='loading',
  Success='success',
  Error='error'
}

interface RegisterData{
  email:string,
  password:string,
  username:string
}

interface LoginData{
  email:string,
  password:string
}

interface User{
  username:string,
  email:string,
  password:string,
  token:string
}

interface AuthSlice{
  user:User
  status:AuthStatus
}

const initialState:AuthSlice={
  user: {} as User,
  status:AuthStatus.Loading
}


 const authSlice=createSlice({   //arguments ma object accept garxa ani slice ko config
  name:'auth',
  initialState,
  reducers:{
    setUser(state:AuthSlice,action:PayloadAction <User>){
      state.user=action.payload
    },
    setStatus(state:AuthSlice,action:PayloadAction <AuthStatus>){
      state.status=action.payload
    }
  }
  }
)

export  const {setStatus,setUser}=authSlice.actions
export default authSlice.reducer

 export function register(data:RegisterData){
  return async function registerThunk(dispatch:any){
    dispatch(setStatus(AuthStatus.Loading))
  try {
    const response =  await API.post('register',data)
    if(response.status === 201){
      dispatch(setStatus(AuthStatus.Success))
    }
    else{
      dispatch(setStatus(AuthStatus.Error))
    }
  } catch (error) {
dispatch(setStatus(AuthStatus.Error))
  }
  }
}

 export function login( data:LoginData){
  return async function loginThunk(dispatch:any){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await API.post('login',data)
     if( response.status === 200){
      dispatch(setStatus(AuthStatus.Success))
     }
     else{
      dispatch(setStatus(AuthStatus.Error))
     }
    } catch (error) {
      dispatch (setStatus(AuthStatus.Error))
    }
  }
}