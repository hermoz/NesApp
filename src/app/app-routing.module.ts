import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Módulos para registro, login y autenticación
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

// Módulos para la gestión de proyectos
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProveedorListaComponent } from './pages/proveedor-lista/proveedor-lista.component';
import {ProveedorComponent } from './pages/proveedor/proveedor.component';


const routes: Routes = [
  // en canActivate inclimos las validaciones o arreglos de los guards que queremos implementar
  // se llama a la clase AuthGard y angular se encarga de buscar el canActivate
  // , canActivate: [ AuthGuard ]
  // acceso autenticado para los componentes correspondientes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  // listado de componentes 
  { path: 'project-list' , component: ProjectListComponent, canActivate: [ AuthGuard ]  },
  // Accederemos a projecto según su id
  { path: 'project/:id' , component: ProjectComponent, canActivate: [ AuthGuard ]  },

  // Acceso a proveedores
  { path: 'proveedor-lista' , component: ProveedorListaComponent, canActivate: [ AuthGuard ]  },
  { path: 'proveedor/:id' , component: ProveedorComponent, canActivate: [ AuthGuard ]  },


  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // exportamos para permitir que la configuración aquí desarrollada de routes se pueda usar de forma global o en cualquier otro módulo 
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
