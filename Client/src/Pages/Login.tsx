import Button from '../components/Button'
import FloatingInput from '../components/FloatingInput';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const response = await fetch(
          "http://localhost:3000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          return;
        }
        localStorage.setItem("token", data.accessToken);
        console.log("Logged in successfully");
        navigate("/");
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className='shadow-md border p-10 rounded-xl items-center'>
        <h1 className='text-2xl text-center mb-10 font-semibold'>Login</h1>
        {error && (
          <p className="text-red-500 mb-5 text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-3'>
          <FloatingInput id='email' onChange={(e) => setEmail(e.target.value)} type='email' label='Enter your email' icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          }/>
          <FloatingInput id='password' onChange={(e) => setPassword(e.target.value)} type='password' label='Enter your password' icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          } />
          <Button type='submit'>Login</Button>
        </form>
        <Link to='/forget-password' className='block text-center mt-8 text-blue-500'>Forget password ?</Link>
        <p className='text-center mb-5 mt-1'>Don't have an account ? <Link to='/signup' className='text-blue-500 cursor-pointer'>Signup</Link></p>
      </div>
    </div>
  );
};

export default Login
