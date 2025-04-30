import { Router } from 'express';
import userModel from '../models/user.model.js'


const router = Router();


// Register
router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        console.log("Registrando usuario:");
        console.log(req.body);

        // Verifico si el user que me pasan ya existe
        const userExists = await userModel.findOne({ email })
        if (userExists) return res.status(400).json({ message: 'User ya existe' });

        // DTO
        let newUser = {
            first_name,
            last_name,
            email,
            age,
            password, // <--- esto se va a encryptar
        }


        const result = await userModel.create(newUser)


        res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await userModel.findOne({ email, password })

        // Si encontramos el user
        // Creamos la session del User
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
        }

        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

export default router;