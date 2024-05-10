import { DataService } from 'src/app/share/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-browse',
  templateUrl: './repor-browse.component.html',
  styleUrls: ['./repor-browse.component.css'],
})
export class ReportBrowseComponent implements OnInit {
  
  formulario: FormGroup;

  
  constructor(
    private dataService: DataService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.reactiveForm();
  }


  reactiveForm() {
    this.formulario = this.fb.group({
      idenficacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let a= this.formulario.value
    this.dataService.sendFormData(a.idenficacion);
    this.router.navigate(['/report']);

  }
  
}
