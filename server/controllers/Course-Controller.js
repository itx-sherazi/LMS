

import Course from "../models/CourseModel.js"
import StudentCourses  from "../models/StudentCourseModal.js"

 export const getAllStudentViewCourses= async(req,res)=>{

    try {
        const {category = [],level =[], primaryLanguage = [],sortBy ="price-lowtohigh"}= req.query
        let filters = {};
        if(category.length){
            filters.category = {$in: category.split(",")}
        }
        if(level.length){
            filters.level = {$in: level.split(",")}
        }
        if(primaryLanguage.length){
            filters.primaryLanguage = {$in: primaryLanguage.split(",")}
        }
        let sortParams = {};
        switch (sortBy) {
            case 'price-lowtohigh':
                sortParams.pricing = 1
                
                break;
                case 'price-hightolow':
                    sortParams.pricing = -1
                
                break;
                case 'title-atoz':
                    sortParams.title = 1
                
                break;
                case 'title-ztoa':
                    sortParams.title = -1
                
                break;
                
        
            default:
                sortParams.pricing = 1
                break;
        }
const coursesList = await Course.find(filters).sort(sortParams);


       
        res.status(200).json({ success: true, data: coursesList });
        
    } catch (error) {
        console.error("Error in fetching student list:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}


export const getStudentViewCourseDetail= async(req,res)=>{

    try {
        const {id ,studentId} = req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        const studentCourse = await StudentCourses.findOne({ userId:studentId});

        res.status(200).json({ success: true, data: courseDetails,coursePurchasedId:ifStudentAlreadyBoughtCurrentCourse ? id:null });
        
    } catch (error) {
        console.error("Error in fetching student course details:", error);
        res.status(500).json({ success: false, message: error.message });

        
    }
}
 export const checkCoursePurchaseInfo = async (req, res) => {
    try {
      const { id, studentId } = req.params;
      const studentCourses = await StudentCourses.findOne({
        userId: studentId,
      });
  
      const ifStudentAlreadyBoughtCurrentCourse =
        studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
      res.status(200).json({
        success: true,
        data: ifStudentAlreadyBoughtCurrentCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };
