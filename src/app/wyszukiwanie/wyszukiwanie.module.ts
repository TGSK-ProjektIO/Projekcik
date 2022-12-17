import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyszukiwanieComponent } from './wyszukiwanie.component';
import { WyszukajProduktLubProfilComponent } from './wyszukaj-produkt-lub-profil/wyszukaj-produkt-lub-profil.component';
import {WyszukiwanieRoutingModule} from "./wyszukiwanie-routing.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    WyszukajProduktLubProfilComponent
  ],
  exports: [
    WyszukajProduktLubProfilComponent,
  ],
  imports: [
    CommonModule,
    WyszukiwanieRoutingModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class WyszukiwanieModule { }
