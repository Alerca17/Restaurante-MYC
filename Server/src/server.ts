import express from "express";
import morgan from "morgan";
import usuariosRoute from "./routes/usuariosRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/usuarios", usuariosRoute);

export default app;
