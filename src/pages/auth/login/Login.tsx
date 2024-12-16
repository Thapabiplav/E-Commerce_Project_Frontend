import Form from "../Form"
import { UserDataType } from "../types"


const Login = () => {
  const handleLogin=(data:UserDataType)=>{

  }
  return (
   <Form type='login' onSubmit={handleLogin} />
  )
}

export default Login