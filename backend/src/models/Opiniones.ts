import mongoose, { Schema } from "mongoose"

export interface IOpinion {

    cliente_id: number,
    estrellas: number,
    comentario?: string,
    tipo_visita?: "familiar" | "negocios" | "pareja" | "amigos" | "otro",
    fecha?: Date,
    platos: number[]
}

const opinionSchema = new Schema({

    cliente_id: {
        type: Number, //Tipo de dato
        require: true, //Obligatorio
    },
    estrellas: {
        type: Number,
        require: true,
        min: 1, //Min calificacion
        max: 5 //Max calificacion
    },
    comentario: {
        type: String,
    },
    tipo_visita: {
        type: String,
        enum: ["familiar", "negocios", "pareja", "amigos", "otro"],
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    platos: {
        type: [Number],
        require:true
    }
})

const Opinion = mongoose.model<IOpinion>('Opiniones', opinionSchema)
export default Opinion