import * as express from "express";
import { EmpleadoService } from "../services/EmpleadoService";

export function crearEmpleadoRouter(servicio: EmpleadoService) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(servicio.listar());
  });

  router.post("/", (req, res) => {
    const { nombre, edad, salario, area } = req.body;
    try {
      const nuevo = servicio.crear(nombre, edad, salario, area);
      res.status(201).json(nuevo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const emp = servicio.buscarPorId(id);
    emp ? res.json(emp) : res.status(404).json({ error: "No encontrado" });
  });

  router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const { salario } = req.body;
    const ok = servicio.actualizarSalario(id, salario);
    ok
      ? res.json({ msg: "Actualizado" })
      : res.status(404).json({ error: "No encontrado" });
  });

  router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const ok = servicio.eliminar(id);
    ok
      ? res.json({ msg: "Eliminado" })
      : res.status(404).json({ error: "No encontrado" });
  });

  return router;
}
