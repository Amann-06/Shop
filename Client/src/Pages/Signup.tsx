import { useState } from 'react';
import Button from '../components/Button';
import FloatingInput from '../components/FloatingInput';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      navigate("/");
    } catch (err) {
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className='shadow-md border p-10 rounded-xl items-center'>
        <h1 className='text-2xl text-center mb-10 font-semibold'>Signup</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-3'>
          <FloatingInput id='username' type='text' label='Enter your username'
            value={username} onChange={(e) => setUsername(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            }/>
          <FloatingInput id='email' type='email' label='Enter your email'
            value={email} onChange={(e) => setEmail(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            }/>
          <FloatingInput id='password' type='password' label='Enter your password'
            value={password} onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            }/>
          <Button color='bg-green-500 hover:bg-green-600/90' type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Signup"}
          </Button>
        </form>
        <p className='text-center my-5'>
          Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;