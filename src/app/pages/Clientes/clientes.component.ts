import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit{

  clientes: ClienteModel[] = [];
  cargando = false;


  

  constructor( private clienteService: ClienteService ) { }

  ngOnInit() {

    this.cargando = true;
    this.clienteService.getClientes()
      .subscribe( (resp:any) => {
        this.clientes = resp;
        this.cargando = false;
      });

  }

  borrarCliente( cliente: ClienteModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ cliente.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.clientes.splice(i, 1);
        this.clienteService.borrarCliente( cliente.id ).subscribe();
      }

    });



  }


}
