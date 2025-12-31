export declare class Empleado {
    id: number;
    nombre: string;
    edad: number;
    private _salario;
    area: string;
    constructor(id: number, nombre: string, edad: number, _salario: number, area: string);
    get salario(): number;
    set salario(valor: number);
    toString(): string;
}
//# sourceMappingURL=Empleado.d.ts.map