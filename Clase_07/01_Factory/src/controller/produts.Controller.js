import { obtenerDatos, crearDato, deleteServices } from '../services/products.Services.js'



export const getDatosControllers = async (req, res) => {
    // llamamos al Servicio
    let datos = await obtenerDatos();
    res.json(datos);
}

export const postDatosControllers = async (req, res) => {
    let dato = req.body
    //todo:  falta validar
    await crearDato(dato)
    res.jsoni({ dato })
}



export const deleteDatosControllers = async (req, res) => {
    let { id } = req.params;
    await deleteServices(id)
    res.json({ msj: "producto eliminado" })
}


// export default {
//     getDatosControllers,
//     postDatosControllers,
//     deleteDatosControllers
// }