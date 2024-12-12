import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface User{
  username:string,
  email:string,
  password:string,
  token:string
}

interface AuthSlice{
  user:User
  status:string
}

const initialState:AuthSlice={
  user: {} as User,
  status:'loading'
}

 const authSlice=createSlice({   //arguments ma object accept garxa ani slice ko config
  name:'auth',
  initialState,
  reducers:{
    setUser(state:AuthSlice,action:PayloadAction <User>){
      state.user=action.payload
    },
    setStatus(state:AuthSlice,action:PayloadAction <string>){
      state.status=action.payload
    }
  }
  }
)

export  const {setStatus,setUser}=authSlice.actions
export default authSlice.reducer