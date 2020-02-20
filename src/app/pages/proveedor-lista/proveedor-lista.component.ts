import { Component, OnInit } from '@angular/core';
import { ProveedorListService } from '../../services/proveedor-list.service';
import { ProveedorModel } from 'src/app/models/proveedor.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-lista',
  templateUrl: './proveedor-lista.component.html',
  styleUrls: ['./proveedor-lista.component.css']
})
export class ProveedorListaComponent implements OnInit {

  proveedorLista: ProveedorModel[] = [];

   // asociado a sweetalert y las pantallas emergentes
   cargando = false;

  constructor( private ProveedorListaService: ProveedorListService ) { }

  ngOnInit() {
    // Quiero que cargando se dispare cuando inicia
    this.cargando = true;

    // llamamaos a los métodos para traer la información de los services
    this.ProveedorListaService.getProveedorLista()
      .subscribe( resp => {
        this.proveedorLista = resp;
        // cancelo la carga una vez se han cargado los datos
        this.cargando = false;
      });
  }

  borrarProveedor( proveedor: ProveedorModel, i: number  ){
    // en el método de borrado preguntamos al usuario previo a la eliminación del registro
    // y mostramos mensaje de confirmación mediante sweetalert y el manejo de promesas

    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      text: `¿Estás seguro de eliminar ${ proveedor.titulo } ?`,
      // Botones para confirmar y cancelar
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      // según el valor de la respuesta procedo. en el caso de que sea true:
      if (resp.value){
        this.proveedorLista.splice(i, 1);
        this.ProveedorListaService.borrarProveedor (proveedor.id).subscribe();

      }
  });

}






}
