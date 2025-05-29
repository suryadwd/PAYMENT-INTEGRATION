import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/logout`,{}, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Logout successful!");
        navigate('/auth/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error in logout", error);
      toast.error("Logout failed. Please try again.");
    }
  }

  useEffect(()=>{
    const userInfo = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/user`, {
          withCredentials: true,
        });
        if (!res.data.success) {
          navigate('/auth/login');
        }
      } catch (error) {
        console.log("error in checking auth", error);
        navigate('/auth/login');
      }
    }
    userInfo();
  },[])

  return (
    <div className="bg-gradient-to-r from-red-600 to-yellow-100 w-full  text-white p-4 flex justify-between items-center absolute top-0  right-0">
       <div >@devsurya.space</div>
       <div className="flex items-center gap-10 text-black">
         <div>Name</div>
         <button onClick={handelLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
       </div>
    </div>
  )
}

export default Navbar
