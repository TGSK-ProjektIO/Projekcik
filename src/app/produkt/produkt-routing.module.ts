import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProduktDodanieComponent} from "./produkt-dodanie/produkt-dodanie.component";
import {ProduktModyfikacjaComponent} from "./produkt-modyfikacja/produkt-modyfikacja.component";
import {ProduktWidokComponent} from "./produkt-widok/produkt-widok.component";
import {ProduktComponent} from "./produkt.component";
import { ProduktListaComponent } from './produkt-lista/produkt-lista.component';

const routes: Routes = [
  {
    path: 'produkt',
    component: ProduktComponent,
    children: [
      {
        path: 'produkt-dodanie',
        component: ProduktDodanieComponent
      },
      {
        path: 'produkt-modyfikacja/:id',
        component: ProduktModyfikacjaComponent
      },
      {
        path: 'produkt-widok/:id',
        component: ProduktWidokComponent
      },
      {
        path: 'produkt-lista',
        component: ProduktListaComponent
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProduktRoutingModule { }
