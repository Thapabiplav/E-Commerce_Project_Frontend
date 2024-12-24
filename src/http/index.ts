import axios from "axios";

const API = axios.create({
  baseURL:'http://localhost:4000/',
  headers:{
    "Content-Type":"application/json",
    "Accept":"application/json"
  }
})

const ApiAuthenticated = axios.create({
  baseURL:'http://localhost:4000/',
  headers:{
    "Content-Type":"application/json",
    "Accept":"application/json",
    'Authorization':`${localStorage.getItem("token")}`
  }
})

export {API,ApiAuthenticated}