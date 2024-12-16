

export interface Props{
  type:string
  onSubmit:(data:UserDataType)=>void
}

export interface UserDataType{
  user:string,
  username:string,
  password:string
}
