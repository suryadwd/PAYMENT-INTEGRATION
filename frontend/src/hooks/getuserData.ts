
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL; // or however you access it

export const useUserData = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/user`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setName(res.data.user.name);
          setRole(res.data.user.role);
        }
      } catch (error) {
        console.log('error in checking auth', error);
        navigate('/auth/login');
      }
    };
    userInfo();
  }, [navigate]);

  return { name, role };
};
