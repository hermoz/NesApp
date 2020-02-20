import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectModel } from '../models/project.model';
import { map, delay } from 'rxjs/operators';

import Swal from 'sweetalert2';
// El método pipe te permite aplicar varios operadores sobre el flujo de datos de forma secuencial.

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  // URL de mi project-list obtenida de mi database de firebase
  private url ='https://nessapp-d5681.firebaseio.com';

  constructor(private http: HttpClient) { }

  // CREATE
  // Petición de creación de proyecto de la que recibimos como respuesta un id
  createProject( project: ProjectModel ) {
    /* post lo establecemos con el url, donde se realiza el envío de la información 
    -- agregamos toda la URL/objeto/body
    -- objeto: al que voy a realizar la inserción usando .json para indicar a firebase que use REST API
    -- body: lo que necesito enviar al backend */
    return this.http.post(`${ this.url }/project-list.json`, project)
    /* al realizar post recibimos de firebase un id único generado y lo pasamos por el método pipe
      map recibe la respuesta del hhtp post, que puede ser cualquier cosa(any). 
      Nosotros analizamos en nuestra consola */
    .pipe(
      map( (resp: any) => {
        project.id = resp.name;
        // devolvemos la instancia del proyecto con su id
        return project;
      })
    );
  }

  // UPDATE
  updateProject( project: ProjectModel ) {

    // enviamos a firebase solo las propiedades del proyecto este nuevo objeto rompre las referencias de javascript
    const projectTemp = {
      ...project
    };

    /* no se realiza delete project.id porque también lo elimina del objeto de project-list,
      al crear este objeto ya podemos borrar la propiedad id */
    delete projectTemp.id;

    // y aquí enviamos el proyecto temporal
    return this.http.put(`${ this.url }/project-list/${ project.id }.json`, projectTemp);


  }

/* Para la información pulsando mi botón de acciones necesito obtener un projecto según el id
 */
  getProject( id: string ) {
    return this.http.get(`${ this.url }/project-list/${ id }.json`);

  }

  // GET
  getProjectList() {
    return this.http.get(`${ this.url }/project-list.json`)
            .pipe(
              // el map transforma la información y nos devuelve lo definido en el método privado
              map( this.crearArreglo ),
              // definimos delay como tiempo durante el que aparece la pantalla de carga de datos
              delay(500)
            );
  }

  // creamos un metodo privado que reciba el objeto de la lista de proyectos
  private crearArreglo( projectListObj: object ) {
    /* ahora lo que debo hacer es transformar el objeto que recibo en un array así que creo una constante que va a 
        ser una colección de mis proyectos*/

    const projectLis: ProjectModel[] = [];

    if (projectListObj === null ) { return []}

    /* Vamos a aplicar un método de javascript que nos permite recorrer todas las llaves de un objeto
    */


    Object.keys( projectListObj ).forEach( key => {
      // Una vez hemos pasado el objeto a nuestro método creamos una constante de manera que traigo el objeto entre llaves
      // y creo una nueva referencia 
      const project: ProjectModel = projectListObj[key];
      project.id = key;

      // finalmente guardamos el proyectyo en el array creado a comienzos del método
      projectLis.push( project );
    });


    return projectLis;

    }

  // DELETE

  deleteProject( id: string ) {

    return this.http.delete(`${ this.url }/project-list/${ id }.json`);

  }

  }









