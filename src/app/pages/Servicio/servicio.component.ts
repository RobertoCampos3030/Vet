import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioModel } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent  implements OnInit {

  servicio: ServicioModel = new ServicioModel();


  constructor( private servicioService: ServicioService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.servicioService.getServicio( id )
      .subscribe( (resp: any) => {
        this.servicio = resp;
        this.servicio.id = id;
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

    if ( this.servicio.id ) {
      peticion = this.servicioService.actualizarServicio( this.servicio );
    } else {
      peticion = this.servicioService.crearServicio( this.servicio );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.servicio.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
