"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
class Empleado {
    constructor(id, nombre, edad, _salario, area) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this._salario = _salario;
        this.area = area;
    }
    get salario() {
        return this._salario;
    }
    set salario(valor) {
        if (valor < 0) {
            throw new Error("El salario no puede ser negativo");
        }
        this._salario = valor;
    }
    toString() {
        return `[${this.id}] ${this.nombre} (${this.edad} años) - Área: ${this.area} - Salario: $${this._salario}`;
    }
}
exports.Empleado = Empleado;
//# sourceMappingURL=Empleado.js.map