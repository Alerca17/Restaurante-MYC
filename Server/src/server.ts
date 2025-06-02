import express from "express";
import colors from "colors";
import morgan from "morgan";
import { db } from "./config/db";
import usuariosRoute from "./routes/usuariosRouter";

const app = express();

async function conectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Conexion exitosa a la BD"));
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold("Conexion fallida a la BD"));
  }
}

conectDB();
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/usuarios", usuariosRoute);

export default app;
