import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  // inyectamos la información del serivicio para conocer el estado de autenticación
  constructor( private auth: AuthService,
               private router: Router) {}

// Un servicio que implementa el CanActivate 
// CanActivate viene de @angular/router (es la instrucción que se tiene que ejecutar)
// Angular, cuando navega a una ruta,  confirma en este Authguard si dicha ruta se puede o no activar
// vamos a desarrollar el canactivate para que resuelva un booleano 
  canActivate(): boolean  {
    console.log('guard');
    // en este caso para saber si el usuario está autenticado o no lo realizaremos sabiendo si tenemos información o no en nuestro userToken
    // declaramos el método en auth.service.ts y lo invocamos
    // si está autenticado 
    if ( this.auth.estaAutenticado() ) {
      return true;
      // en el caso de que no cumpla la condición de estar autenticado indicamos que navegue al login
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
