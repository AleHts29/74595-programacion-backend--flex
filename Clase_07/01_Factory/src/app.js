import express from "express";
import __dirname from "./util.js";
import config from './config/config.js';
import routerProduct from './router/product.router.js'
import MongoSingleton from './config/mongo-singleton.js'
import cors from 'cors';


//Routers a importar:
import studentRouter from './router/students.router.js'
import coursesRouter from './router/courses.router.js'

import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// cualquier cliente los clientes
// app.use(cors())


// Configura el middleware cors con opciones personalizadas
// const corsOptions = {
//     // Permitir solo solicitudes desde un cliente específico
//     origin: 'http://127.0.0.1:5501',

//     // Configura los métodos HTTP permitidos
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

//     // Configura las cabeceras permitidas
//     allowedHeaders: 'Content-Type,Authorization',

//     // Configura si se permiten cookies en las solicitudes
//     credentials: true,
// };
// app.use(cors(corsOptions));

const PORT = config.port;


// Router
app.get('/test', (req, res) => {
    res.send({ message: "success", payload: "Success!!" });
});

app.use('/api', routerProduct);
//Declaración de Routers:
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})



// const mongoInstance = async () => {
//     try {
//         await MongoSingleton.getInstance()
//     } catch (error) {
//         console.log(error);
//     }
// }
// mongoInstance();




