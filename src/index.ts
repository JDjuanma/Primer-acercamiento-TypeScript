import { EmpleadoService } from "./services/EmpleadoService";

const servicio = new EmpleadoService;

const readline = require("readline").createInterface(({
    input: process.stdin,
    output: process.stdout
}))

function preguntar(texto: string): Promise<string> {
    return new Promise(resolve => readline.question(texto, resolve));
}

function limpiarPantalla(): void {
    console.clear();
}

async function pausar(): Promise<void> {
    await preguntar("\n Presine ENTER para continuar...");
}

async function mostrarMenu() {
  limpiarPantalla();
  console.log("=============================");
  console.log("   SISTEMA DE EMPLEADOS   ");
  console.log("============================\n");
  console.log("1) Listar empleados");
  console.log("2) Alta de empleado");
  console.log("3) Buscar empleado por ID");
  console.log("4) Actualizar salario");
  console.log("5) Eliminar empleado");
  console.log("0) Salir\n");
}

async function main() {
    const serviciio = new EmpleadoService();
    let opcion = "";
    do {
        await mostrarMenu();
        opcion = await preguntar("Elegi una opcion: ");

        switch (opcion) {
            case "1": {
                console.log("\n Lista de empleados: ");
                const lista = servicio.listar();
                if (lista.length === 0) {
                    console.log("No hay empleados cargados.");
                } else {
                    lista.forEach(e => console.log(e.toString()));
                }
                await pausar();
                break;
            }
            case "2": {
                console.log("\n Alta de empleado");
                const nombre = await preguntar("Nombre: ");
                const edadStr = await preguntar(("Edad: "));
                const salarioStr = await preguntar("Salario: ");
                const area = await preguntar("Area: ");

                const edad = parseInt(edadStr);
                const salario = parseFloat(salarioStr);

                try {
                    const nuevo = servicio.crear(nombre, edad, salario, area);
                    console.log("Empleado creado:", nuevo.toString());
                } catch (e: any) {
                    console.log("Error al crear empleado:", e.message ?? e);
                }
                await pausar();
                break;
            }
            case "3": {
                console.log("\n Buscar empleado");
                const idStr = await preguntar("ID: ");
                const id = parseInt(idStr);

                const emp = servicio.buscarPorId(id);
                if (!emp) {
                    console.log("No se encontro empleado con ese ID.");
                } else {
                    console.log(emp.toString());
                }
                await pausar();
                break;
            }
            case "4": {
                console.log("\n Actualizar salario");
                const idStr = await preguntar("ID del empleado: ");
                const id = parseInt(idStr);
                const salarioStr = await preguntar("Nuevo salario: ");
                const nuevoSalario = parseInt(salarioStr);

                try {
                    const ok = servicio.actualizarSalario(id, nuevoSalario);
                    if (!ok) {
                        console.log("No se encontro empleado con ese ID.");
                    } else {
                        console.log("Salario actualizado.");
                    }
                } catch(e: any) {
                    console.log("Error al actualizar salario: ", e.message ?? e);
                }
                await pausar();
                break;
            }
            case "5": {
                console.log("\n Eliminar empleado");
                const idStr = await preguntar("ID del empleado: ");
                const id = parseInt(idStr);

                const ok = servicio.eliminar(id);
                if (!ok) {
                    console.log("No se encontro empleado con ese ID.");
                } else {
                    console.log("Empleado eliminado. ");
                }
                await pausar();
                break;
            }
            case "0":
                console.log("\n Saliendo del sistema...");
                break;
            
            default:
                console.log("\n Opcion invalida.");
                await pausar();
                break;
        }
        
    }
    while(opcion!=="0");
        readline.close();
    
}
main();