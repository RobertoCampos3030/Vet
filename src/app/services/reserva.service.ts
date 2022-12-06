import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs';
import { ReservaModel } from '../models/reserva.model';


interface Person {
  id: string;
  Fecha: string;
  Hora: string;
  Servicio: string;
  Mascota: string;

}


@Injectable({
  providedIn: 'root'
})
export class ReservaService {


  private url = 'https://nuevo-a644e-default-rtdb.firebaseio.com/';


  constructor( private http: HttpClient ) { }


  crearReserva( reserva: ReservaModel ) {

    return this.http.post(`${ this.url }/Reservas.json`, reserva)
            .pipe(
              map( (resp: any) => {
                reserva.id = resp.name;
                return reserva;
              })
            );

  }

  actualizarReserva( reserva: ReservaModel ) {

    const ReservaTemp = {
      ...reserva
    };

 
    return this.http.put(`${ this.url }/Reservas/${ reserva.id }.json`, ReservaTemp);


  }

  borrarReserva( id: string ) {

    return this.http.delete(`${ this.url }/Reservas/${ id }.json`);

  }


  getReserva( id: string ) {

    return this.http.get(`${ this.url }/Reservas/${ id }.json`);

  }


  getReservas() {
    return this.http.get(`${ this.url }/Reservas.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( ReservasObj: any ) {

    const Reservas: ReservaModel[] = [];

    Object.keys( ReservasObj ).forEach( key => {

      const reserva: ReservaModel = ReservasObj[key];
      reserva.id = key;

      Reservas.push( reserva );
    });


    return Reservas;

  }


}
