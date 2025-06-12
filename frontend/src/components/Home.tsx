import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="container mx-auto p-8">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="  md:w-1/2 text-center md:text-left items-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome login to Continue
          </h1>
          
           <Link to="/auth/login">
            <button
            className="mt-16 ml-[30%] px-6 py-2 font-semibold  bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>
           </Link>

         
        </div>

       
        <div className="md:w-1/2">
          <div className="flex items-center justify-center border border-white rounded-lg bg-white p-4 gap-4">
            <img src="dockerlogo.png" alt="Docker image" className="w-46 h-46 object-contain" />
            <img src="k8ss.png" alt="Kubernetes image" className="w-46 h-46 object-contain" />
            <img src="images.png" alt="Razorpay image" className="w-46 h-46 object-contain" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
