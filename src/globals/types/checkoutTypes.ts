import { Product } from "./productTypes"
import { AuthStatus } from "./types"

export enum PaymentMethod{
COD='cod',
Khalti='khalti'
}

export interface ItemDetails{
  productId:string,
  quantity:number
}

export interface OrderResponseItem extends ItemDetails{
  orderId:string

}

enum PaymentStatus{
  Paid = 'paid',
  Unpaid = 'unpaid',
  Pending = 'pending'
}

interface Payment{
  paymentMethod: PaymentMethod
}

interface OrderPaymentData extends Payment{
  paymentStatus:PaymentStatus
}

export interface OrderData{
  phoneNumber:string,
  shippingAddress:string,
  totalAmount:number,
  paymentDetails:{
    paymentMethod:Payment
  }
  items:ItemDetails[]
}

export interface OrderResponseData{
 items:OrderResponseItem[]
 status:AuthStatus,
 khaltiUrl: string |null,
 myOrders:MyOrdersData[],
 orderDetails:OrderDetails[]
}



enum OrderStatus{
  Pending = 'pending',
  Delivered = 'delivered',
  Ontheway = 'ontheway',
  Cancel = 'cancelled',
  Preparation= 'preparation'
}

interface UserData{
  username:string,
  email:string
}
export interface MyOrdersData{
  id:string,
  phoneNumber:string,
  shippingAddress:string,
  totalAmount :number,
  orderStatus: OrderStatus,
  createdAt: string,
  paymentId: string,
  userId:UserData,
  Payment:OrderPaymentData
}


export interface OrderDetails{
  id:string,  //orderDetail id
  quantity:number,
  orderId:string,
  Product:Product,
  Order:MyOrdersData
}