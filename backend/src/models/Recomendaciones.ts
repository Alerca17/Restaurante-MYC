import mongoose, { Schema } from "mongoose"

export interface IRecomendacion {

    cliente_id: number,
    fecha: Date,
    motivos: string;
    recomendaciones: string[]
}

const RecomendacionSchema = new Schema<IRecomendacion>({

    cliente_id: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    motivos: {
        type: String
    },
    recomendaciones: {
        type: [String],
        required: true
    }
})

const Recomendacion = mongoose.model<IRecomendacion>("Recomendacion", RecomendacionSchema)
export default Recomendacion
