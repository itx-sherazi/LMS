
import StudentCourses  from "../models/StudentCourseModal.js"


 export const getCoursesByStudentId = async(req,res)=>{

    try {
        const { studentId } = req.params
        const studentBoughtCourses = await StudentCourses.findOne({
            userId: studentId,
        });
        if (!studentBoughtCourses) {
            return res.status(404).json({ success: false, message: 'No courses found for this student' });
        }
        res.status(200).json({ success: true, data: studentBoughtCourses.courses });
        
    } catch (error) {
        console.error("Error in getCoursesByStudentId:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}