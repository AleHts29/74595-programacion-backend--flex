import { Router } from 'express'
import { passportCall, authorization } from '../utils.js'
const router = new Router()

/* =====================================
=  ESTO RENDERIZA SOLO VISTAS DE HBS   =
===================================== */

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/register', (req, res) => {
    res.render("register")
})

router.get('/',
    // authToken, 
    passportCall('jwt'),
    authorization('user'),
    (req, res) => {
        res.render("profile", {
            // user: req.session.user
            user: req.user
        })
    })

export default router