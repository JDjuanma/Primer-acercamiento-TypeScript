import * as express from "express";
import { EmpleadoService } from "./services/EmpleadoService";
import { crearEmpleadoRouter } from "./routes/empleadosRoutes";

const app = express();
app.use(express.json());

const servicio = new EmpleadoService();

// Usar el router de empleados bajo el prefijo /empleados
app.use("/empleados", crearEmpleadoRouter(servicio));

app.listen(3000, () => {
  console.log("🚀 API lista en http://localhost:3000");
});
