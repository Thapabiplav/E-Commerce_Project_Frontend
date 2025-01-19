import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { AuthStatus } from '../globals/types/types'
import { MyOrdersData, OrderData, OrderDetails, OrderResponseData, OrderResponseItem } from '../globals/types/checkoutTypes'
import { AppDispatch } from './store'
import {  ApiAuthenticated } from '../http'


const initialState:OrderResponseData = {
  items:[],
  status:AuthStatus.Loading,
  khaltiUrl:null ,
  myOrders:[],
  orderDetails:[]
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
    },
    setMyOrderDetails(state:OrderResponseData,action:PayloadAction<OrderDetails[]>){
      state.orderDetails=action.payload
    }
  }
})

export const {setItems,setStatus,setkhaltiUrl,setMyOrders,setMyOrderDetails}=orderSlice.actions
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

export function fetchMyOrdersDetails(id:string){
  return async function fetchMyOrdersDetailsThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await ApiAuthenticated.get('order/customer/' + id)
      if(response.status === 200){
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setMyOrderDetails(response.data.data))
      }
      else{
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}