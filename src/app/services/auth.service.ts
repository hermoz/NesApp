import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
// Importamos para pipe
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';




// Este componente de servicio de autenticación no es necesario importarlo porque ya está de manera global mediante el decorador
// con la propiedad: providedIn: 'root'

@Injectable({
  providedIn: 'root'
})

// Procedemos a realizar dos servicios distintos y creamos dos propiedades distintas:
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';

  // Esta es nuestra clave de API de la web
  private apikey = 'AIzaSyD_3Ca5sGaYPLSkuqsMi4S94qPRTdYxuCU';

  // Creamos la propiedad userToken donde ubicaremos si ya existe el idToken
  userToken: string;
  

  // Servicio para llamar a la autenticación, LogIn -> Sign In with email and password
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
 

  // Servicio para la creación de un nuevo usuario con el endpoint correspondiente a Sign Up with email and password
  //  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]



  // Inyectamos en el constructor el servicio HTTP de tipo HTTPCient
  // Incluimos en el constructor los servicios a los que llamaremos de forma eventual según necesidades
  constructor( private http: HttpClient) {
    this.leerToken();
   }

  // Método de registro de NUEVO USUARIO
  nuevoUsuario(usuario: UsuarioModel){
  // Debemos devolver el returnSecureToken indicado en la documentación de Firebase por lo que declaramos la constante
  // E incluimos aquí los atributos requeridos

  // Para realizar un código más limpio y obtener las mismas propiedades del usuario del authdata
  // password: usuario.password,
  // por ...usuario -> es lo mismo pero también añade el nombre, aunque podríamos trabajar sin incluirlo
  // ... se denomina operador SPREAD, permite que una expresión sea expandida en situaciones donde se esperan múltiples 
  // argumentos (llamadas a funciones) o múltiples elementos (arrays literales).
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    // LLamamos al servicio para crear un nuevo usuario enviando una petición POST e inyectamos la url
    // Este post desvuelve un OBSERVABLE donde puedo hacer ciertas modificaciones antes de devolver la página de registro o login
    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`,
   // authData es el payload que mandamos
    authData
    ).pipe(
      map( resp => {
        // En el caso de tener éxito al realizar el post el map se dispara y obtenemos una respuesta de la que enviamos el idToken
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }
  // En el pipe usamos el operador map de los rxjs. El map me permitirá obtener la respuesta cuando se obtenga del post
  // En el caso de obtener un error en el post el map no se dispara, por lo que es una ventaja
  // En nuestro caso leeremos la respuesta del post y lo guardaremos en el token




  // Método LOG IN que recibe un usuario de tipo UsuarioModel
  // Recibimos el usuario, lo procesamos y trabajamos para la obtención/reenvío de returnSecureToken
  // ... en el authData que es lo que mandamos a Firebase
  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    // Realizamos petición http para sign in
    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`,
   // authData es el payload que mandamos
    authData
    ).pipe(
      map( resp => {
        // En el caso de tener éxito al realizar el post el map se dispara y obtenemos una respuesta de la que enviamos el idToken
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

// Creamos un método privado para almacenar 
private guardarToken( idToken: string ) {

  // IdToken es el que recibo como argumento en este método
  this.userToken = idToken;
  // Lo almacenamos en una propiedad llamada 'token', y el string del valor que almacenamos
  localStorage.setItem('token', idToken);

}

// Creamos método privado para leer lo del localStorage
leerToken() {
  // verificación de contenido de información
  if ( localStorage.getItem('token') ) {
    // si existe entonces será igual a la obtención del localStorage
    this.userToken = localStorage.getItem('token');
  } else {
    // en el caso de que no exista lo inicializamos a un string vacío
    this.userToken = '';
  }
  return this.userToken;
}

// LOG OUT
  // Método para salir:
  // Eliminados el token que haya sido guardado
  logout() {
   
  }

  // este método lo invocamos en nuestro auth.guard.ts para controlar el acceso a la aplicación
  // de un usuario logado
  estaAutenticado(): boolean {

    // devolvemos si tiene un extensión determinada (si tiene información el usuario está autenticado)
    if ( this.userToken.length < 2 ) {
      return false;
    }

    return true;

    // es posible que el token tenga más de 2 caracteres pero el token hata expirado

  }

}
