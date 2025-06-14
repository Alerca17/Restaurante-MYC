import { Usuarios } from "../models/Usuarios"

export const registerUser = async (req, res) => {

    try {
        const existente = await Usuarios.findOne({
            where: { correo: req.body.correo },
        });
        if (existente) {
            return res
                .status(400)
                .json({ error: "YA EXISTE UN USUARIO CON ESE CORREO" });
        } else {
            const usuario = await Usuarios.create(req.body);

            res.status(201).json({
                mensaje: "USUARIO CREADO CON ÉXITO",
                data: usuario,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "HUBO UN ERROR" });
    }
}
