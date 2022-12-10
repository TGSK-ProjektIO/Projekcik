import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ProduktComponent} from './produkt.component';
import { ProduktDodanieComponent } from './produkt-dodanie/produkt-dodanie.component';
import { ProduktModyfikacjaComponent } from './produkt-modyfikacja/produkt-modyfikacja.component';
import { ProduktWidokComponent } from './produkt-widok/produkt-widok.component';

const appRoute: Routes = [
  {path: '', component: ProduktWidokComponent},
  {path: 'produkt-dodanie', component: ProduktDodanieComponent},
  {path: 'produkt-modyfikacja', component: ProduktModyfikacjaComponent},
  {path: 'produkt-widok', component: ProduktWidokComponent},
]

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
    RouterModule.forRoot(appRoute)
  ]
})
export class ProduktModule { }
