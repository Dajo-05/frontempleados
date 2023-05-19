import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpladosInterface } from 'src/app/modelo/Empleados';

@Injectable({
  providedIn: 'root'
})


export class EmpleadosService {
  private API_SERVER = 'http://localhost:8080/empleados/';
  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllEmpleados(): Observable<EmpladosInterface[]>{
    return this.httpCliente.get<EmpladosInterface[]>(this.API_SERVER);
  }
  public saveEmpleado(empleado: any): Observable<any>{
    return this.httpCliente.post(this.API_SERVER,empleado);
  }

  public eliminarEmpleado(id: any): Observable<any>{
    return this.httpCliente.delete(this.API_SERVER+"delete/"+id);
  }

  public editarEmpleado(empleado: any): Observable<any>{
    return this.httpCliente.put(this.API_SERVER,empleado);
  }

}
