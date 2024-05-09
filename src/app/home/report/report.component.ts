import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/share/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosGenerales: any;
  vehiculos: any;
  precalificado: any;
  juicios: any;
  bienesMuebles: any;
  receivedData:any;
  Propiedades:any
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
      .get('Completo', `?identification=${this.receivedData}&tipoReporte=1`)
      .subscribe({
        next: (call) => {
          this.datos = call.data;
          this.datosGenerales = this.datos.datosGenerales.informacionPersonal;
          this.vehiculos = this.datos.propiedades.bienesInmuebles.vehiculos;
          this.precalificado = this.datos.precalificado.reglas;
          this.juicios = this.datos.demandas;
          this.bienesMuebles = this.datos.propiedades.bienesMuebles;
          this.dataService.getStatesData(this.datos.propiedades).subscribe(data => {
            this.Propiedades = data;
          });
          console.log('Propiedades ordenadas ',this.Propiedades)
        },
      });
  }

 
}
