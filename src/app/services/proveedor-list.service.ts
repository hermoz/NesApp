import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProveedorModel } from '../models/proveedor.model';

import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorListService {

  // URL de mi project-list obtenida de mi database de firebase
  private url ='https://nessapp-d5681.firebaseio.com';

  constructor(private http: HttpClient)  { }

    // CREATE
  // Petición de creación de proyecto de la que recibimos como respuesta un id
  createProveedor( proveedor: ProveedorModel ) {
    /* post lo establecemos con el url, donde se realiza el envío de la información 
    -- agregamos toda la URL/objeto/body
    -- objeto: al que voy a realizar la inserción usando .json para indicar a firebase que use REST API
    -- body: lo que necesito enviar al backend */
    return this.http.post(`${ this.url }/proveedor-list.json`, proveedor)
    /* al realizar post recibimos de firebase un id único generado y lo pasamos por el método pipe
      map recibe la respuesta del hhtp post, que puede ser cualquier cosa(any). 
      Nosotros analizamos en nuestra consola */
    .pipe(
      map( (resp: any) => {
        proveedor.id = resp.name;
        // devolvemos la instancia del proyecto con su id
        return proveedor;
      })
    );
  }

  // UPDATE
  updateProveedor( proveedor: ProveedorModel ) {

    // enviamos a firebase solo las propiedades del proyecto este nuevo objeto rompre las referencias de javascript
    const proveedorTemp = {
      ...proveedor
    };

    /* no se realiza delete proveedor.id porque también lo elimina del objeto de proveedor-list,
      al crear este objeto ya podemos borrar la propiedad id */
    delete proveedorTemp.id;

    // y aquí enviamos el proyecto temporal
    return this.http.put(`${ this.url }/proveedor-list.json/${ proveedor.id }.json`, proveedorTemp);


  }

  /* Para la información pulsando mi botón de acciones necesito obtener un proveedor según el id
 */
getProveedor( id: string ) {
  return this.http.get(`${ this.url }/proveedor-list/${ id }.json`);

}

  // GET
  getProveedorLista() {
    return this.http.get(`${ this.url }/proveedor-list.json`)
            .pipe(
              // el map transforma la información y nos devuelve lo definido en el método privado
              map( this.crearArreglo ),
              // definimos delay como tiempo durante el que aparece la pantalla de carga de datos
              delay(500)
            );
  }

    // creamos un metodo privado que reciba el objeto de la lista de proveedores
    private crearArreglo( proveedorListObj: object ) {
      /* ahora lo que debo hacer es transformar el objeto que recibo en un array así que creo una constante que va a 
          ser una colección de mis  proveedores*/
  
      const proveedorLis: ProveedorModel[] = [];
  
      if (proveedorListObj === null ) { return []}
  
      /* Vamos a aplicar un método de javascript que nos permite recorrer todas las llaves de un objeto
      */
  
  
      Object.keys( proveedorListObj ).forEach( key => {
        // Una vez hemos pasado el objeto a nuestro método creamos una constante de manera que traigo el objeto entre llaves
        // y creo una nueva referencia 
        const project: ProveedorModel = proveedorListObj[key];
        project.id = key;
  
        // finalmente guardamos el proyectyo en el array creado a comienzos del método
        proveedorLis.push( project );
      });
  
  
      return proveedorLis;
  
      }

        // DELETE

        borrarProveedor( id: string ) {

    return this.http.delete(`${ this.url }/proveedor-list/${ id }.json`);

  }

}
