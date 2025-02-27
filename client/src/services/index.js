
import axiosInstance from "@/api/axiosInstace";

export async function registerService(formData) {
    return await axiosInstance.post('/auth/register', { ...formData, role: 'user' });
}

export async function loginService(formData) {
    return await axiosInstance.post('/auth/login', formData, { withCredentials: true });
}

export async function checkAuthService() {
    return await axiosInstance.get('/auth/check-auth', { withCredentials: true });
}
