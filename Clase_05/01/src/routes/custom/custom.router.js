import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils.js";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    };

    getRouter() {
        return this.router;
    }

    init() { } //Esta inicialilzacion se usa para las clases heredadas.



    // Customizar los metodos HTTP
    get(path, policies, ...callbacks) {
        console.log("Entrando por GET a custom router con Path: " + path);
        console.log(policies);

        this.router.get(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks)
        )
    }

    post(path, policies, ...callbacks) {
        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };

    put(path, policies, ...callbacks) {
        this.router.put(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };

    delete(path, policies, ...callbacks) {
        this.router.delete(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks));
    };



    handlePolicies = policies => (req, res, next) => {
        console.log("Politicas a evaluar:");
        console.log(policies);

        //Validar si tiene acceso publico:
        if (policies[0] === "PUBLIC") return next()

        //El JWT token se guarda en los headers de autorización.
        const authHeader = req.headers.authorization;
        console.log("Token present in header auth:");
        console.log(authHeader);

        if (!authHeader) {
            return res.status(401).send({ error: "User not authenticated or missing token." });
        }

        const token = authHeader.split(' ')[1] //Se hace el split para retirar la palabra Bearer.


        // validamos el token
        jwt.verify(token, PRIVATE_KEY, (error, credenciales) => {
            if (error) return res.status(403).send("Token invalid, Unauthorized!")


            const user = credenciales.user


            // Preguntamos si dentro del array policies se encuentra el user.role que me esta llegando con este usuario
            if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({ error: "El usuario no tiene privilegios, revisa tus roles!" });

            // si el user.role se encuentra dentro de policies, podes ingresar
            req.user = user
            console.log(req.user);
            next();
        })


    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.status(200).send({ status: "Success", payload });
        res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
        res.sendClientError = error => res.status(400).send({ status: "Client Error, Bad request from client.", error });
        res.sendUnauthorizedError = error => res.status(401).send({ error: "User not authenticated or missing token." });
        res.sendForbiddenError = error => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });

        next();

    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.error(error);
                // params[1] hace referencia al res
                params[1].status(500).send(error);
            }
        });
    };



};