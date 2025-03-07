
import express from 'express'
import { getCurrentCourseProgress, markCurrentLectureAsViewed, resetCurrentCourseProgress } from '../controllers/Course-progress-controller.js';

const router = express.Router()


router.get("/get/:userId/:courseId", getCurrentCourseProgress);
router.post("/mark-lecture-viewed", markCurrentLectureAsViewed);
router.post("/reset-progress", resetCurrentCourseProgress);


export default router