import express from 'express';
import {checkAuth, loginUser, logout, registerUser} from '../controllers/User.js';
import authenticate from '../middleware/auth-middleware.js';
const router = express.Router();
// seeder
router.post('/register',registerUser)
router.post('/login',loginUser)

router.get('/check-auth', authenticate, checkAuth);
router.post('/logout', logout)





export default router