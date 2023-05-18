import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EmpleadosService {
  private API_SERVER = 'http://localhost:8080/empleados/';
  constructor(
    private httpCliente: HttpClient
  ) { }
  public saveEmpleado(empleado: any): Observable<any>{
    return this.httpCliente.post(this.API_SERVER,empleado);
  }
}
