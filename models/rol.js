import { Schema, model } from "mongoose";

const RolSchema = new Schema({
    rol: {
        type:String,
        required:[true,"El rol debe ser obligatorio"]

    }
})

export default model ("role", RolSchema)