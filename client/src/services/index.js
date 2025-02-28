
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
export async function mediaUploadService(formData,onProgressCallback) {
    try {
       
        const { data } = await axiosInstance.post("/media/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers
            onUploadProgress:(ProgressEvent=>{
                const percenCompleted = Math.round((ProgressEvent.loaded * 100)/ progressEvent.total  )
            
             onProgressCallback(percenCompleted)
            })
        });

        
        return data;
    } catch (error) {
        console.error("❌ Error Uploading File:", error);
        throw error; // Exception throw karo taake catch block me aye
    }
}

