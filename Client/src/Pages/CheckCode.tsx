import React, { useState } from 'react'
import FloatingInput from '../components/FloatingInput'
import Button from '../components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
const CheckCode = () => {
  const [code,setCode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const checkCode = async (e : React.FormEvent) =>{
    e.preventDefault();
    try{
        const response = await fetch(`http://localhost:3000/api/auth/verifyVerificationCode/${id}`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otp:code,
            }),
            })
            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "Invalid code");
                return;
            }
            console.log("Code verified");
            navigate(`/verified-code/${id}`);
    }catch(err){
            console.log("CheckCode Error",err);
    }
  }

    const handleResend =  async (e:React.FormEvent)=>{
    e.preventDefault();
    try{
        const response = await fetch("http://localhost:3000/api/auth/sendVerificationCode",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:id
            }),
          });
          const data = await response.json();
          if(!response.ok){
            console.log(data.message);
            return;
          }
          console.log('successfully');
    }catch(err){
        console.log("Error in Forget Password",err);
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className='shadow-md border p-10 rounded-xl items-center'>
        <h1 className='text-2xl text-center mb-10 font-semibold'>Verification Code</h1>
        <form onSubmit={checkCode} className='flex w-80 flex-col gap-3'>
          <FloatingInput id='code' onChange={(e)=>setCode(e.target.value)} type='text' placeholder='Enter your verification code'/>
          <Button type='submit' color='bg-green-500 hover:bg-green-600'>Verify Verification Code</Button>
        </form>
        <div className='text-sm justify-between my-5 text-green-500 flex'>
            <button onClick={handleResend} className='text-sm text-left cursor-pointer hover:underline underline-offset-2'>Resend Code</button>
            <Link to='/forget-password' className='block text-center hover:underline'>Change Email</Link>
        </div>
      </div>
    </div>
  )
}

export default CheckCode