import Navbar from "./Navbar";
import { useUserData } from "../hooks/getuserData";

const Display = () => {

  const { role } = useUserData();
 

  return (
    <div className="flex flex-wrap gap-3">
    <Navbar />
    <div className=" flex flex-col items-center justify-center border-4 border-blue-500 rounded-lg p-1 bg-white text-black">
      <div className="">
        <img
          className=" "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6JXA-II3rXMJZxRq89DLqxBRpTWxdP1YZQ&s"
          alt="Display"
        />
      </div>

      <div className="flex flex-col items-center justify-center relative p-2">
        <div className="mb-[-1] flex items-center justify-between w-full">
          <div className="text-xl font-extrabold  ">T-shirt</div>
          <div className="text-xl font-extrabold">₹ 499</div>
        </div>
        <div className="font-light text-gray-400 mb-1">
          T shirt blue in color hot fabric strechable
        </div>
        <div className="flex items-center justify-evenly w-full gap-2">

          {
            role === "user" ? (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buy Now </button>
            ) : (
              <>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete </button>
              </>
            )
          }

          
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Display;
