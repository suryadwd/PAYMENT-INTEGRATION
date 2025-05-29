import express from 'express';
import { getUserInfo, login, logout, register } from '../controller/user.controller.js';
import { protectRoute } from "../utils/middleware.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', protectRoute, getUserInfo);

export default router;
