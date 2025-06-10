import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const Login = () => {
    
    const [data, setData] = useState({
      email: '',
      password: ''
    })

    const navigate = useNavigate();
  
    const handleLogin = async () => {
  
      try {
        const res = await axiosInstance.post(`api/auth/login`, data, {
          withCredentials: true,
        })
        if (res.data.success) {
          toast.success("Login successful!");
          navigate('/store');
        } else {
          toast.error(res.data.message);
        }

  
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error("Signup failed. Please try again.");
      }
    }

  return (
    <div className="bg-gradient-to-b from-black to-blue-600 text-white p-8 rounded-lg shadow-lg w-96">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-2xl font-bold">Login here...</h1>
      </div>

      <div className="flex flex-col items-center m-4 ">
        <p className='text-gray-400 text-sm font-extralight text-center'>I suryakant Dwivedi welcome you to my project Payment-Integration. I am working on MERN stack development along with Devops now.</p>
      </div>

      <div className="flex flex-col gap-4 mt-4">
      <input
       type="text"
       placeholder="Email"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left"
       onChange={e => setData({...data,email: e.target.value})}
      />
      <input
       type="password"
       placeholder="Password"
       className=" bg-white text-black px-10 py-1.5 rounded-xl align-left"
       onChange={e => setData({...data,password: e.target.value})}
      />
      <button onClick={handleLogin} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      </div>
      <p className='text-gray-300 mt-4 cursor-pointer'>Forget Password</p>
      <div className="mt-4">
        <p className="text-gray-300">Don't have an account? &nbsp;<span className="text-blue-200 cursor-pointer font-bold"><Link to="/auth/signup" >Sign Up</Link></span></p>
      </div>
      
      </div>
    </div>
  )
}

export default Login
