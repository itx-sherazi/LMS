
import axiosInstance from "@/api/axiosInstace";
import axios from "axios";

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


export async function mediaDeleteService(id) {
    const {data} = await axiosInstance.delete(`media/delete/${id}`)
    return data;
}
export async function fetchInstructorCourseListService() {
    const {data} = await axiosInstance.get(`/instructor/course/get`)
    return data;
}
export async function addNewCourseService(formData) {
    const {data} = await axiosInstance.post(`/instructor/course/add`,formData)
    return data;
}
export async function fetchInstructorCourseDetailsService(id) {
    const {data} = await axiosInstance.get(`/instructor/course/get/details/${id}`)
    return data;
}
export async function updateCourseByIdService(id, formData) {
    const { data } = await axiosInstance.put(
        `/instructor/course/update/${id}`,  // ✅ API URL
        formData,                          // ✅ Sending formData
    );  
    return data;
}
export async function mediaBulkUploadService(formData,onProgressCallback) {
    try {
       
        const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
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


