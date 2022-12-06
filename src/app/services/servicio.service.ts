import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs';
import { ServicioModel } from '../models/servicio.model';

interface Person {
  id: string;
  nombre: string;
  precio: string;


}
@Injectable({
  providedIn: 'root'
})
export class ServicioService {


  private url = 'https://nuevo-a644e-default-rtdb.firebaseio.com/';


  constructor( private http: HttpClient ) { }


  crearServicio( reserva: ServicioModel ) {

    return this.http.post(`${ this.url }/Servicios.json`, reserva)
            .pipe(
              map( (resp: any) => {
                reserva.id = resp.name;
                return reserva;
              })
            );

  }

  actualizarServicio( reserva: ServicioModel ) {

    const ServicioTemp = {
      ...reserva
    };

 
    return this.http.put(`${ this.url }/Servicios/${ reserva.id }.json`, ServicioTemp);


  }

  borrarServicio( id: string ) {

    return this.http.delete(`${ this.url }/Servicios/${ id }.json`);

  }


  getServicio( id: string ) {

    return this.http.get(`${ this.url }/Servicios/${ id }.json`);

  }


  getServicios() {
    return this.http.get(`${ this.url }/Servicios.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( ServiciosObj: any ) {

    const Servicios: ServicioModel[] = [];

    Object.keys( ServiciosObj ).forEach( key => {

      const reserva: ServicioModel = ServiciosObj[key];
      reserva.id = key;

      Servicios.push( reserva );
    });


    return Servicios;

  }


}
