import CheckCode from "./Pages/CheckCode"
import ForgetPassword from "./Pages/ForgetPassword"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter , Route , Routes } from "react-router-dom"
import SkipOrChangePass from "./Pages/SkipOrChangePass"
import ChangePassword from "./Pages/ChangePassword"
import AddProduct from "./Pages/AddProduct"
import Home from "./Pages/Home"
import MyOrders from "./Pages/MyOrders"
import Cart from "./Pages/Cart"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Home/>
          </>
        }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/verify-verification-code/:id" element={<CheckCode/>}/>
        <Route path="/verified-code/:id" element={<SkipOrChangePass/>}/>
        <Route path="/change-password/:id" element={<ChangePassword/>}/>
        <Route path="add-product" element={<AddProduct/>}/>
        <Route path="my-orders" element={<MyOrders/>}/>
        <Route path="/my-cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}