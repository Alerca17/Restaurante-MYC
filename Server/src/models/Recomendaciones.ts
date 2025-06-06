import mongoose, { Schema } from "mongoose"

export interface IRecomendacion {

    cliente_id: number,
    fecha_generada: Date,
    recomendaciones: string[]
}

const RecomendacionSchema = new Schema<IRecomendacion>({

    cliente_id: {
        type: Number,
        required: true
    },
    fecha_generada: {
        type: Date,
        required: true,
        default: Date.now
    },
    recomendaciones: {
        type: [String],
        required: true
    }
})

const Recomendacion = mongoose.model<IRecomendacion>("Recomendacion", RecomendacionSchema);
export default Recomendacion;
