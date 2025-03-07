import express from 'express';
import { checkCoursePurchaseInfo, getAllStudentViewCourses, getStudentViewCourseDetail } from '../controllers/Course-Controller.js';
const router = express.Router()




router.get('/get',getAllStudentViewCourses)
router.get('/get/details/:id',getStudentViewCourseDetail)
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);


export default router;