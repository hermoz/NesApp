import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { NgForm } from '@angular/forms';
import { ProjectListService } from '../../services/project-list.service';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // creamos la propiedad project
  project = new ProjectModel();

  // inyecto el servicio creado para CRUD
  constructor( private ProjectListService: ProjectListService,
               private route: ActivatedRoute  ) { }

  ngOnInit() {

    /* para la modificación de un proyect necesito obtener el id mediante la url por lo que 
    inyecto en el constructor un servicio que me permita la lectura  
    Es una forma alternativa de obtener el id.
    ActivatedRouteSnapshot: Contiene la información sobre una ruta asociada con un componente 
    cargado en una salida en un momento particular en el tiempo
    */
    const id = this.route.snapshot.paramMap.get('id');

    /*previo a la llamada del servicio debo comprobar si el id existe o no, */
    if ( id !== 'new' ) {
      // si el id no es nuevo accedemos a firebase para obtener toda la informacion del id y cargarla 
      this.ProjectListService.getProject( id )
        .subscribe( (resp: ProjectModel) => {
          this.project = resp;
          this.project.id = id;
        });

    }
  }

  // Método para guardar los datos del formulario que se ejecutará si cumple la restricción definida
  save( form: NgForm ) {

    // Controlamos en el caso de que el formulario no sea válido y mostramos por consola
    if ( form.invalid ) {
      console.log('Formulario no válido. Faltan campos obligatorios');
      return;
    }

    // cuando tengo información válida para hacer la petición al servicio de auth
    // mostraremos un LOADING
    // SWAL from SWEETALERT
    Swal.fire({
      // para que la persona pueda cerrar la alerta si hace click fuera
      allowOutsideClick: false,
      // título
      title: 'Guardando su valiosa información',
      // icono para que salga signo de admiración azul durante la carga
      icon: 'info',
      // Texto que nos aparece en la ventana emergente
      text: 'Espere por favor...'
    });
    // usamos un método para mostrar un icono de carga en movimiento 
    Swal.showLoading();

    let peticion: Observable<any>;

    // CREAR. Llamamos al método del servicio
    if (this.project.id){
      peticion = this.ProjectListService.updateProject( this.project);
    } else {
      peticion = this.ProjectListService.createProject( this.project);
    }

    // y en subscribe obtenemos la respuesta
    peticion.subscribe( resp => {

      Swal.fire({
        title: this.project.titulo,
        icon: 'success',
        text: 'Se actualizó correctamente',
      });

    });

  }

}
