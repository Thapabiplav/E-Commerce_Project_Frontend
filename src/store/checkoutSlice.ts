import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { AuthStatus } from '../globals/types/types'
import { MyOrdersData, OrderData, OrderResponseData, OrderResponseItem } from '../globals/types/checkoutTypes'
import { AppDispatch } from './store'
import {  ApiAuthenticated } from '../http'


const initialState:OrderResponseData = {
  items:[],
  status:AuthStatus.Loading,
  khaltiUrl:null ,
  myOrders:[]
}

const orderSlice=createSlice({
  name:'order',
  initialState,
  reducers:{
    setItems(state:OrderResponseData,action:PayloadAction <OrderResponseItem>){
      state.items.push(action.payload)
    },
    setStatus(state:OrderResponseData,action:PayloadAction<AuthStatus>){
      state.status=action.payload
    },
    setMyOrders(state:OrderResponseData,action:PayloadAction<MyOrdersData[]>){
      state.myOrders=action.payload
    },
    setkhaltiUrl(state:OrderResponseData,action:PayloadAction <OrderResponseData['khaltiUrl']>){
      state.khaltiUrl=action.payload
    }
  }
})

export const {setItems,setStatus,setkhaltiUrl,setMyOrders}=orderSlice.actions
export default orderSlice.reducer

export function orderItem(data:OrderData){
 return async function orderItemThunk(dispatch:AppDispatch) {
 dispatch(setStatus(AuthStatus.Loading))
  try {
    const response= await ApiAuthenticated.post('/order/customer',data)
    if(response.status === 200){
      dispatch(setStatus(AuthStatus.Success))
      dispatch(setItems(response.data.data))
      if(response.data.url){
        dispatch(setkhaltiUrl(response.data.url))
      }
      else{
        dispatch(setkhaltiUrl(null))
      }
    }else{
      dispatch(setStatus(AuthStatus.Error))
    }
  } catch (error) {
    dispatch(setStatus(AuthStatus.Error))
  }
 } 
}


export function fetchMyOrders(){
  return async function fetchMyOrdersThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response= await ApiAuthenticated.get('/order/customer')
      if(response.status === 200){
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setMyOrders(response.data.data))
      }
      else{
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}