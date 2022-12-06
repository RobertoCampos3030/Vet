import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ClienteComponent } from './pages/Cliente/cliente.component';
import { ClientesComponent } from './pages/Clientes/clientes.component';
import { ReservaComponent } from './pages/Reserva/reserva.component';
import { ReservasComponent } from './pages/Reservas/reservas.component';
import { ServicioComponent } from './pages/Servicio/servicio.component';
import { ServiciosComponent } from './pages/Servicios/servicios.component';



@NgModule({
    declarations: [
        AppComponent,
        HeroeComponent,
        HeroesComponent,
        SidebarComponent,
        ClienteComponent,
    ClientesComponent,
    ReservaComponent,
    ReservasComponent,
    ServicioComponent,
    ServiciosComponent

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        
    ]
})
export class AppModule { }
