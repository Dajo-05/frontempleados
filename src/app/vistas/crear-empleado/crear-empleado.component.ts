import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmpladosInterface } from 'src/app/modelo/Empleados';
import { ListaPaises } from 'src/app/modelo/listadoPaises.interface';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { PaisesService } from 'src/app/services/paises/paises.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css'],
})
export class CrearEmpleadoComponent {
  listaPaises: ListaPaises[] = [];
  pais: any;
  visible = false;
  botoVisible = false;
  emailVisible: boolean = false;
  emailForm: any;
 

  empleadoForm = new FormGroup({
    primerNombre: new FormControl('', Validators.required),
    primerApellido: new FormControl('', Validators.required),
    otroNombre: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
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
  }


  seleccionarPais(event: any): void {
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
        dominio = 'prueba.com';
        break;
      case 'USA':
        dominio = 'prueba.com.us';
        break;
    }
    console.log(apellido);
    correo = primerNombre + '.' + apellido + '.' + id + '@' + dominio;
    this.empleadoForm.value.email = correo ;
     this.emailForm = correo;
    console.log("correo generado : ",this.empleadoForm.value.email );
  }


  guardar(): void {
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
        email = ' ';
        this.visible = false;
        window.alert('Se Creo Empleado con Exito!');
        this.empleadoForm.reset();
      },
      (error) => console.error(error)
    );
  }
}
