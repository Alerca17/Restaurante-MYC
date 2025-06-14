import express from "express";
import morgan from "morgan";
import usuariosRouter from "./routes/usuariosRouter";
import categoriasRouter from "./routes/categoriasRouter";
import platosRouter from "./routes/platosRouter";
import reservasRouter from "./routes/reservasRouter";
import mesasRouter from "./routes/mesasRouter";
import pedidosRouter from "./routes/pedidosRouter";
import pedidoPlatoRouter from "./routes/pedidoPlatoRouter";
import { connectDB } from "./config/dbmg";
import 'dotenv/config'
import historialPedidosRouter from "./routes/historialPedidosRouter"
import opinionesRouter from "./routes/opinionesRouter"
import preferenciasRouter from "./routes/preferenciasRouter"
import recomendacionesRouter from "./routes/recomendacionesRouter"
import authRoutes from "./routes/authRouter"
import cors from "cors"
import { corsConfig } from "./config/cors";

//Conexion a Render
const app = express()

//Configuración de CORS
app.use(cors(corsConfig))

app.use(morgan("dev"))
app.use(express.json())

//Conexion a Mongo
connectDB()

//Rutas a Mongo
app.use('/api/historial', historialPedidosRouter)
app.use('/api/opiniones', opinionesRouter)
app.use("/api/preferencias", preferenciasRouter)
app.use("/api/recomendaciones", recomendacionesRouter)

//Rutas Postgresql
app.use("/api/usuarios", usuariosRouter)
app.use("/api/categorias", categoriasRouter)
app.use("/api/platos", platosRouter)
app.use("/api/reservas", reservasRouter)
app.use("/api/mesas", mesasRouter)
app.use("/api/pedidos", pedidosRouter)
app.use("/api/pedidosPlatos", pedidoPlatoRouter)

//Autenticación
app.use("/api/auth", authRoutes)

export default app
