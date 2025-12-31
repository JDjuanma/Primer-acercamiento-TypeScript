"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoService = void 0;
const Empleado_1 = require("../model/Empleado");
class EmpleadoService {
    constructor() {
        this.empleados = [];
        this.nextId = 1;
    }
    //Create
    crear(nombre, edad, salario, area) {
        const nuevo = new Empleado_1.Empleado(this.nextId++, nombre, edad, salario, area);
        this.empleados.push(nuevo);
        return nuevo;
    }
    //Read
    listar() {
        return this.empleados;
    }
    //Read
    buscarPorId(id) {
        return this.empleados.find(e => e.id == id);
    }
    //Update
    actualizarSalario(id, nuevoSalario) {
        const emp = this.buscarPorId(id);
        if (!emp)
            return false;
        emp.salario = nuevoSalario;
        return true;
    }
    //Delete
    eliminar(id) {
        const antes = this.empleados.length;
        this.empleados = this.empleados.filter(e => e.id !== id);
        return this.empleados.length < antes;
    }
}
exports.EmpleadoService = EmpleadoService;
//# sourceMappingURL=EmpleadoService.js.map