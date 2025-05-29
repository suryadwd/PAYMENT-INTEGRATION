import "./App.css"
import Login from "./components/Login"
import { Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Display from "./components/Display";
import Home from "./components/Home";
import About from "./components/About";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from "./middleware/Protected";




const App = () => {
  return (
    <div className="bg-gradient-to-r from-black to-blue-600 text-white min-h-screen flex items-center justify-center">
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/store" element={ <ProtectedRoute> <Display /> </ProtectedRoute> } />
      <Route path="/about" element={<ProtectedRoute> <About /></ProtectedRoute>} />
     </Routes>
     <ToastContainer position="top-right"  />
    </div>
  )
}

export default App
