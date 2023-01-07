import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduktDodanieComponent} from './produkt-dodanie/produkt-dodanie.component';
import {ProduktModyfikacjaComponent} from './produkt-modyfikacja/produkt-modyfikacja.component';
import {ProduktWidokComponent} from './produkt-widok/produkt-widok.component';
import {ProduktRoutingModule} from './produkt-routing.module';

import {KategoriaDodanieComponent} from './kategoria-dodanie/kategoria-dodanie.component';
import {KategoriaModyfikacjaComponent} from './kategoria-modyfikacja/kategoria-modyfikacja.component';
import {KategoriaWidokComponent} from './kategoria-widok/kategoria-widok.component';
import {KategoriaListaComponent} from './kategoria-lista/kategoria-lista.component';


import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import { ProduktListaComponent } from './produkt-lista/produkt-lista.component';
import { OpinieModule } from "../opinie/opinie.module";

@NgModule({
    declarations: [
        ProduktDodanieComponent,
        ProduktModyfikacjaComponent,
        ProduktWidokComponent,
        ProduktListaComponent,

        KategoriaDodanieComponent,
        KategoriaModyfikacjaComponent,
        KategoriaWidokComponent,
        KategoriaListaComponent
    ],
    exports: [
        ProduktDodanieComponent,
        ProduktModyfikacjaComponent,
        ProduktWidokComponent,
        ProduktListaComponent,

        KategoriaDodanieComponent,
        KategoriaModyfikacjaComponent,
        KategoriaWidokComponent,
        KategoriaListaComponent
    ],
    imports: [
        CommonModule,
        ProduktRoutingModule,
        BrowserModule,
        FormsModule,
        OpinieModule
    ]
})
export class ProduktModule { }

