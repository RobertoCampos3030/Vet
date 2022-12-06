import { Component, OnInit } from '@angular/core';
import { ServicioModel } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent  implements OnInit{

  servicios:  ServicioModel[] = [];
  cargando = false;


  

  constructor( private servicioModel: ServicioService ) { }

  ngOnInit() {

    this.cargando = true;
    this.servicioModel.getServicios()
      .subscribe( (resp:any) => {
        this.servicios = resp;
        this.cargando = false;
      });

  }

  borrarServicio( servicio: ServicioModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ servicio.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.servicios.splice(i, 1);
        this.servicioModel.borrarServicio( servicio.id ).subscribe();
      }

    });



  }


}
