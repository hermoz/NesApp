import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';



 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declaramos la propiedad usuario para poder enlazarla con los campos correspondientes de mi pantalla de login donde se 
  // solicita el email y la contraseña para el acceso
  // La propiedad es del tipo UsuarioModel y lo importamos en la zona superior

  usuario:UsuarioModel = new UsuarioModel();
  // Esta variable la asociamos con nuestro checkbox de la pantalla
  // lo ponemos a falso para que no salga seleccionado por defecto
  recordar = false;

  constructor(private auth: AuthService,
              private router: Router ) { }

  // Importamos NgForm para que sea válido
  ngOnInit() {

    // Si en el localStorage existe el email entonces el this.usuario.email será el item del localStorage
    // y conservo recordar en "true"
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }
  // En el caso de que la validación no sea correcta no se devuelve nada

  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    // cuando tengo información válida para hacer la petición al servicio de auth
    // mostraremos un LOADING
    // SWAL from SWEETALERT
    Swal.fire({
      // para que la persona pueda cerrar la alerta si hace click fuera
      allowOutsideClick: false,
      // icono para que salga signo de admiración azul durante la carga
      icon: 'info',
      // Texto que nos aparece en la ventana emergente
      text: 'Espere por favor...'
    });
    // usamos un método para mostrar un icono de carga en movimiento 
    Swal.showLoading();


    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        // Cerramos la alerta
        Swal.close();
        // Recordamos la casilla de selección para recordar al usuario de modo que trabajamos con ella
        // Si está true entonces guardo en el localStorage el email del usuario con el nombre email
        if ( this.recordar ) {
        localStorage.setItem('email', this.usuario.email);
        }

        // EN ESTE PUNTO TENEMOS UNA AUTENTICACIÓN VÁLIDA
        // LLegados a este punto tenemos una autenticación válida así que: navegamos hasta la página home

        this.router.navigateByUrl('/home');


       // this.router.navigateByUrl('/home');

      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          // icono de error rojo
          icon: 'error',
          title: 'Error de autenticación',
          text: err.error.error.message
        });
      });

  }

}
