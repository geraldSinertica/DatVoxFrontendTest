import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { jwtDecode } from 'jwt-decode';
import {  Router } from '@angular/router';
//npm install jwt-decode
//npm audit fix --force

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //Header para afirmar el tipo de contenido JSON
  //URL del API
  ServerUrl =`https://localhost:7136`;
  //Variable observable para gestionar la información del token del usuario, con características especiales
  private tokenUserSubject: BehaviorSubject<any>;
  //Variable observable para gestionar la información del token
  public currentUser: Observable<any>;
  //Booleano para estado de usuario autenticado
  private authenticated = new BehaviorSubject<boolean>(false);
  //Variable observable para obtener la información del usuario
  private user = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient, 
    private router: Router) {
    //Obtener los datos del usuario en localStorage, si existe
    this.tokenUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem("currentUser") || "null")
    );
    //Establecer un observable para acceder a los datos del usuario
    this.currentUser = this.tokenUserSubject.asObservable();
  }
  //Obtener el valor del usuario actual
  public get tokenUserValue(): any {
    return this.tokenUserSubject.value;
  }
  //Establecer booleano verificando si esta autenticado
  get isAuthenticated() {
    if (this.tokenUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }

  //Crear usuario
  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      this.ServerUrl + 'user/registrar',
      user
    );
  }
  //Decodificar la información del token y obtener la información del usuario
  get decodeToken(): any {
    this.user.next(null);
    if (this.tokenUserValue != null ) {
      this.user.next(jwtDecode(this.tokenUserValue))
    }
   
    return this.user.asObservable();
  }
  
  //Login
  loginUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.ServerUrl + '/User/Autenticar', user)
      .pipe(
        map((response) => {
            console.log('Response login',response)
          // almacene los detalles del usuario y el token jwt
          // en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página
          
         localStorage.setItem('token',response.token);
         /* this.authenticated.next(true);       
          this.tokenUserSubject.next(response.token);
          let userData=this.decodeToken;
          return userData;*/
        })
      );
  }
  //Logout de usuario autentificado
  logout() {
    let usuario = this.tokenUserSubject.value;
    if (usuario) {
      // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
      localStorage.removeItem('currentUser');
      //Eliminarlo del observable del usuario actual
      this.tokenUserSubject.next(null);
      //Eliminarlo del observable del boleano si esta autenticado
      this.authenticated.next(false);
      //Eliminar carrito
    
      return true;
    }
    return false;
  }

  
 
}
