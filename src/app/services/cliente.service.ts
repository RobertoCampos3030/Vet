import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, delay } from 'rxjs/operators';
import { ClienteModel } from '../models/cliente.model';
interface Person {

  id: string;
  nombre: string;
  apellido: string;
  telefono: string;


}
@Injectable({
  providedIn: 'root'
})




export class ClienteService{
private url = 'https://nuevo-a644e-default-rtdb.firebaseio.com';


constructor( private http: HttpClient ) { }


crearCliente( cliente: ClienteModel ) {

  return this.http.post(`${ this.url }/clientes.json`, cliente)
          .pipe(
            map( (resp: any) => {
              cliente.id = resp.name;
              return cliente;
            })
          );

}

actualizarCliente( cliente: ClienteModel ) {

  const clienteTemp = {
    ...cliente
  };


  return this.http.put(`${ this.url }/clientes/${ cliente.id }.json`, clienteTemp);


}

borrarCliente( id: string ) {

  return this.http.delete(`${ this.url }/clientes/${ id }.json`);

}


getCliente( id: string ) {

  return this.http.get(`${ this.url }/clientes/${ id }.json`);

}


getClientes() {
  return this.http.get(`${ this.url }/clientes.json`)
          .pipe(
            map( this.crearArreglo ),
            delay(0)
          );
}



private crearArreglo( clientesObj: any ) {

  const clientes: ClienteModel[] = [];

  Object.keys( clientesObj ).forEach( key => {

    const cliente: ClienteModel = clientesObj[key];
    cliente.id = key;

    clientes.push( cliente );
  });


  return clientes;

}


}
