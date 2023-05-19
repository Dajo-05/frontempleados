import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from './services/paises/paises.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpladosInterface } from './modelo/Empleados';
import { ListaPaises } from './modelo/listadoPaises.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontempleados';
  listaPaises: ListaPaises[] = [];
  listaEmpleados: EmpladosInterface[] =[];
  pais: any;
  email1:any;
  page: number = 1;
  visible = false;

  empleadoForm = new FormGroup({
    primerNombre: new FormControl('', Validators.required),
    primerApellido: new FormControl('', Validators.required),
    otroNombre: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required)
  });

  constructor(
    public fb: FormBuilder,
    public paisService: PaisesService,
    public empleadoService: EmpleadosService
  ) { }

  ngOnInit(): void {

    this.paisService.getAllPaises().subscribe( data =>{
      this.listaPaises = data;
      console.log(data);
    },  error => console.error(error)
    )
        this.cargarEmpleados();
  }

  guardar(): void {
    this.generarCorreo();
    let emplado: EmpladosInterface;
    let nombre: any;
    let apellido: any;
    let onombre:any;
    nombre = this.empleadoForm.value.primerApellido;
    apellido = this.empleadoForm.value.primerApellido;
    onombre = this.empleadoForm.value.otroNombre;

    emplado = {
      primerNombre: nombre,
      primerApellido: apellido,
      otroNombre: onombre,
      paisEmpleo: this.pais.nombrePais,
      correo: this.email1,
      pais: this.pais
    }

    this.empleadoService.saveEmpleado(emplado).subscribe(resp =>{
      console.log(resp);
      nombre = '';
      apellido = '';
      onombre = '';
      window.alert("Se Creo tarjeta con Exito!");
      this.cargarEmpleados();
      this.empleadoForm.reset();
    }, error => console.error(error))


  }

  generarCorreo(): void {
    let primerNombre = this.empleadoForm.value.primerNombre;
    let primerApellido = this.empleadoForm.value.primerApellido;
    let apellido = primerApellido?.replace(/\s/g, '');
    var id = 1;
    var dominio = '';

    switch(this.pais.nombrePais) {
      case 'Colombia':
        dominio = 'jvntecnologias.com';
        break;
      case 'USA':
        dominio = 'jvntecnologias.com.us';
        break;
    }
    console.log(apellido);
    this.email1 = primerNombre + '.' + apellido+ '.' + id + '@' + dominio;
    console.log(this.email1);
  }

  cambiarTitular(event:any): void{
     
    let id = event.target.value;


    this.pais = this.listaPaises.find(x => x.id == id )
    console.log(this.pais);

  }

  cargarEmpleados():void{
    this.empleadoService.getAllEmpleados().subscribe( data =>{
      this.listaEmpleados = data;
      console.log(data);
    },  error => console.error(error)
    )
  }

  eliminar(empleado: EmpladosInterface){
    let mensaje = confirm("Esta Seguro de eliminar este empleado");
    if (mensaje) {
      console.log('Accion eliminar empleado', empleado);
    }
  }

  editar(empleado: EmpladosInterface){
   this.visible = true;
    console.log('Accion editar empleado', empleado);
  }

}
