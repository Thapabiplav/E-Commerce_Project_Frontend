import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Product, ProductState } from '../globals/types/productTypes'
import { AuthStatus } from '../globals/types/types'
import { AppDispatch,RootState } from './store'
import API from '../http'




const  initialState:ProductState={
  product:[],
  status:AuthStatus.Loading,
  singleProduct: null
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
    },
    setSingleProduct(state:ProductState,action:PayloadAction<Product>){
      state.singleProduct=action.payload
    }
  }

})

export const {setProduct,setStatus,setSingleProduct}=productSlice.actions
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

export function fetchByProductId(productId:string){
  return  async function fetchByProductIdThunk(dispatch:AppDispatch, getState: ()=>RootState){ //get state function ho yeslai call garyo vane whole store ho
    const state = getState() // whole state basyo
    const existingProduct = state.product.product.find((product:Product)=>product.id  === productId)
    if(existingProduct){
      dispatch(setSingleProduct(existingProduct))
      dispatch(setStatus(AuthStatus.Success))
    }
    else{
      dispatch(setStatus(AuthStatus.Loading))
      try {
        const response = await API.get(`admin/product/${productId}`)
        if (response.status === 200){
          const {data}=response.data
          dispatch(setStatus(AuthStatus.Success))
          dispatch(setSingleProduct(data))
        }
        else{
          dispatch(setStatus(AuthStatus.Error))
        }
      } catch (error) {
        dispatch(setStatus(AuthStatus.Error))
      }
    }
    }

  } 
