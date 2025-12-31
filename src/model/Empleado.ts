export class Empleado {
    constructor(
        public id: number,
        public nombre: string,
        public edad: number,
        private _salario: number,
        public area: string
    ){}

    get salario(): number{
        return this._salario;
    }

    set salario(valor: number){
        if(valor< 0){
            throw new Error("El salario no puede ser negativo");
        }
        this._salario = valor;
    }
    toString(): string {
        return `[${this.id}] ${this.nombre} (${this.edad} años) - Área: ${this.area} - Salario: $${this.salario}`;
    }
}