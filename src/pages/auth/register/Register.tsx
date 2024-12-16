
import Form from '../Form'
import { UserDataType } from '../types'

const Register = () => {
  const handleRegister = (data:UserDataType)=>{

  }
  return (
  <Form type='register' onSubmit={handleRegister}/>
  )
}

export default Register