import mongoose, { Schema } from "mongoose"

export interface IPreferencia {

    cliente_id: number; // Relación con SQL
    intolerancias: string[];
    estilos_preferidos: string[];
    platos_favoritos: string[];
}

const PreferenciaSchema = new Schema({

    cliente_id: {
        type: Number,
        required: true,
        unique: true
    },
    intolerancias: {
        type: [String],
        default: []
    },
    estilos_preferidos: {
        type: [String],
        default: []
    },
    platos_favoritos: { 
        type: [String], 
        default: [] 
    }
})

const Preferencia = mongoose.model<IPreferencia>("Preferencia", PreferenciaSchema)
export default Preferencia
