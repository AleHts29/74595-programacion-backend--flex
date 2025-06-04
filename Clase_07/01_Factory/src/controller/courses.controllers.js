import { coursesService } from '../services/factory.js';



export async function getAllCourses(req, res) {
    try {
        let courses = await coursesService.getAll();
        res.send(courses)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los cursos." });
    }
}




export async function saveCourse(req, res) {
    try {
        // ! Recuerden hacer validaciones de la data entrante
        let courses = await coursesService.save(req.body);
        res.status(201).send(courses)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el curso." });
    }
}