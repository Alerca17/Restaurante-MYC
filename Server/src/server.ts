import express from "express";
import morgan from "morgan";
import usuariosRouter from "./routes/usuariosRouter";
import categoriasRouter from "./routes/categoriasRouter";
import platosRouter from "./routes/platosRouter";
import reservasRouter from "./routes/reservasRouter";
import mesasRouter from "./routes/mesasRouter";
import pedidosRouter from "./routes/platosRouter";
import pedidoPlatoRouter from "./routes/pedidoPlatoRouter";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/usuarios", usuariosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/platos", platosRouter);
app.use("/api/reservas", reservasRouter);
app.use("/api/mesas", mesasRouter);
app.use("/api/pedidos", pedidosRouter);
app.use("/api/pedidosPlatos", pedidoPlatoRouter);
export default app;
