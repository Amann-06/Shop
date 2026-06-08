import { useState } from "react"
import FloatingInput from "../components/FloatingInput";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
const ChangePassword = () => {
  const [newPassword,setNewPassword] = useState("");
  const [confirmNewPassword,setConfirmNewPassword] = useState("");
  const [error,setError] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(newPassword !== confirmNewPassword){
        setError("Passwords do not match !");
        return;
    }
    try{
        const response = await fetch(`http://localhost:3000/api/auth/changePassword/${id}`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword,
            })
        })
        const data = await response.json();
        if(!response.ok){
            setError(data.message);
            return;
        }
        alert("Password changed successfully");
        navigate("/");
    }catch(err){
        setError("Something went wrong..");
        console.log("Error in Forget Password",err);
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className='shadow-md border p-10 rounded-xl items-center'>
        <h1 className='text-2xl text-center mb-10 font-semibold'>Change Password</h1>
        {error && (
          <p className="text-red-500 mb-1 text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-3'>
          <FloatingInput id='newpassword' onChange={(e)=>setNewPassword(e.target.value)} type='password' placeholder='Enter your Password'/>
          <FloatingInput id='confirmpassword' onChange={(e)=>setConfirmNewPassword(e.target.value)} type='password' placeholder='Enter your Password again'/>
          <Button type='submit' color='bg-green-500 hover:bg-green-600'>Verify Verification Code</Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
