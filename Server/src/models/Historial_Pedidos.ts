import mongoose, { Schema } from "mongoose"

export interface IHistorialPedidos {

    pedido_id: number,
    cliente_id: number,
    fecha: Date,
    platos: number[],
    total: number
}

const historialPedidosSchema = new Schema({

    pedido_id: {
        type: Number,
        require: true,
        unique: true
    },
    cliente_id: {
        type: Number, //Tipo de dato
        require: true, //Obligatorio
        unique: true
    },
    fecha: {
        type: Date,
        require: true
    },
    platos: {
        type: [Number],
        default: []
    },
    total: {
        type: Number,
        require: true,
    }
})

const HistorialPedidos = mongoose.model<IHistorialPedidos>('HistorialPedidos', historialPedidosSchema)
export default HistorialPedidos