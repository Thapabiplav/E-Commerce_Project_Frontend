import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Register from "./pages/auth/register/Register"
import Login from "./pages/auth/login/Login"
import SingleComponent from "./pages/singleComponent/SingleComponent"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
function App() {


  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/product/:id" element={<SingleComponent/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path='/checkout' element={<Checkout/>} />
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
