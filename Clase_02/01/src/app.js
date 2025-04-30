import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/view.routes.js'
import session from 'express-session';

const app = express()


//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// 2da parte - Session initialization
app.use(session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true
}))







// Router
app.use('/api/users', usersRouter)
app.use('/', viewsRouter)


const SERVER_PORT = 9090 //todo: Esto 0debe ir en una variable de entorno
app.listen(SERVER_PORT, () => {
    console.log(`Server run on port: ${SERVER_PORT}`);
})


// conexion a la DB
//todo: Esto 0debe ir en una variable de entorno
// const DB = 'mongodb+srv://c43395:admin@cluster0.lgoy2ny.mongodb.net/clase14?retryWrites=true&w=majority'
const localDB = 'mongodb://localhost:27017/clase2?retryWrites=true&w=majority'
const connectMongoDB = async () => {
    try {
        await mongoose.connect(localDB)
        console.log('conectado con exito a la DB de Mongo');

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongoDB()