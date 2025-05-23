import { Router } from 'express'

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

router.get('/', (req, res) => {
    res.render("profile", {
        user: req.session.user
    })
})

export default router