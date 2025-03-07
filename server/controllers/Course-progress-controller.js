import CourseProgress from "../models/CourseProgress.js"
import Course from "../models/CourseModel.js"
import studentCourse from "../models/StudentCourseModal.js"

export const markCurrentLectureAsViewed = async (req, res) => {
    try {
        const { userId, courseId, lectureId } = req.body;

        let progress = await CourseProgress.findOne({ userId, courseId });
        if (!progress) {
            progress = new CourseProgress({
                userId,
                courseId,
                lecturesProgress: [{ lectureId, viewed: true, dateViewed: new Date() }]
            });
            await progress.save();
        } else {
            const lectureProgress = progress.lecturesProgress.find(
                (item) => item.lectureId === lectureId
            );
            if (lectureProgress) {
                lectureProgress.viewed = true;
                lectureProgress.dateViewed = new Date();
            } else {
                progress.lecturesProgress.push({ lectureId, viewed: true, dateViewed: new Date() });
            }
            await progress.save();  // 🔥 Ensure progress is saved after any update
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const allLecturesViewed = progress.lecturesProgress.length === course.curriculum.length &&
            progress.lecturesProgress.every((item) => item.viewed);

        if (allLecturesViewed) {
            progress.completed = true;
            progress.completionDate = new Date();
            await progress.save();
        }

        res.status(200).json({ success: true, message: 'Lecture viewed successfully', data: progress });

    } catch (error) {
        console.error("Error in marking current lecture as viewed:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



 //get current course progress
 export const getCurrentCourseProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const studentPurchaseCourses = await studentCourse.findOne({userId})
        const isCurrentCoursePurchasedByCurrentUserOrNot = studentPurchaseCourses?.courses?.findIndex(item=> item.courseId === courseId) > -1;
        if(!isCurrentCoursePurchasedByCurrentUserOrNot) {
            return res.status(404).json({ success: true,data:{isPurchased:false}, message: 'User is not purchasing this course' });
        }
        const currentUserCourseProgress = await CourseProgress.findOne({courseId,userId})

        if(!currentUserCourseProgress || currentUserCourseProgress?.lecturesProgress?.length === 0) {
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            return res.status(200).json({success: true, message: 'no progress found, you can start watching the course',
                data:{
                    courseDetails: course,
                    progress:[],
                    isPurchased: true,
                    
                }


            })
        }
        const courseDetails = await Course.findById(courseId)
        res.status(200).json({
            success: true,
            message: 'current course progress',
            data:{
                courseDetails,
                progress: currentUserCourseProgress.lecturesProgress,
                completed:currentUserCourseProgress.completed,
                completionDate: currentUserCourseProgress.completionDate,
                isPurchased: true
            }
        })
    } catch (error) {
        console.error("Error in getting current course progress:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
 }

//reset course progress

export  const resetCurrentCourseProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const progress = await CourseProgress.findOne({userId, courseId});
        if(!progress){
            return res.status(404).json({ success: false, message: 'No progress found for this course and user' });
        }
        progress.lecturesProgress = [];
        progress.completed = false;
        progress.completionDate = null;
        await progress.save();
        res.status(200).json({ success: true, message: 'Course progress reset successfully', data: progress,})
        
        
 
        
    } catch (error) {
        console.error("Error in resetting course progress:", error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

