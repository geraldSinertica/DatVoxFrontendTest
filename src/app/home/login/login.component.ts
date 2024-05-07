import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  currentUser: any;
  
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.reactiveForm()
  }
  onReset() {
    this.formulario.reset();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    
    this.makeSubmit = true;
    console.log('Data login DSADADA');
    console.log('Data login', this.formulario.value);
    //Validación
    if (this.formulario.invalid) {
      return;
    }
  
  
    this.authService.loginUser(this.formulario.value).subscribe({
      next: (respuesta: any) => {
        this.authService.decodeToken.subscribe(
          (user: any) => (this.currentUser = user),
        );
        let  token= localStorage.getItem('token');
       this.router.navigate(['/reportBrowse']);
      },
      error: (error) => {
       console.log('VALIDE CREDENCIALES', error)
      },
    });

   
  }


  login() {

    this.router.navigate(['usuario/login']);
  }
}
