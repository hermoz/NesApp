import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Anadimos esta importación para los formularios
import {FormsModule} from '@angular/forms';

// Importación para las peticiones HTTP
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProveedorListaComponent } from './pages/proveedor-lista/proveedor-lista.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    ProjectComponent,
    ProjectListComponent,
    NavbarComponent,
    ProveedorListaComponent,
    ProveedorComponent,

  ],
  imports: [
    BrowserModule,
    // importamos nuestros routes
    AppRoutingModule,
    // Módulo para formularios
    FormsModule,
    // Módulo para peticiones HTTP
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
