import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/getuserData';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const Navbar = () => {

  const navigate = useNavigate();
  const { name, role } = useUserData();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(`api/auth/logout`,{}, {
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

  

  return (
    <div className="bg-gradient-to-r from-red-600 to-yellow-100 w-full  text-white p-4 flex justify-between items-center absolute top-0  right-0">
       <div >@devsurya.space</div>
       <div className="flex items-center gap-10 text-black">
          {
            role === "admin" ? (
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"><Link to="/add">Add-Admin</Link></button>
            ) : (
              <></>
            )
          }
         <div>{name}</div>
         <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
       </div>
    </div>
  )
}

export default Navbar
