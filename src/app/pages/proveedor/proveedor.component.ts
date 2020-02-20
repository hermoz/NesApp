import { Component, OnInit } from '@angular/core';
import { ProveedorModel } from '../../models/proveedor.model';
import { NgForm } from '@angular/forms';
import { ProveedorListService } from '../../services/proveedor-list.service';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})

export class ProveedorComponent implements OnInit {

   // creamos la propiedad project
   proveedor = new ProveedorModel();

  constructor( private ProveedorListaService: ProveedorListService ,
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
      this.ProveedorListaService.getProveedor( id )
          .subscribe( (resp: ProveedorModel) => {
            this.proveedor = resp;
            this.proveedor.id = id;
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


    let peticion: Observable<any>;

    // CREAR. Llamamos al método del servicio
    if (this.proveedor.id){
      peticion = this.ProveedorListaService.updateProveedor( this.proveedor);
    } else {
      peticion = this.ProveedorListaService.createProveedor( this.proveedor);
    }

    // y en subscribe obtenemos la respuesta
    peticion.subscribe( resp => {

          Swal.fire({
            title: this.proveedor.titulo,
            icon: 'success',
            text: 'Se actualizó correctamente',
          });
        });
      }

}
