import mongoose from "mongoose";

const userCollection = 'usuarios'


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Correo es requerido"]
    },
    age: Number,
    password: String
}, {
    versionKey: 'version' // Deshabilitar el parámetro "__v"
})


export const userModel = mongoose.model(userCollection, userSchema)