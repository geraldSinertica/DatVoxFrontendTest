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
    this.GetReport();

  }

  // En el método GetReport del componente
  GetReport() {
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
          console.log('Datos', this.datos);
          console.log('Data Personal', this.datosGenerales);
        },
      });
  }

  async GetReport1() {
    try {
      const data: any = await this.gService
        .get('Completo', `?identification=504220015&tipoReporte=1`)
        .pipe(takeUntil(this.destroy$))
        .toPromise();

      console.log('CALLBACK API', data);
      this.datos = data.Data; // Asignar los datos recibidos
      console.log('Datos', this.datos); // Verificar los datos asignados
    } catch (error) {
      console.error('Error al obtener datos del API', error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  }
}
