import { Usuarios } from "../models/Usuarios"
import { Request, Response } from "express"
import Preferencias from "../models/Preferencias_Cliente"

export const validarClientePreferencia = async (cliente_id: number): Promise<string | null> => {

    const cliente = await Usuarios.findByPk(cliente_id)

    if (!cliente) return "El cliente no existe en la base de datos"
    return null
}

// CREAR
export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id } = req.body

    const error = await validarClientePreferencia(cliente_id)

    if (error) {

        res.status(400).json({ error })
        return
    }

    const yaExiste = await Preferencias.findOne({ cliente_id })

    if (yaExiste) {

        res.status(400).json({ error: "Este cliente ya tiene preferencias registradas" })
        return
    }

    const nueva = await Preferencias.create(req.body)
    res.status(201).json(nueva)
}

//OBTENER TODAS
export const obtenerPreferencias = async (req: Request, res: Response) => {

    const preferencias = await Preferencias.find()
    res.json(preferencias)
}

// OBTENER UNA POR ID
export const obtenerPreferenciaPorId = async (req: Request, res: Response): Promise<void> => {

    const preferencia = await Preferencias.findById(req.params.id)

    if (!preferencia) {

        res.status(404).json({ error: "Preferencia no encontrada" })
        return
    }
    res.json(preferencia)
}

// ACTUALIZAR
export const actualizarPreferencia = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id } = req.body

    const error = await validarClientePreferencia(cliente_id)

    if (error) {
        res.status(400).json({ error })
        return
    }

    const actualizada = await Preferencias.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!actualizada) {
        res.status(404).json({ error: "Preferencia no encontrada" })
        return
    }
    res.json(actualizada)
}

// ELIMINAR
export const eliminarPreferencia = async (req: Request, res: Response) => {

    const eliminada = await Preferencias.findByIdAndDelete(req.params.id)

    if (!eliminada) {

        res.status(404).json({ error: "Preferencia no encontrada" })
        return
    }

    res.json({ mensaje: "Preferencia eliminada correctamente" })
}
