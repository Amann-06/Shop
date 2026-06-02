import Hero from "./components/Hero"
import { Navbar } from "./components/Navbar"
import SearchNav from "./components/SearchNav"
import Test from "./components/Test"
import CheckCode from "./Pages/CheckCode"
import ForgetPassword from "./Pages/ForgetPassword"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter , Route , Routes } from "react-router-dom"
import SkipOrChangePass from "./Pages/SkipOrChangePass"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar/>
          </>
        }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/verify-verification-code/:id" element={<CheckCode/>}/>
        <Route path="/verified-code/:id" element={<SkipOrChangePass/>}/>
      </Routes>
    </BrowserRouter>
  )
}