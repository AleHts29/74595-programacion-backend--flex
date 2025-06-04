import { Router } from "express";
import * as CoursesController from '../controller/courses.controllers.js'


const router = Router();


router.get('/', CoursesController.getAllCourses);
router.post('/', CoursesController.saveCourse);

export default router;