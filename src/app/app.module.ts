import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {LogowanieIRejestracjaComponent} from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
import {PanelUzytkownikaComponent} from './panel-uzytkownika/panel-uzytkownika.component';
import {ProduktComponent} from './produkt/produkt.component';
import {SugestieIZgloszeniaComponent} from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import {WyszukiwanieComponent} from './wyszukiwanie/wyszukiwanie.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import {OpinieModule} from "./opinie/opinie.module";
import {AppRoutingModule} from './app-routing.module';
import {PanelUzytkownikaModule} from "./panel-uzytkownika/panel-uzytkownika.module";
import {SugestieIZgloszeniaModule} from "./sugestie-i-zgloszenia/sugestie-i-zgloszenia.module";

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
