import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema({
    userId: String,
    courses: [
      {
        courseId: String,
        title: String,
        instructorId: String,
        instructorName: String,
        dateOfPurchase: Date,
        courseImage: String,
      },
    ],
})

const StudentCourse = mongoose.model('StudentCourse',studentCourseSchema)

export default StudentCourse;