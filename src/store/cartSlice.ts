import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { CartItem, CartSlice } from "../globals/types/sliceTypes";
import { AuthStatus } from "../globals/types/types";
import { AppDispatch } from "./store";
import {ApiAuthenticated} from "../http";


const initialState:CartSlice={
  items:[],
  status:AuthStatus.Loading
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
    }
    
  }
})

export const {setItems,setStatus}=cartSlice.actions
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