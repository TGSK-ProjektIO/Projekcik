import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';

import { AppComponent } from './app.component';
import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
// import { OpinieComponent } from './opinie/opinie.component';
import { PanelUzytkownikaComponent } from './panel-uzytkownika/panel-uzytkownika.component';
import { ProduktComponent } from './produkt/produkt.component';
import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import { WyszukiwanieComponent } from './wyszukiwanie/wyszukiwanie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpinieModule } from "./opinie/opinie.module";

import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import { AppRoutingModule } from './app-routing.module';
import {PanelUzytkownikaModule} from "./panel-uzytkownika/panel-uzytkownika.module";
import {RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    LogowanieIRejestracjaComponent,
    // OpinieComponent,
    PanelUzytkownikaComponent,
    ProduktComponent,
    SugestieIZgloszeniaComponent,
    WyszukiwanieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OpinieModule,
    RatingModule.forRoot()
    PanelUzytkownikaModule,
    RouterOutlet
    LogowanieIRejestracjaModule,
    AppRoutingModule
  ],
  providers: [RatingConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
