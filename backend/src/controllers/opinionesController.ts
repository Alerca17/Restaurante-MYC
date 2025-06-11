import { Usuarios } from "../models/Usuarios"
import { Platos } from "../models/Platos"
import { Request, Response } from "express"
import Opiniones from "../models/Opiniones"

export const validarOpinion = async (clienteId: number, platos: number[], estrellas: number, tipo_visita?: string): Promise<string | null> => {

    const cliente = await Usuarios.findByPk(clienteId)

    if (!cliente) return "El cliente no existe"

    for (const platoId of platos) {

        const plato = await Platos.findByPk(platoId)

        if (!plato) return `Plato con ID ${platoId} no existe`
    }

    if (estrellas < 1 || estrellas > 5) return "Las estrellas deben estar entre 1 y 5"

    if (tipo_visita && !["familiar", "negocios", "pareja", "amigos", "otro"].includes(tipo_visita)) {

        return "Tipo de visita inválido"
    }

    return null
}

// Crear
export const crearOpinion = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id, estrellas, platos } = req.body
    let { tipo_visita } = req.body

    if (tipo_visita) {

        tipo_visita = tipo_visita.toLowerCase()
        req.body.tipo_visita = tipo_visita
    }

    const error = await validarOpinion(cliente_id, platos, estrellas, tipo_visita)

    if (error) {

        res.status(400).json({ error })
        return
    }

    const nueva = await Opiniones.create(req.body)
    res.status(201).json(nueva)
}


// Leer todas las opiniones
export const obtenerOpiniones = async (req: Request, res: Response): Promise<void> => {

    const opiniones = await Opiniones.find()
    res.json(opiniones)
}


// Actualizar
export const actualizarOpinion = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id, estrellas, platos } = req.body
    let { tipo_visita } = req.body

    if (tipo_visita) {

        tipo_visita = tipo_visita.toLowerCase()
        req.body.tipo_visita = tipo_visita
    }

    const error = await validarOpinion(cliente_id, platos, estrellas, tipo_visita)

    if (error) {

        res.status(400).json({ error })
        return
    }

    const actualizada = await Opiniones.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!actualizada) {

        res.status(404).json({ error: "Opinión no encontrada" })
        return
    }
    res.json(actualizada)
}


// Eliminar
export const eliminarOpinion = async (req: Request, res: Response): Promise<void> => {

    const eliminada = await Opiniones.findByIdAndDelete(req.params.id)

    if (!eliminada) {

        res.status(404).json({ error: "Opinión no encontrada" })
        return
    }
    res.json({ mensaje: "Opinión eliminada correctamente" })
};

// Filtrar por tipo de visita
export const filtrarPorTipoVisita = async (req: Request, res: Response): Promise<void> => {

    const { tipo } = req.params
    const opiniones = await Opiniones.find({ tipo_visita: tipo })
    res.json(opiniones)
}

// Filtrar Por estrellas
export const filtrarPorEstrellas = async (req: Request, res: Response): Promise<void> => {

    const estrellas = Number(req.params.estrellas)
    const opiniones = await Opiniones.find({ estrellas })
    res.json(opiniones)
}

// Por nombre de plato 
export const filtrarPorNombrePlato = async (req: Request, res: Response): Promise<void> => {

    const nombre = req.params.nombre
    const plato = await Platos.findOne({ where: { nombre } })

    if (!plato) {

        res.status(404).json({ error: "Plato no encontrado" })
        return
    }

    const opiniones = await Opiniones.find({ platos: plato.id })
    res.json(opiniones)
}
