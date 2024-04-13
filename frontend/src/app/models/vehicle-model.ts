export class VehicleModel {
    AnoModelo?: number;
    CodigoFipe?: string;
    Combustivel?: string;
    Marca?: string;
    MesReferencia?: string;
    Modelo?: string;
    SiglaCombustivel?: string;
    TipoVeiculo?: number;
    Valor?: string;

    constructor(
        AnoModelo?: number,
        CodigoFipe?: string,
        Combustivel?: string,
        Marca?: string,
        MesReferencia?: string,
        Modelo?: string,
        SiglaCombustivel?: string,
        TipoVeiculo?: number,
        Valor?: string
    ) {
        this.AnoModelo = AnoModelo;
        this.CodigoFipe = CodigoFipe;
        this.Combustivel = Combustivel;
        this.Marca = Marca;
        this.MesReferencia = MesReferencia;
        this.Modelo = Modelo;
        this.SiglaCombustivel = SiglaCombustivel;
        this.TipoVeiculo = TipoVeiculo;
        this.Valor = Valor;
    }   
}
