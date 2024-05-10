import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/share/data.service';
import {
  buques,
  vehiculos,
  aeronaves,
  bienesMuebles,
  Propiedad,
  Propiedades,
  telephones,
  directions,
  Judges,
} from 'src/app/home/Models/Interfaces';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosGenerales: any;
  operations: any;
  phones: telephones = {
    telephones: [],
  };
  adress: directions = {
    directions: [],
  };
  precalificado: any;
  bienesMuebles: any;
  receivedData: any;
  vinculos: any;
  Propiedades: Propiedades = {
    Propiedades: [],
  };

  juicios:Judges={
    judges:[]
  }
  // En el constructor de ReportComponent
  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    // Llama a la función con paréntesis
  }

  ngOnInit(): void {
    this.dataService.formData$.subscribe((data) => {
      this.receivedData = data;
    });
    this.GetDataReport();
  }

  // En el método GetReport del componente
  GetDataReport() {
    this.gService
      .get('Completo', `?identification=${109960389}&tipoReporte=1`)
      .subscribe({
        next: (call) => {
          this.datos = call.data;
          this.datosGenerales = this.datos.datosGenerales.informacionPersonal;
          this.precalificado = this.datos.precalificado.reglas;         
          this.bienesMuebles = this.datos.propiedades.bienesMuebles;

          this.vinculos = this.datos.datosGenerales.filiaciones;

          this.dataService
            .getStatesData(this.datos.propiedades)
            .subscribe((data) => {
              this.Propiedades = data;
            });

          this.dataService
            .getOperationData(this.datos.obligaciones)
            .subscribe((data) => {
              this.operations = data;
            });

          console.log(
            'Juicios Api',
            this.datos.demandas
          );

          this.dataService
            .getPhones(this.datos.datosGenerales.telefonosYDirecciones)
            .subscribe((data) => {
              this.phones = data;
            });

          this.dataService
            .getDireccions(this.datos.datosGenerales.telefonosYDirecciones)
            .subscribe((data) => {
              this.adress = data;
            });

          this.dataService.getJucios( this.datos.demandas).subscribe((data)=>{
            this.juicios=data;
          })

          console.log('Juicios',this.juicios)
          console.log('Telefonos', this.phones);
          console.log('Diracciones', this.adress);
        },
      });
  }

  public GetTipoLabel(tipo: any): string {
    switch (tipo) {
      case 0:
        return 'Madre';
      case 1:
        return 'Padre';
      case 2:
        return 'Hijo';
      case 3:
        return 'Cónyuge';
      case 4:
        return 'Hermano';
      case 5:
        return 'Tío';
      default:
        return 'Desconocido';
    }
  }
}
