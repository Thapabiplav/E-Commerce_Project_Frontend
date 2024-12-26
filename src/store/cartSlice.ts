import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { CartItem, CartSlice } from "../globals/types/cartTypes";
import { AuthStatus } from "../globals/types/types";
import { AppDispatch } from "./store";
import {ApiAuthenticated} from "../http";


const initialState:CartSlice={
  items:[],
  status:AuthStatus.Loading
}

interface DeleteAction{
  productId:string
}

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    setItems(state:CartSlice, action:PayloadAction<CartItem[]>){
      state.items=action.payload
    },
    setStatus(state:CartSlice,action:PayloadAction <AuthStatus>){
      state.status=action.payload
    },
    setDeleteItem(state:CartSlice,action:PayloadAction <DeleteAction>){
      const index = state.items.findIndex(item=>item.Product.id = action.payload.productId)
      state.items.splice(index,1)
    }
    
  }
})

export const {setItems,setStatus,setDeleteItem}=cartSlice.actions
export default cartSlice.reducer

 export function addCart(productId:string){
  return async function addCartThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await ApiAuthenticated.post('customer/cart',{
        productId,
        quantity:1
      })
      if(response.status === 201){
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setItems(response.data.data))
      }
      else {
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}

export function fetchCardItems(){
  return async function addCartThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await ApiAuthenticated.get('customer/cart')
      if(response.status === 200){
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setItems(response.data.data))
      }
      else {
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}

export function deleteCartItem(productId:string){
  return async function deleteCartItemThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await ApiAuthenticated.delete('customer/cart/' +productId)
      if(response.status === 200){
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setDeleteItem({productId}))
      }
      else {
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}