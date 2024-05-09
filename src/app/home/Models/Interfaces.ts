import { TipoPropiedad } from './Enums';

export interface buques {
    nombreBuque: string;
    numeroSerie: string;
    anoConstruccion: number;
    numeroMotor: string;
    numeroSerieMotor: string;
    fabricanteMotor: string;
    claseBien: string;
    estadoActual: string;
    uso: string;
    fechaUltMovimiento: string;
}

export interface vehiculos {
    placa: string;
    tipoBien: string;
    marca: string
    numeroVIN: string;
    numeroSerieMotor: string;
    fabricanteMotor: string;
    claseBien: string;
    estadoActual: string;
    uso: string;
    fechaUltMovimiento: string;
    idMoneda?: number;
}

export interface aeronaves {
    placa: string;
    tipoBien: string;
    numeroSerie: string;
    fabricante: string;
    anoFabricacion: number;
    pesoMaximo: number;
    pesoVacio: number;
    numeroMotor: string;
    numeroSerieMotor: string;
    fabricanteMotor: string;
    estadoActual: string;
    uso: string;
}

export interface bienesMuebles {
    numeroFinca: string;
    tipoDerecho: string;
    presentacion: string;
    naturaleza: string;
    status: string;
    plano: string;
    numeroCatastral: string;
    avaluo?: number;
    fechaUltActualizacion?: string;
    
}

export interface Propiedad {
    TipoPropiedad: TipoPropiedad;
    Propiedad: any
}

export interface Propiedades{
   Propiedades:any
}