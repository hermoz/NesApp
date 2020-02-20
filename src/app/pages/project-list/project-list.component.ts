import { Component, OnInit } from '@angular/core';
import { ProjectListService } from '../../services/project-list.service';
import { ProjectModel } from '../../models/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectList: ProjectModel[] = [];
  // asociado a sweetalert y las pantallas emergentes
  cargando = false;

  constructor( private ProjectListService: ProjectListService ) { }

  ngOnInit() {

    // Quiero que cargando se dispare cuando inicia
    this.cargando = true;

    // llamamaos a los métodos para traer la información de los services
    this.ProjectListService.getProjectList()
      .subscribe( resp => {
        this.projectList = resp;
        // cancelo la carga una vez se han cargado los datos
        this.cargando = false;
      });

    }

    deleteProject( project: ProjectModel, i: number  ){
      // en el método de borrado preguntamos al usuario previo a la eliminación del registro
      // y mostramos mensaje de confirmación mediante sweetalert y el manejo de promesas

      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        text: `¿Estás seguro de eliminar ${ project.titulo } ?`,
        // Botones para confirmar y cancelar
        showConfirmButton: true,
        showCancelButton: true
      }).then( resp => {

        // según el valor de la respuesta procedo. en el caso de que sea true:
        if (resp.value){
          this.projectList.splice(i, 1);
          this.ProjectListService.deleteProject (project.id).subscribe();

        }
    });

}

}





