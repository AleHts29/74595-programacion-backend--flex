import MongoSingleton from '../config/mongo-singleton.js'
import config from '../config/config.js';

let studentService
let coursesService

async function initializeMongoService() {
    console.log("Iniciando servicio para MongoDB");
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

// Patron Factory
switch (config.persistence) {
    case 'mongo':
        // conxion a DB
        initializeMongoService()

        // import dinamicos de los DAOs
        const { default: StudentServiceMongo } = await import('./dao/mongo/students.service.js')
        const { default: CoursesServiceMongo } = await import('./dao/mongo/courses.service.js')

        // creo instancias
        studentService = new StudentServiceMongo()
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        coursesService = new CoursesServiceMongo()
        console.log("Servicio de cursos cargado:");
        console.log(coursesService);
        break;
    case 'files':
        // logica
        const { default: StudentServiceFileSystem } = await import('./dao/filesystem/students.service.js')
        const { default: CoursesServiceFileSystem } = await import('./dao/filesystem/courses.service.js')

        // creo instancias
        studentService = new StudentServiceFileSystem()
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        coursesService = new CoursesServiceFileSystem()
        console.log("Servicio de cursos cargado:");
        console.log(coursesService);
        break;
    case 'sql':
    // logica


    default:
        break
}


export { studentService, coursesService }

