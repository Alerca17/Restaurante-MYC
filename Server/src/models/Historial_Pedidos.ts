import mongoose, { Schema, Document } from "mongoose"

export interface IObservacion {

    platoId: number;
    comentario: string;
}
export interface IHistorialPedidos extends Document {

    pedido_id: number,
    cliente_id: number,
    fecha: Date,
    observaciones: IObservacion[],
    total: number
}

const historialPedidosSchema = new Schema({

    pedido_id: {
        type: Number,
        require: true,
    },
    cliente_id: {
        type: Number, //Tipo de dato
        require: true, //Obligatorio
    },
    fecha: {
        type: Date,
        require: true
    },
    observaciones: [{
        platoId: {
            type: Number,
            required: true
        },
        comentario: {
            type: String
        },
    }],
    total: {
        type: Number,
        require: true,
    }
})

const HistorialPedidos = mongoose.model<IHistorialPedidos>('HistorialPedidos', historialPedidosSchema)
export default HistorialPedidos