// import { Usuarios } from "../models/Usuarios"
// import { generateJWT } from "../utils/jwt"

// export const loginUser = async (req, res) => {

//     try {

//         const { correo, contrasena } = req.body

//         const usuario = await Usuarios.findOne({

//             where: { correo, contrasena },
//         })

//         if (!usuario) {

//             return res.status(401).json({ error: "Correo o Contraseña Incorrectos" })
//         }

//         const token = generateJWT({id: usuario.id, rol: usuario.rol})
//         res.status(200).json(token)

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error en el servidor" })
//     }

// }

// /*             mensaje: "Autenticado...",
//             usuario: {
//                 id: usuario.id,
//                 nombre: usuario.nombre,
//                 correo: usuario.correo,
//                 rol: usuario.rol,
//             } */
import { Usuarios } from "../models/Usuarios";
import { generateJWT } from "../utils/jwt";

export const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuarios.findOne({
      where: { correo, contrasena },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Correo o Contraseña Incorrectos" });
    }

    const token = generateJWT({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    });

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
