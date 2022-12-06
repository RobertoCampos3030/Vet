import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';


import { ClienteComponent } from './pages/Cliente/cliente.component';
import { ClientesComponent } from './pages/Clientes/clientes.component';
import { ReservaComponent } from './pages/Reserva/reserva.component';
import { ReservasComponent } from './pages/Reservas/reservas.component';
import { ServiciosComponent } from './pages/Servicios/servicios.component';
import { ServicioComponent } from './pages/Servicio/servicio.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  {path:'',component:HeroesComponent,pathMatch:'full'},  
  
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: ClienteComponent },

  { path: 'reservas', component: ReservasComponent },
  { path: 'reserva/:id', component: ReservaComponent },
  
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicio/:id', component: ServicioComponent },
  
{
    path:'mascotas',
    component:HeroesComponent

},
  
{
  path:'reserva',
  component:ReservasComponent

},
{
  path:'servicios',
  component:ServiciosComponent

},

];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
