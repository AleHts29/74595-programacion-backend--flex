import { Router } from 'express';
import cookieParser from 'cookie-parser'


const router = Router();

// Cookie sin Firma
// router.use(cookieParser())

// Cookie con FIrma
router.use(cookieParser('CoderC0ki3firm4d4'))


// Set Cookie
router.get('/setcookie', (req, res) => {
    let data = "Esto es una cokkie de test"
    // sin firma
    // res.cookie('cookieCoder', data, { maxAge: 500000 }).send({ status: "Success", msg: "Cookie asignada con exito!!" })


    // con firma
    res.cookie('cookieCoder', data, { maxAge: 500000, signed: true }).send({ status: "Success", msg: "Cookie asignada con exito!!" })
})


router.get('/getcookie', (req, res) => {
    // res.send(req.cookies) // <-- Sin firma

    res.send(req.signedCookies) // <-- Con firma
})




router.get('/deletecookie', (req, res) => {
    res.clearCookie('cookieCoder').send({ status: "Success", msg: "Cookie borrada con exito!!" })
})



export default router;