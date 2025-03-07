import Courses from "../models/CourseModel.js";



export const addNewCourse =async (req,res)=>{

    try {
        const courseData = req.body
        const newlyCreatedCourse = new Courses(courseData)

        const saveCourse = await newlyCreatedCourse.save()

        res.status(201).json({ success: true, message: 'Course created successfully', data:saveCourse})
        
    } catch (error) {

        console.error("Error in adding new course:", error);
        res.status(500).json({ success: false, message: error.message });
     
    }
}   
 export const getAllCourses =async (req,res)=>{

    try {
        const coursesList = await Courses.find({})
        res.status(200).json({ success: true, data: coursesList})
        
    } catch (error) {

        console.error("Error in adding new course:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}


export const getCourseDetails =async (req,res)=>{

    try {
        const {id } = req.params
        const courseDetails= await Courses.findById(id)
        if(!courseDetails){
            return res.status(404).json({ success: false, message: 'Course not found'})
        }
        res.status(200).json({ success: true, data: courseDetails})
            } catch (error) {

        console.error("Error in adding new course:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}



export const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;


        const updatedCourse = await Courses.findByIdAndUpdate(id, updatedCourseData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: updatedCourse });

    } catch (error) {
        console.error("Error in updating course:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
