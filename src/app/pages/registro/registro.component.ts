import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
usuario: UsuarioModel;
// Esta variable la asociamos con nuestro checkbox de la pantalla de registro. Será "false" por defecto
recordar = false;

// Conectanmos la creación de usuario con la página de registro -> private auth: AuthService
// Tengo importado el router y lo declaro en el constructor
// Lo usamos cuando sabemos que tenemos una autenticación válida y procedemos a la navegación correspondiente
  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
  this.usuario = new UsuarioModel();

}

  /** En la acción onSubmit recibo como parámetro el formulario y procedo a realizar la acción según las validaciones */
onSubmit( form: NgForm ){
  if (form.invalid){
    return;
  }

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

  this.auth.nuevoUsuario( this.usuario )
    // en subscribe es donde tengo la respuesta de Firebase
      .subscribe( resp => {

        console.log(resp);
        // Cerramos cuando todo está correcto
        Swal.close();
        // LLegados a este punto sabemos que tenemos una autenticación válida de modo que navegamos hasta la página home
        this.router.navigateByUrl('/home');


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
