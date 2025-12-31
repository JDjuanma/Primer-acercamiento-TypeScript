import { Empleado } from "../model/Empleado";

export class EmpleadoService {
    private empleados: Empleado[] = [];
    private nextId = 1;

    //Create
    crear(nombre: string, edad: number, salario: number, area: string): Empleado {
        const nuevo = new Empleado(this.nextId++, nombre, edad, salario, area);
        this.empleados.push(nuevo);
        return nuevo;
    }

    //Read
    listar(): Empleado[] {
        return this.empleados;
    }

    //Read
    buscarPorId(id: number): Empleado | undefined {
        return this.empleados.find(e => e.id == id);
    }

    //Update
    actualizarSalario(id: number, nuevoSalario: number): boolean {
        const emp = this.buscarPorId(id);
        if (!emp) return false;
        emp.salario = nuevoSalario;
        return true;
    }
    //Delete
    eliminar(id: number): boolean {
        const antes = this.empleados.length;
        this.empleados = this.empleados.filter(e => e.id !== id);
        return this.empleados.length < antes;
    }

}