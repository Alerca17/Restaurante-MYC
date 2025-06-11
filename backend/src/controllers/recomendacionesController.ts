import { Usuarios } from "../models/Usuarios"
import { Platos } from "../models/Platos"
import { Request, Response } from "express"
import Recomendacion from "../models/Recomendaciones"

export const validarRecomendacion = async (cliente_id: number, recomendaciones: string[]): Promise<string | null> => {

    const cliente = await Usuarios.findByPk(cliente_id)
    if (!cliente) return "El cliente no existe"

    for (const nombre of recomendaciones) {

        const plato = await Platos.findOne({ where: { nombre } })
        if (!plato) return `El plato "${nombre}" no existe en la base de datos`
    }

    return null
}

//CREAR recomendación
export const crearRecomendacion = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id, recomendaciones } = req.body

    const error = await validarRecomendacion(cliente_id, recomendaciones)

    if (error) {

        res.status(400).json({ error })
        return
    }

    const nueva = await Recomendacion.create(req.body)
    res.status(201).json(nueva)
}

//OBTENER todas
export const obtenerRecomendaciones = async (req: Request, res: Response): Promise<void> => {

    const datos = await Recomendacion.find()
    res.json(datos)
}

// 🔍 OBTENER una por ID
export const obtenerRecomendacionPorId = async (req: Request, res: Response): Promise<void> => {

    const recomendacion = await Recomendacion.findById(req.params.id)

    if (!recomendacion) {

        res.status(404).json({ error: "Recomendación no encontrada" })
        return
    }
    res.json(recomendacion)
}

//ACTUALIZAR
export const actualizarRecomendacion = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id, recomendaciones } = req.body;

    const error = await validarRecomendacion(cliente_id, recomendaciones)

    if (error) {

        res.status(400).json({ error })
        return
    }

    const actualizada = await Recomendacion.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!actualizada) {

        res.status(404).json({ error: "Recomendación no encontrada" })
        return
    }

    res.json(actualizada)
}

//ELIMINAR
export const eliminarRecomendacion = async (req: Request, res: Response): Promise<void> => {

    const eliminada = await Recomendacion.findByIdAndDelete(req.params.id)

    if (!eliminada) {

        res.status(404).json({ error: "Recomendación no encontrada" })
        return
    }

    res.json({ mensaje: "Recomendación eliminada correctamente" })
}