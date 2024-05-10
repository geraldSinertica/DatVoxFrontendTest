import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/share/data.service';
import { buques, vehiculos, aeronaves, bienesMuebles,Propiedad,Propiedades } from 'src/app/home/Models/Interfaces';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosGenerales: any;
  operations:any
  phones:any
  precalificado: any;
  juicios: any;
  bienesMuebles: any;
  receivedData:any;
  vinculos:any
  Propiedades: Propiedades ={
    Propiedades: []
  };
  // En el constructor de ReportComponent
  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    // Llama a la función con paréntesis
  }

  ngOnInit(): void {
    this.dataService.formData$.subscribe(data => {
      this.receivedData = data;
    });
    this.GetDataReport();

  }

  // En el método GetReport del componente
  GetDataReport() {
    console.log('DATA TRASFER pre route', this.receivedData)
    this.gService
      .get('Completo', `?identification=109960389&tipoReporte=1`)
      .subscribe({
        next: (call) => {
          this.datos = call.data;
          this.datosGenerales = this.datos.datosGenerales.informacionPersonal;
          this.precalificado = this.datos.precalificado.reglas;
          this.juicios = this.datos.demandas;
          this.bienesMuebles = this.datos.propiedades.bienesMuebles;

          this.vinculos=this.datos.datosGenerales.filiaciones

          this.dataService.getStatesData(this.datos.propiedades).subscribe(data => {
            this.Propiedades = data;
          });

          
         /* this.dataService.getOperationData(this.datos.obligaciones).subscribe(data => {
            this.operations = data;
          });*/

          console.log('TelefonosAPI', this.datos.datosGenerales.telefonosYDirecciones)

          this.dataService.getPhones(this.datos.datosGenerales.telefonosYDirecciones).subscribe(data => {
            this.phones = data;
          });
      
          console.log('Telefonos',this.phones)
      
        },
      });
  }

 
}
