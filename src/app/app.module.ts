import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {RouterOutlet} from "@angular/router";
import {SugestieIZgloszeniaModule} from "./sugestie-i-zgloszenia/sugestie-i-zgloszenia.module";
import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
import { PanelUzytkownikaComponent } from './panel-uzytkownika/panel-uzytkownika.component';
import { ProduktComponent } from './produkt/produkt.component';
import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import { WyszukiwanieComponent } from './wyszukiwanie/wyszukiwanie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import {OpinieModule} from "./opinie/opinie.module";
import {ProduktModule} from "./produkt/produkt.module";
import { AppRoutingModule } from './app-routing.module';
import {PanelUzytkownikaModule} from "./panel-uzytkownika/panel-uzytkownika.module";
import { HttpClientModule } from '@angular/common/http';
import { ProduktRoutingModule } from './produkt/produkt-routing.module';
import {AlertConfig, AlertModule} from "ngx-bootstrap/alert";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {WyszukiwanieModule} from "./wyszukiwanie/wyszukiwanie.module";

@NgModule({
  declarations: [
    AppComponent,
    LogowanieIRejestracjaComponent,
    PanelUzytkownikaComponent,
    ProduktComponent,
    SugestieIZgloszeniaComponent,
    WyszukiwanieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelUzytkownikaModule,
    SugestieIZgloszeniaModule,
    RouterOutlet,
    LogowanieIRejestracjaModule,
    OpinieModule,
    AppRoutingModule,
    ProduktModule,
    ProduktRoutingModule,
    OpinieModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    WyszukiwanieModule
  ],
  providers: [AlertConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
