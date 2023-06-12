import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaisesService } from './services/paises/paises.service';
import { EmpleadosService } from './services/empleados/empleados.service';
import { EmpladosInterface } from './modelo/Empleados';
import { ListaPaises } from './modelo/listadoPaises.interface';
import { ListaEmpladosInterface } from './modelo/ListaEmpleados';
import { disableDebugTools } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontempleados';
  listaPaises: ListaPaises[] = [];
  listaEmpleados: ListaEmpladosInterface[] = [];
  empleados: ListaEmpladosInterface | undefined;
  pais: any;
  page: number = 1;
  visible = false;
  botoVisible = false;
  emailVisible: boolean = false;
  emailForm:any;
  cambiarNombre = false;
  desde = 0;
  hasta = 10;

  empleadoForm = new FormGroup({
    primerNombre: new FormControl('', Validators.required),
    primerApellido: new FormControl('', Validators.required),
    otroNombre: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    email: new FormControl({value:'', disabled: true}, Validators.required)
  });

  constructor(
    public fb: FormBuilder,
    public paisService: PaisesService,
    public empleadoService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.paisService.getAllPaises().subscribe(
      (data) => {
        this.listaPaises = data;
        console.log(data);
      },
      (error) => console.error(error)
    );
    this.cargarEmpleados();
  }

  guardar(): void {
    
    if (this.empleados !== undefined) {
      let nombre: any;
      let apellido: any;
      let onombre: any;
      let email: any;
      nombre = this.empleadoForm.value.primerNombre;
      apellido = this.empleadoForm.value.primerApellido;
      onombre = this.empleadoForm.value.otroNombre;
      email = this.empleadoForm.value.email;

      this.empleados.primerNombre =nombre ;
      this.empleados.primerApellido = apellido;
      this.empleados.otroNombre = onombre;
      this.empleados.correo = email;

      this.empleadoService.editarEmpleado(this.empleados).subscribe(
        (resp) => {
          console.log(resp);
          window.alert('Se Edito el Empleado con Exito!');
          this.visible = false;
          this.cambiarNombre = false;
          this.empleados = undefined;
          this.cargarEmpleados();
          this.empleadoForm.reset();
        },
        (error) => console.error(error)
      );
    } else {
      let emplado: EmpladosInterface;
      let nombre: any;
      let apellido: any;
      let onombre: any;
      let email: any;
      nombre = this.empleadoForm.value.primerNombre;
      apellido = this.empleadoForm.value.primerApellido;
      onombre = this.empleadoForm.value.otroNombre;
      email = this.empleadoForm.value.email;

      emplado = {
        primerNombre: nombre,
        primerApellido: apellido,
        otroNombre: onombre,
        paisEmpleo: this.pais.nombrePais,
        correo: email,
        pais: this.pais,
      };
      this.empleadoService.saveEmpleado(emplado).subscribe(
        (resp) => {
          console.log(resp);
          nombre = '';
          apellido = '';
          onombre = '';
          email = " ";
          this.visible = false;
          this.cambiarNombre = false;
          window.alert('Se Creo Empleado con Exito!');
          this.cargarEmpleados();
          this.empleadoForm.reset();
        },
        (error) => console.error(error)
      );
    }
  }
  cambiarTitular(event: any): void {
    let id = event.target.value;

    this.pais = this.listaPaises.find((x) => x.id == id);
    console.log(this.pais);
    this.generarCorreo(this.pais.nombrePais);
  }
  generarCorreo(nombrePais:any): void {
    let primerNombre = this.empleadoForm.value.primerNombre;
    let primerApellido = this.empleadoForm.value.primerApellido;
    let apellido = primerApellido?.replace(/\s/g, '');
    var id = 1;
    var dominio = '';
    let correo = '';

    switch (nombrePais) {
      case 'Colombia':
        dominio = 'jvntecnologias.com';
        break;
      case 'USA':
        dominio = 'jvntecnologias.com.us';
        break;
    }
    console.log(apellido);
    correo = primerNombre + '.' + apellido + '.' + id + '@' + dominio;
    this.empleadoForm.value.email = correo ;
     this.emailForm = correo;
    console.log("correo generado : ",this.empleadoForm.value.email );
  }

  

  cargarEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe(
      (data) => {
        this.listaEmpleados = data;
        console.log(data);
      },
      (error) => console.error(error)
    );
  }

  eliminar(empleado: any) {
    let mensaje = confirm('Esta Seguro de eliminar este empleado');
    if (mensaje) {
      this.empleadoService.eliminarEmpleado(empleado.idEmpleado).subscribe(
        (resp) => {
         
          window.alert('Se Elimino Empleado con Exito!');
          this.cargarEmpleados();
          this.empleadoForm.reset();
        },
        (error) => console.error(error)
      );
    }
  }

  editar(empleado: any) {
    this.visible = true;
    this.cambiarNombre = true;
    this.empleados = empleado;
    this.empleadoForm.setValue({
      primerApellido: empleado.primerApellido,
      primerNombre: empleado.primerNombre,
      otroNombre: empleado.otroNombre,
      pais: empleado.pais.id,
      email:empleado.correo
    });

    console.log('Accion editar empleado', empleado);
  }

  limpiarForm():void{
    this.cambiarNombre = false;
    this.empleadoForm.reset();
  }

  cambiarPagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde +  e.pageSize;

  }

}
