import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';



// Declaramos la estrategia
const localStrategy = passportLocal.Strategy;

/**
 * Función para inicializar Passport y definir las estrategias de autenticación.
 */
const initializePassport = () => {
    /**
     *  Inicializando la estrategia local, username sera para nosotros email.
     *  Done será nuestro callback
    */

    // Register
    passport.use('register', new localStrategy(
        {
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },
        /**
         * 📌 Callback de autenticación
         * Recibe el request, el username (email), la contraseña y la función `done`
         */
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            console.log("Registrando usuario:");
            console.log(req.body);

            try {

                // Verifico si el user que me pasan ya existe
                const userExists = await userModel.findOne({ email })
                if (userExists) {
                    console.log("El usuario ya existe.");
                    return done(null, false); // Retorna `false` indicando que la autenticación falló
                }

                // DTO
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password), // <--- esto se va a encryptar
                }

                const result = await userModel.create(newUser)

                // Todo salió bien, retornamos el usuario registrado
                return done(null, result);


            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ))



    // Login
    /**
     * 📌 Estrategia de Login de Usuarios
     * Utilizamos 'login' como identificador de esta estrategia.
     */
    passport.use('login', new localStrategy(
        {
            passReqToCallback: true,// Permite acceder al request dentro del callback
            usernameField: 'email' // Indicamos que el campo `email` es el username
        },
        async (req, username, password, done) => {
            try {
                // Buscamos el usuario en la base de datos por su email
                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);

                // Si el usuario no existe, retornamos error
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }


                // Validar si el password es correcto
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }


                // Si todo es correcto, retornamos el usuario autenticado
                return done(null, user);
            } catch (error) {
                return done(error)
            }
        }
    ))




    /**
    * 📌 Serialización del Usuario
    * Se ejecuta después de una autenticación exitosa.
    * Passport almacena solo el `user._id` en la sesión en lugar de todo el objeto usuario.
    */

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })
}


// La serialización de Passport se refiere al proceso de convertir el objeto de usuario de Passport en una cadena que puede ser almacenada o transmitida de manera segura. Esta cadena se utiliza típicamente para mantener la sesión de usuario entre las solicitudes del cliente y el servidor. 

// La serialización es importante para persistir la información de autenticación del usuario de una manera que sea eficiente y segura

// estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Estas funciones son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js.

export default initializePassport;