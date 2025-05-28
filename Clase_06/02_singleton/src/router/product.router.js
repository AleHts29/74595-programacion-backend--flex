import { Router } from "express";
import { getDatosControllers, postDatosControllers, deleteDatosControllers } from '../controller/produts.Controller.js'

const router = Router()

// get
router.get('/', getDatosControllers);

// Post
router.post('/', postDatosControllers);

// delete
router.delete('/', deleteDatosControllers);



export default router;