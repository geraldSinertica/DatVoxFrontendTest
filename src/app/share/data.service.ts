// En el servicio compartido
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { buques, vehiculos, aeronaves, bienesMuebles,Propiedad,Propiedades } from 'src/app/home/Models/Interfaces';
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
        mappingFunction(items[0]) 
      }
    };

    const mapOperation = (operation: any) => ({
      estado: operation.estado,
      saldo: operation.saldoMora,
      diasMora: operation.diasMora,
    });

    mapPropiedad(operations.openOperations, mapOperation);

    return of( operation );
  }

  getPhones(phones: any): Observable<any> {
    const phone: any[] = [];
    let res = ''; // Inicializamos res como una cadena vacía
    const mapTelefonos = (items: any[], mappingFunction: (item: any) => any) => {
      if (items && items.length > 0) {
        items.forEach(item => { // Iteramos sobre los elementos y llamamos a mappingFunction para cada uno
          phone.push(mappingFunction(item)); // Añadimos el resultado de mappingFunction a phone
        });
      }
    };
  
    const mapTelefono = (phone: any) => ({
      telefono: phone.telefono
    });
  
    if (phones?.telefonos) {
      mapTelefonos(phones.telefonos, mapTelefono);
      phone.forEach(element => {
        res += `${element.telefono},`;
      });
    }
    
    console.log(res); // Esto es opcional, te permitirá ver qué valores tiene 'res' en la consola.
  
    return of(res);
  }
  


}
