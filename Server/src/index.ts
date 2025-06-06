import app from "./server";
import colors from "colors";
import { db } from "./config/db";

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    console.log(colors.yellow("🔄 Intentando conectar a la base de datos..."));
    console.log("DATABASE_URL existe:", !!process.env.DATABASE_URL);

    // Retry mechanism para Render
    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
      try {
        await db.authenticate();
        console.log(
          colors.green.bold("✅ Conexión a la base de datos exitosa")
        );
        break;
      } catch (error) {
        retryCount++;
        console.log(
          colors.yellow(
            `⚠️  Intento ${retryCount}/${maxRetries} fallido, reintentando en 3 segundos...`
          )
        );

        if (retryCount === maxRetries) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    console.log(colors.blue("📊 Sincronizando modelos..."));
    await db.sync({ alter: true });
    console.log(colors.blue("✅ Sincronización completada"));

    app.listen(port, () => {
      console.log(
        colors.cyan.bold(`🚀 REST API corriendo en el puerto ${port}`)
      );
      console.log(
        colors.magenta(`🌐 Servidor accesible en: http://localhost:${port}`)
      );
    });
  } catch (error) {
    console.error(colors.red.bold("❌ Error crítico al iniciar el servidor"));
    console.error("Tipo de error:", error.name);
    console.error("Mensaje:", error.message);

    // Información adicional para debug
    if (error.parent) {
      console.error("Error de conexión:", error.parent.message);
    }

    console.error("Stack trace completo:", error);

    // En desarrollo, termina el proceso. En producción, espera y reintenta
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    } else {
      console.log(colors.yellow("🔄 Reintentando en 10 segundos..."));
      setTimeout(startServer, 10000);
    }
  }
}

// Manejo de señales para cierre graceful
process.on("SIGTERM", () => {
  console.log(colors.yellow("🛑 Recibida señal SIGTERM, cerrando servidor..."));
  db.close();
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log(colors.yellow("🛑 Recibida señal SIGINT, cerrando servidor..."));
  db.close();
  process.exit(0);
});

startServer();
