"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmpleadoService_1 = require("./services/EmpleadoService");
const servicio = new EmpleadoService_1.EmpleadoService;
const readline = require("readline").createInterface(({
    input: process.stdin,
    output: process.stdout
}));
function preguntar(texto) {
    return new Promise(resolve => readline.question(texto, resolve));
}
async function mostrarMenu() {
    console.log("\n=== MENÚ DE EMPLEADOS ===");
    console.log("1) Listar empleados");
    console.log("2) Alta de empleado");
    console.log("3) Buscar empleado por ID");
    console.log("4) Actualizar salario");
    console.log("5) Eliminar empleado");
    console.log("0) Salir");
}
async function main() {
    var _a, _b;
    const serviciio = new EmpleadoService_1.EmpleadoService();
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
                }
                else {
                    lista.forEach(e => console.log(e.toString()));
                }
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
                }
                catch (e) {
                    console.log("Error al crear empleado:", (_a = e.message) !== null && _a !== void 0 ? _a : e);
                }
                break;
            }
            case "3": {
                console.log("\n Buscar empleado");
                const idStr = await preguntar("ID: ");
                const id = parseInt(idStr);
                const emp = servicio.buscarPorId(id);
                if (!emp) {
                    console.log("No se encontro empleado con ese ID.");
                }
                else {
                    console.log(emp.toString());
                }
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
                    }
                    else {
                        console.log("Salario actualizado.");
                    }
                }
                catch (e) {
                    console.log("Error al actualizar salario: ", (_b = e.message) !== null && _b !== void 0 ? _b : e);
                }
                break;
            }
            case "5": {
                console.log("\n Eliminar empleado");
                const idStr = await preguntar("ID del empleado: ");
                const id = parseInt(idStr);
                const ok = servicio.eliminar(id);
                if (!ok) {
                    console.log("No se encontro empleado con ese ID.");
                }
                else {
                    console.log("Empleado eliminado. ");
                }
                break;
            }
            case "0":
                console.log("\n Saliendo del ssitema...");
                break;
            default:
                console.log("\n Opcion invalida.");
                break;
        }
    } while (opcion !== "0");
    readline.close();
}
main();
//# sourceMappingURL=index.js.map