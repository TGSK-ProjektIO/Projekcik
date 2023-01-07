import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ProduktDodanieComponent} from "./produkt-dodanie/produkt-dodanie.component";
import {ProduktModyfikacjaComponent} from "./produkt-modyfikacja/produkt-modyfikacja.component";
import {ProduktWidokComponent} from "./produkt-widok/produkt-widok.component";
import {ProduktComponent} from "./produkt.component";
import { ProduktListaComponent } from './produkt-lista/produkt-lista.component';

import {KategoriaDodanieComponent} from './kategoria-dodanie/kategoria-dodanie.component';
import {KategoriaModyfikacjaComponent} from './kategoria-modyfikacja/kategoria-modyfikacja.component';
import {KategoriaWidokComponent} from './kategoria-widok/kategoria-widok.component';
import {KategoriaListaComponent} from './kategoria-lista/kategoria-lista.component';

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
      {
        path: 'kategoria-dodanie',
        component: KategoriaDodanieComponent
      },
      {
        path: 'kategoria-modyfikacja/:id',
        component: KategoriaModyfikacjaComponent
      },
      {
        path: 'kategoria-widok/:id',
        component: KategoriaWidokComponent
      },
      {
        path: 'kategoria-lista',
        component: KategoriaListaComponent
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
