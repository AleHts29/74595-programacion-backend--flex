import { studentService } from '../services/factory.js';
import StudentsDto from '../services/dto/student.dto.js';

export async function getAllStudents(req, res) {
    try {
        let stusdents = await studentService.getAll()
        res.send(stusdents)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
}



export async function saveStudent(req, res) {
    try {
        const studentDTO = new StudentsDto(req.body)
        let result = await studentService.save(studentDTO)
        res.status(201).send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el estudiante." });
    }
}