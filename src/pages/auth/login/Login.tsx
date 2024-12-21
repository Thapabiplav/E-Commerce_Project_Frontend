import { useNavigate } from "react-router-dom"
import {  UserLogin } from "../types"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import {  login, resetStatus } from "../../../store/authSlice"
import { useEffect } from "react"
import Form from "../Form"
import { AuthStatus } from "../../../globals/types/types"


const Login = () => {
  const navigate = useNavigate()
  const {status}=useAppSelector((state)=>state.auth)
const dispatch =useAppDispatch()
 const handleLogin = async (data:UserLogin)=>{
   dispatch(login(data))
  }
  useEffect(()=>{
    if(status === AuthStatus.Success){
      dispatch(resetStatus())
      navigate('/')
    }
  },[status,dispatch,navigate])

  
  return (
   <Form type='login' onSubmit={handleLogin}/>
  )
}

export default Login