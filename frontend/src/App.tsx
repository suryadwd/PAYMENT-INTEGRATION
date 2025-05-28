import "./App.css"
import Login from "./components/Login"
import { Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Display from "./components/Display";
import Home from "./components/Home";
import About from "./components/About";
const App = () => {
  return (
    <div className="bg-gradient-to-r from-black to-blue-600 text-white min-h-screen flex items-center justify-center">
     <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/display" element={<Display />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
     </Routes>
    </div>
  )
}

export default App
