// En el servicio compartido
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData = new BehaviorSubject<any>(null);
  formData$ = this.formData.asObservable();

  sendFormData(data: any) {
    this.formData.next(data);
  }
}
