// En el servicio compartido
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { buques, vehiculos, aeronaves, bienesMuebles,Propiedad,Propiedades, telephones,Telephone, directions, direction, Judges, Judge } from 'src/app/home/Models/Interfaces';
import { TipoPropiedad } from '../home/Models/Enums';
import { Operation } from '../home/Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData = new BehaviorSubject<any>(null);
  formData$ = this.formData.asObservable();

  sendFormData(data: any) {
    this.formData.next(data);
  }

  getStatesData(states: any): Observable<Propiedades> {
    const propiedades: Propiedad[] = [];
    const result:Propiedades = {
      Propiedades: []
    };

    const mapPropiedad = (items: any, tipoPropiedad: TipoPropiedad, mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        const propiedadesMapped = items.map(mappingFunction);
    propiedades.push({
      TipoPropiedad: tipoPropiedad,
      Propiedad: propiedadesMapped
    });
      }
    };

    const mapBuque = (buque: any) => ({
      nombreBuque: buque.nombreBuque,
      numeroSerie: buque.numeroSerie,
      anoConstruccion: buque.anoConstruccion,
      numeroMotor: buque.numeroMotor,
      numeroSerieMotor: buque.numeroSerieMotor,
      fabricanteMotor: buque.fabricanteMotor,
      claseBien: buque.claseBien,
      estadoActual: buque.estadoActual,
      uso: buque.uso,
      fechaUltMovimiento: buque.fechaUltMovimiento
    });

    const mapVehiculo = (vehiculo: any) => ({
      placa: vehiculo.placa,
      tipoBien: vehiculo.tipoBien,
      marca: vehiculo.marca,
      numeroVIN: vehiculo.numeroVIN,
      numeroSerieMotor: vehiculo.numeroSerieMotor,
      fabricanteMotor: vehiculo.fabricanteMotor,
      claseBien: vehiculo.claseBien,
      estadoActual: vehiculo.estadoActual,
      uso: vehiculo.uso,
      fechaUltMovimiento: vehiculo.fechaUltMovimiento
    });

    const mapAeronave = (aeronave: any) => ({
      placa: aeronave.placa,
      tipoBien: aeronave.tipoBien,
      numeroSerie: aeronave.numeroSerie,
      fabricante: aeronave.fabricante,
      anoFabricacion: aeronave.anoFabricacion,
      pesoMaximo: aeronave.pesoMaximo,
      pesoVacio: aeronave.pesoVacio,
      numeroMotor: aeronave.numeroMotor,
      numeroSerieMotor: aeronave.numeroSerieMotor,
      fabricanteMotor: aeronave.fabricanteMotor,
      estadoActual: aeronave.estadoActual,
      uso: aeronave.uso
    });

    const mapPropiedad1 = (propiedad: any) => ({
      numeroFinca: propiedad.numeroFinca,
      tipoDerecho: propiedad.tipoDerecho,
      presentacion: propiedad.presentacion,
      naturaleza: propiedad.naturaleza,
      status: propiedad.status,
      plano: propiedad.plano,
      numeroCatastral: propiedad.numeroCatastral,
      avaluo: propiedad.avaluo,
      fechaUltActualizacion: propiedad.fechaUltActualizacion
    });

    if (states?.bienesInmuebles) {
      mapPropiedad(states.bienesInmuebles.buques, TipoPropiedad.Buque, mapBuque);
      mapPropiedad(states.bienesInmuebles.vehiculos, TipoPropiedad.Vehiculo, mapVehiculo);
      mapPropiedad(states.bienesInmuebles.aeronaves, TipoPropiedad.Aeronave, mapAeronave);
    }

    if(states?.bienesMuebles){
      
      mapPropiedad(states.bienesMuebles, TipoPropiedad.Propiedad, mapPropiedad1);

    }
    result.Propiedades=propiedades;
    return of( result );
  }

  getOperationData(operations:any): Observable<any[]>{
    const operation : any[] = [];
    
    const mapPropiedad = (items: any, mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        items.forEach((item: any) => {
          operation.push(mappingFunction(item));
        });
      }
    };

    const mapOperation = (operation: any) => ({
      estado: operation.estado,
      saldo: operation.saldoMora,
      diasMora: operation.diasMora,
    });

    if(operations?.openOperations){
      mapPropiedad(operations.openOperations, mapOperation);

    }

    return of( operation );
  }

  getPhones(phones: any): Observable<telephones> {
    const phone: Telephone[] = [];
    const result:telephones = {
      telephones: []
    };

    let res = ''; // Inicializamos res como una cadena vacía
    const mapTelefonos = (items: any[], mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        items.forEach(item => { 
          phone.push(mappingFunction(item)); 
        });
      }
    };
  
    const mapTelefono = (phone: any) => ({
      telefono: phone.telefono,
      tipo: phone.tipo
    });
  
    if (phones?.telefonos) {
      mapTelefonos(phones.telefonos, mapTelefono);
      
    }
    
    console.log(res); // Esto es opcional, te permitirá ver qué valores tiene 'res' en la consola.
    result.telephones=phone;
    return of(result);
  }
  
  getDireccions(address: any): Observable<directions> {
    const addres: direction[] = [];
    const result:directions = {
      directions: []
    };

    let res = ''; // Inicializamos res como una cadena vacía
    const mapAdress = (items: any[], mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        items.forEach(item => { 
          addres.push(mappingFunction(item)); 
        });
      }
    };
  
    const mapAdres = (phone: any) => ({
      direccion: phone.direccion,
      
    });
  
    if (address?.direcciones) {
      mapAdress(address.direcciones, mapAdres);
      
    }
    
    ; // Esto es opcional, te permitirá ver qué valores tiene 'res' en la consola.
    result.directions=addres;
    return of(result);
  }

  getJucios(judges:any): Observable <Judges>{
    
    const judge: Judge[] = [];
    const result:Judges = {
      judges: []
    };

    let res = ''; // Inicializamos res como una cadena vacía
    const mapJudgess = (items: any[], mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        items.forEach(item => { 
          judge.push(mappingFunction(item)); 
        });
      }
    };
  
    const mapJudges = (jud: any) => ({
      expediente:jud.expediente,
      cuantia:jud.cuantia,
      descrpcion:jud.descrpcion
      
    });
  
    if (judges) {
      mapJudgess(judges, mapJudges );
      
    }
    
    ; // Esto es opcional, te permitirá ver qué valores tiene 'res' en la consola.
    result.judges=judge;
    return of(result);
  }

}
