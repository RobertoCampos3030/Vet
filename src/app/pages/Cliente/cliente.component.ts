import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import Swal from 'sweetalert2';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  cliente: ClienteModel = new ClienteModel();


  constructor( private clienteService: ClienteService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.clienteService.getCliente( id )
      .subscribe( (resp: any) => {
        this.cliente = resp;
        this.cliente.id = id;
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

    if ( this.cliente.id ) {
      peticion = this.clienteService.actualizarCliente( this.cliente );
    } else {
      peticion = this.clienteService.crearCliente( this.cliente );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
