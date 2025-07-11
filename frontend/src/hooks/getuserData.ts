import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export const useUserData = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axiosInstance.get(`api/auth/user`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setName(res.data.user.name);
          setRole(res.data.user.role);
          setId(res.data.user._id);
        }
      } catch (error) {
        console.log("error in checking auth", error);
        navigate("/auth/login");
      }
    };
    userInfo();
  }, [navigate]);

  return { name, role, id };
};
