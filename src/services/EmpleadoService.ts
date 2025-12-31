import { Empleado } from "../model/Empleado";
import * as fs from "fs";
import * as path from "path";

export class EmpleadoService{
    private empleados: Empleado [] = [];
    private nextId = 1;
    private readonly rutaArchivo: string;

    constructor(){
        this.rutaArchivo = path.join(__dirname,"..","..","data","empleados.json");
        this.cargarDesdeArchivo();
    }

    private cargarDesdeArchivo(): void {
        try {
            if(!fs.existsSync(this.rutaArchivo)) {
                this.empleados = [];
                this.nextId = 1;
                return;
            }
            const contenido = fs.readFileSync(this.rutaArchivo, "utf-8");
            if(!contenido.trim()) {
                this.empleados = [];
                this.nextId = 1;
                return;
            }

            const datos = JSON.parse(contenido) as any[];

            this.empleados = datos.map(((d: any) => new Empleado(d.id, 
                d.nombre,d.edad,d._salario ?? d.salario, d.area))
            );

            const maxId = this.empleados.reduce((max, e) => Math.max(max, e.id), 0);
            this.nextId = maxId +1;
        } catch(e) {
            console.error("Error al cargar empleados desde el JSON:", e);
            this.empleados = [];
            this.nextId = 1;
        }

    }

    private guardarEnArchivo(): void {
        try {
            const datos = this.empleados.map(e => ({
                id: e.id,
                nombre: e.nombre,
                edad:e.edad,
                salario:e.salario,
                area:e.area
            }));

            const json = JSON.stringify(datos, null, 2);
            fs.writeFileSync(this.rutaArchivo, json, "utf-8");
        } catch (e) {
            console.error("Error al guardar empleados en JSON:", e);
        }
    }

    //CRUD

    //Create
    crear(nombre: string, edad: number, salario: number, area: string): Empleado {
        const nuevo = new Empleado(this.nextId++, nombre, edad, salario, area);
        this.empleados.push(nuevo);
        this.guardarEnArchivo();
        return nuevo;
    }

    //Read
    listar(): Empleado[] {
        return this.empleados;
    }

    //Read
    buscarPorId(id: number): Empleado | undefined{
        return this.empleados.find(e => e.id === id);
    }

    //Update
    actualizarSalario(id: number, nuevoSalario: number): boolean {
        const emp = this.buscarPorId(id);
        if(!emp) return false;
        emp.salario = nuevoSalario;
        this.guardarEnArchivo();
        return true;
    }

    //Delete
    eliminar(id: number): boolean {
        const antes = this.empleados.length;
        this.empleados = this.empleados.filter(e => e.id !== id);
        const elimino = this.empleados.length < antes;
        if(elimino) {
            this.guardarEnArchivo();
        }
        return elimino;
    }
}

