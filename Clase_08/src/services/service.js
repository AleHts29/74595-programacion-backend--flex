
// Importacion de los DAOs
import StudentServiceDao from "./dao/mongo/students.service.js";
import CoursesServiceDao from "./dao/mongo/courses.service.js"

// Importacion de un repository
import StudentRepository from './repository/students.repository.js'
import CoursesRepository from './repository/courses.repository.js'


// Instanciamos las clases
const studentDao = new StudentServiceDao()
const coursesDao = new CoursesServiceDao();


export const studentService = new StudentRepository(studentDao)
export const coursesService = new CoursesRepository(coursesDao)


