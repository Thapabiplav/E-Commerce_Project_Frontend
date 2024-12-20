import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Product, ProductState } from '../globals/types/productTypes'
import { AuthStatus } from '../globals/types/types'
import { AppDispatch } from './store'
import API from '../http'


const  initialState:ProductState={
  product:[],
  status:AuthStatus.Loading
}


const productSlice=createSlice({
  name:'product',
  initialState,
  reducers:{
    setProduct(state:ProductState,action:PayloadAction<Product[]>){
      state.product=action.payload
    },
    setStatus(state:ProductState,action:PayloadAction<AuthStatus>){
      state.status=action.payload
    }
  }

})

export const {setProduct,setStatus}=productSlice.actions
export default productSlice.reducer 

export function fetchProduct (){
  return async function fetchProductThunk(dispatch:AppDispatch){
    dispatch(setStatus(AuthStatus.Loading))
    try {
      const response = await API.get('admin/product')
      if (response.status === 200){
        const {data}=response.data
        dispatch(setStatus(AuthStatus.Success))
        dispatch(setProduct(data))
      }
      else{
        dispatch(setStatus(AuthStatus.Error))
      }
    } catch (error) {
      dispatch(setStatus(AuthStatus.Error))
    }
  }
}