
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

export async function fetchStudentViewCourseListService(query){
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);

    return data;
}
export async function fetchStudentViewDetailsService(courseId){
    const {data} = await axiosInstance.get(`/student/course/get/${courseId}`)
    return data;
}


export async function checkCoursePurchaseInfoService(courseId,studentId){
    const {data} = await axiosInstance.get(`/student/course/purchase-info/${courseId}/${studentId}`)
    return data;
}
export const createPaymentService = async (paymentPayload) => {
  const response = await axiosInstance.post("/student/order/create", paymentPayload);
  return response.data;
};
export const captureAndFinalizePaymentService = async (sessionId, orderId) => {
    const response = await axiosInstance.post("/student/order/capture", {
      sessionId, // ✅ Stripe ke session_id ko bhejna
      orderId,
    });
    return response.data;
  };
  
  export const fetchStudentBoughtCoursesService= async (studentId) => {
    const {data} = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
    return data;
  };

  export const getCurrentCourseProgressService= async (userId, courseId) => {
    const {data} = await axiosInstance.get(`/student/course-progress/get/${userId}/${courseId}`);
    return data;
  };
  export const markLectureAsViewedService= async (userId, courseId,lectureId) => {
    const {data} = await axiosInstance.post(`/student/course-progress/mark-lecture-viewed`,{
        userId,
        courseId,
        lectureId
    });
    return data;
  };
  export const resestCoursProgressService= async (userId, courseId) => {
    const {data} = await axiosInstance.post(`/student/course-progress/reset-progress`,{
        userId,
        courseId,
  
    });
    return data;
  };