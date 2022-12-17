import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduktDodanieComponent} from './produkt-dodanie/produkt-dodanie.component';
import {ProduktModyfikacjaComponent} from './produkt-modyfikacja/produkt-modyfikacja.component';
import {ProduktWidokComponent} from './produkt-widok/produkt-widok.component';
import {ProduktRoutingModule} from './produkt-routing.module';

import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProduktDodanieComponent,
    ProduktModyfikacjaComponent,
    ProduktWidokComponent
  ],
  exports: [
    ProduktDodanieComponent,
    ProduktModyfikacjaComponent,
    ProduktWidokComponent
  ],
  imports: [
    CommonModule,
    ProduktRoutingModule,
    BrowserModule,
    FormsModule
  ]
})
export class ProduktModule { }

