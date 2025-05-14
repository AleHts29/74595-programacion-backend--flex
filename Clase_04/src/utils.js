import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Metodo para crear Hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


// Metodo para compara el Hash
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password)
}



// JWT: Nativo
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("Entrando a llamar strategy: ", strategy);
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);

            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            }

            console.log("Usuario obtenido del strategy: ");
            console.log(user);

            req.user = user
            next()
        })(req, res, next);
    }
}

// para manejo de Auth
export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")

        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
        }
        next()
    }
};

// export const authToken = (req, res, next) => {
//     //El JWT token se guarda en los headers de autorización.
//     const authHeader = req.headers.authorization;
//     console.log("Token present in header auth:");
//     console.log(authHeader);

//     if (!authHeader) {
//         return res.status(401).send({ error: "User not authenticated or missing token." });
//     }

//     /*
//         Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKdWFuIEdvbnphbGV6IiwiZW1haWwiOiJqdWFuQGxpdmUuY29tLmFyIiwiYWdlIjozNywicm9sZSI6InVzZXIifSwiaWF0IjoxNjk0NDc3MzQ5LCJleHAiOjE2OTQ0Nzc0MDl9.yo85svKwG-zsLGIXc_vcO9frxbNGF2N8u7sUvphDdic
//     */
//     const token = authHeader.split(' ')[1]//Se hace el split para retirar la palabra Bearer.


//     //  Validamos
//     jwt.verify(token, PRIVATE_KEY, (error, credential) => {
//         if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });

//         // Todo ok
//         req.user = credential.user
//         console.log(req.user);
//         next()
//     })
// }









export default __dirname;