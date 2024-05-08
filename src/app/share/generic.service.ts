import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GenericService {

    // URL del API, definida en enviroments->enviroment.ts
    urlAPI_dev: string = `https://localhost:7136/report/`;
    urlAPI: string = `https://datavoxapi.azurewebsites.net/report/`;
	//Información usuario actual
    currentUser: any;
    token= localStorage.getItem('token');
    //Inyectar cliente HTTP para las solicitudes al API
    constructor(private http: HttpClient) {
     
    }
   
    // Listar
    //http://localhost:3000/videojuego
    list(endopoint: string): Observable<any> {
      return this.http.get<any>(this.urlAPI + endopoint);
    }

    // Obtener
    get(endopoint: string, filtro: any): Observable<any | any[]> {
        console.log('token get report',this.token)
      const headers = this.createHeaders(); // Crear cabeceras con el token
      console.log('RouteGet',this.urlAPI + endopoint + `${filtro}`)
      return this.http.get<any | any[]>(this.urlAPI + endopoint + `${filtro}`, { headers })
      .pipe(map((response: any)=><any>response));
    }

    // crear
    create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
      const headers = this.createHeaders(); // Crear cabeceras con el token
      return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate, { headers });
    }

    // actualizar
    update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
      const headers = this.createHeaders(); // Crear cabeceras con el token
      return this.http.put<any | any[]>(
        this.urlAPI + endopoint + `/${objUpdate.id}`,
        objUpdate,
        { headers }
      );
    }

    // Función para crear las cabeceras con el token
    private createHeaders(): HttpHeaders {
      // Aquí deberías obtener el token de autenticación de donde corresponda en tu aplicación
      const token1 = this.token; // Puedes obtenerlo del almacenamiento local, de un servicio de autenticación, etc.
      return new HttpHeaders({
        'Authorization': `Bearer ${token1}`
      });
    }
}
