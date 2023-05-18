import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPaises } from 'src/app/modelo/listadoPaises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
private API_SERVER = 'http://localhost:8080/pais/';

  constructor(
    private httpCliente: HttpClient
  ) { }

  public getAllPaises(): Observable<ListaPaises[]>{
    return this.httpCliente.get<ListaPaises[]>(this.API_SERVER);
  }

}
