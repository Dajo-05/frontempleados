import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './vistas/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './vistas/editar-empleado/editar-empleado.component';
import { InicioComponent } from './vistas/inicio/inicio.component';

const routes: Routes = [

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'crearempleado', component: CrearEmpleadoComponent},
  {path: 'editarempleado', component: EditarEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
