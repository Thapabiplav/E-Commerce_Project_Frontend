
import { useNavigate } from 'react-router-dom'
import { register, resetStatus } from '../../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import Form from '../Form'
import { UserDataType } from '../types'
import { useEffect } from 'react'
import {AuthStatus} from '../../../store/authSlice'

const Register = () => {
  const navigate = useNavigate()
  const {status}=useAppSelector((state)=>state.auth)
const dispatch =useAppDispatch()
 const handleRegister = async (data:UserDataType)=>{
   dispatch(register(data))
  }
  useEffect(()=>{
    if(status === AuthStatus.Success){
      dispatch(resetStatus())
      navigate('/login')
    }
  },[status,dispatch,navigate])

  return (
  <Form type='register' onSubmit={handleRegister}/>
  )
}

export default Register