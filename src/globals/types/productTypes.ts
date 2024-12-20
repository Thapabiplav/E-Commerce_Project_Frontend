import { AuthStatus } from "./types"

interface User{
  id:string,
  email:string,
  username:string
}

interface Category{
  id:string
  categoryName:string
}

export interface Product {
  id:string,
  productName:string,
  productPrice:number,
  productTotalStockQty:number,
  productImageUrl:string,
  productDescription:string
  createdAt:string
  updatedAt:string
  userId:string
  categoryId:string
  user:User
  category:Category
}

export interface ProductState{
  product:Product[]  //array of product store garxa
  status:AuthStatus
}