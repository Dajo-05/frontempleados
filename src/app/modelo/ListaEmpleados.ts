import { ListaPaises } from './listadoPaises.interface';
export interface ListaEmpladosInterface {
  idEmpleado:number;
  primerNombre: string;
  primerApellido: string;
  otroNombre: string;
  paisEmpleo: string;
  correo: string;
  pais: ListaPaises;
}
