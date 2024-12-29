import { Product } from "./productTypes";
import { AuthStatus } from "./types";

export interface CartItem {
  Product: Product;
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  status: AuthStatus;
}
