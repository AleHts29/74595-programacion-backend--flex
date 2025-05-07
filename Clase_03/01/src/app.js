import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo' // esto es para el manejo de sessions

// Passport
import passport from 'passport';
import initializePassport from './config/passport.config.js'


import usersViewRouter from './routes/users.views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.routes.js'
import __dirname from './utils.js';

const app = express();
const SERVER_PORT = 9090;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuraciones handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));



//Conectamos nuestra session con el file storage.
// const fileStore = FileStore(session)

// 2da parte - Session initialization

const MONGO_URL = "mongodb://localhost:27017/clase19?retryWrites=true&w=majority";
app.use(session(
    {
        //ttl: Time to live in seconds,
        //retries: Reintentos para que el servidor lea el archivo del storage.
        //path: Ruta a donde se buscará el archivo del session store.

        // store: new fileStore({ path: './session', ttl: 120, retries: 3 }),
        store: MongoStore.create({
            mongoUrl: MONGO_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10,
        }),


        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
    }
))


// Middleware Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());



//Definir rutas
app.get('/ping', (req, res) => {
    res.send("pong")
})

/* =====================================
=               Routers               =
===================================== */
app.use('/', viewsRouter)
app.use('/users', usersViewRouter)
app.use('/api/sessions', sessionsRouter)




// Server listen
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});


// Conectamos la base de datos
const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB");
        process.exit();
    }
}
connectMongoDB();