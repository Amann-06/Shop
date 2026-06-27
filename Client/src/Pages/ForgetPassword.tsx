import { useState } from 'react';
import Button from '../components/Button'
import FloatingInput from '../components/FloatingInput';
import { Link, useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit =  async (e:React.FormEvent)=>{
    e.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/auth/sendVerificationCode",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email
            }),
          });
          const data = await response.json();
          if(!response.ok){
            setError(data.message);
            return;
          }
          navigate(`/verify-verification-code/${data.userId}`)
          console.log('successfully');
    }catch(err){
        console.log("Error in Forget Password",err);
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className='shadow-md border p-10 rounded-xl items-center'>
        <h1 className='text-2xl text-center mb-10 font-semibold'>Forget Password</h1>
        {error && (
          <p className="text-red-500 mb-1 text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-3'>
          <FloatingInput id='email' onChange={(e)=>setEmail(e.target.value)} type='email' label='Enter your email' icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          }/>
          <Button type='submit' color='bg-purple-600 text-white hover:bg-purple-700'>Send Verification Code</Button>
        </form>
        <Link to='/login' className='block text-center text-blue-500 mt-5'>Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassword
