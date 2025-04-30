import { Router } from 'express';
import { userModel } from '../models/user.model.js'


const router = Router()

// Aqui van los endpoints del CRUD de Users


// GET
router.get("/", async (req, res) => {
    try {
        const users = await userModel.find()
        console.log(users);
        res.send({ result: "Success", payload: users })
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
    }
})


// POST
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body


        // TODO: Validar mlo que viene en el req.body


        const user = await userModel.create({ first_name, last_name, email, age, password })
        console.log(user);


        res.status(201).send({ result: "Success", payload: user._id })
    } catch (error) {
        console.error("No se pudo crear el usuario con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuario con moongose", message: error });
    }
})

// PUT
router.put("/:id", async (req, res) => {
    try {
        let userUpdated = req.body;
        let user = await userModel.updateOne({ _id: req.params.id }, userUpdated)
        res.status(202).send(user);
    } catch (error) {
        console.error("No se pudo modificar usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo modificar usuarios con moongose", message: error });
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        let result = await userModel.deleteOne({ _id: req.params.id })
        res.status(202).send({ status: "success", payload: result });
    } catch (error) {
        console.error("No se pudo eliminar usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo eliminar usuarios con moongose", message: error });
    }
})


/*=============================================
=                   2da Parte                 =
=============================================*/


// Contador de visitas
router.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Hola usted ha visitado la pagina ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})



// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body


    if (username !== "pepe" || password !== "qwerty123") {
        res.status(401).json({ error: "Credenciales invalidas" })
    }

    // levantamos una session para ese user
    req.session.user = username
    req.session.admin = true

    console.log('Session: ', req.session);

    res.send("Login success")
})



// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ error: "Error Logout", msg: "Error al cerrar la session" })
        }

        res.send("Session cerrada")
    })
})



router.get('/private', auth, (req, res) => {
    console.log(req.session);
    res.send("Si estas viendo esto es porque eres ADMIN!!")

})


function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin === true) {
        next()
    }
    res.status(401).json({ error: "Unaouthorized" })
}


export default router;