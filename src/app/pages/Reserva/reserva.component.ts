import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import Swal from 'sweetalert2';
import { ReservaModel } from 'src/app/models/reserva.model';
import { ReservaService } from 'src/app/services/reserva.service';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit{

  reserva: ReservaModel = new ReservaModel();


  constructor( private reservaService: ReservaService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.reservaService.getReserva( id )
      .subscribe( (resp: any) => {
        this.reserva = resp;
        this.reserva.id = id;
      });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton:false,
    });
    Swal.showLoading(Swal.getDenyButton());


    let peticion: Observable<any>;

    if ( this.reserva.id ) {
      peticion = this.reservaService.actualizarReserva( this.reserva );
    } else {
      peticion = this.reservaService.crearReserva( this.reserva );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.reserva.Fecha,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
