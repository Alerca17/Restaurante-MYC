import mongoose, { Schema } from "mongoose"

export interface IOpinion {

    cliente_id: number,
    calificacion: number,
    comentario: string,
    tipo_visita: string;
    fecha: Date,
    platos: number[]
}

const opinionSchema = new Schema({

    cliente_id: {
        type: Number, //Tipo de dato
        require: true, //Obligatorio
        unique: true
    },
    calificacion: {
        type: Number,
        require: true,
        min: 1, //Min calificacion
        max: 5 //Max calificacion
    },
    comentario: {
        type: String,
        require: true
    },
    tipo_visita: {
        type: String,
        enum: ["Familiar", "Negocios", "Pareja", "Amigos", "Otro"],
        required: true,
    },
    fecha: {
        type: Date,
        require: true
    },
    platos: {
        type: [Number],
        default: []
    }
})

const Opinion = mongoose.model<IOpinion>('Opinion', opinionSchema)
export default Opinion