import {Link} from 'react-router-dom';

const Login = () => {
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
      <input type="text" placeholder="Email" className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" />
      <input type="password" placeholder="Password" className=" bg-white text-black px-10 py-1.5 rounded-xl align-left" />
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
