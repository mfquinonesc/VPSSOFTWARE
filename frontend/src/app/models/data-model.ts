export class DataModel {
    codigo: number;
    nome: string;

    constructor(codigo?: number, nome?: string) {
        this.codigo = codigo || 0;
        this.nome = nome || '';
    }
}
