import { recuperarDatos, guardarDato, deleById } from '../models/productsData.js'




export const obtenerDatos = async () => {
    // logica
    return await recuperarDatos()
}


export const crearDato = async (dato) => {
    // logica de negocio
    // Validar si el producto ya existe

    dato.id = Math.random();
    await guardarDato(dato)
    return dato;
}


export const deleteServices = async (id) => {
    return await deleById(id)
}


// export default {
//     obtenerDatos,
//     crearDato,
//     deleteServices
// }