import * as express from "express";
import { EmpleadoService } from "./services/EmpleadoService";

const app = express();
app.use(express.json());
const servicio = new EmpleadoService();

//Rutas del CRUD API

//Listar empleadso
app.get("/empleados", (req, res) => {
    res.json(servicio.listar())
});

//Crear empleado
app.post("/empleados", (req, res) => {
    const { nombre, edad, salario, area } = req.body;
    try {
        const nuevo = servicio.crear(nombre, edad, salario, area);
        res.status(201).json(nuevo);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/empleados/:id", (req, res) => {
    const id = Number(req.params.id);
    const emp = servicio.buscarPorId(id);
    emp ? res.json(emp) : res.status(404).json({ error: "No encontrado" });
});

app.put("/empleados/:id", (req, res) => {
    const id = Number(req.params.id);
    const { salario } = req.body;
    const ok = servicio.actualizarSalario(id, salario);
    ok ? res.json({ msg: "Actualizando" }) : res.status(404).json({ error: "No encontrado" });
});

app.delete("/empleados/:id", (req, res) => {
    const id = Number(req.params.id);
    const ok = servicio.eliminar(id);

    ok ? res.json({ msg: "Eliminado" }) : res.status(404).json({ error: "No encontrado" });
});

app.listen(3000, () => {
    console.log("api lista en http://localHost:3000");
});