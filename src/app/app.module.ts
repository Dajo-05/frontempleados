import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CrearEmpleadoComponent } from './vistas/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './vistas/editar-empleado/editar-empleado.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    CrearEmpleadoComponent,
    EditarEmpleadoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule, MatPaginatorModule, 
    MatButtonModule, MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
