import { Empleado } from "../model/Empleado";
export declare class EmpleadoService {
    private empleados;
    private nextId;
    crear(nombre: string, edad: number, salario: number, area: string): Empleado;
    listar(): Empleado[];
    buscarPorId(id: number): Empleado | undefined;
    actualizarSalario(id: number, nuevoSalario: number): boolean;
    eliminar(id: number): boolean;
}
//# sourceMappingURL=EmpleadoService.d.ts.map