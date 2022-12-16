import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
import { OpinieComponent } from './opinie/opinie.component';
import { PanelUzytkownikaComponent } from './panel-uzytkownika/panel-uzytkownika.component';
import { ProduktComponent } from './produkt/produkt.component';
import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import { WyszukiwanieComponent } from './wyszukiwanie/wyszukiwanie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import {ProduktModule} from "./produkt/produkt.module";

import { AppRoutingModule } from './app-routing.module';
import {PanelUzytkownikaModule} from "./panel-uzytkownika/panel-uzytkownika.module";
import {RouterOutlet} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LogowanieIRejestracjaComponent,
    OpinieComponent,
    PanelUzytkownikaComponent,
    ProduktComponent,
    SugestieIZgloszeniaComponent,
    WyszukiwanieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelUzytkownikaModule,
    RouterOutlet,
    LogowanieIRejestracjaModule,
    ProduktModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
