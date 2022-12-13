import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';


import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { AppComponent } from './app.component';
import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
import { PanelUzytkownikaComponent } from './panel-uzytkownika/panel-uzytkownika.component';
import { ProduktComponent } from './produkt/produkt.component';
import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import { WyszukiwanieComponent } from './wyszukiwanie/wyszukiwanie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministratorViewComponent } from './sugestie-i-zgloszenia/administrator-view/administrator-view.component';
import { SugestieIZgloszeniaModule } from "./sugestie-i-zgloszenia/sugestie-i-zgloszenia.module";
import {ProduktModule} from "./produkt/produkt.module";
import { OpinieModule } from "./opinie/opinie.module";

import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import { AppRoutingModule } from './app-routing.module';
import {PanelUzytkownikaModule} from "./panel-uzytkownika/panel-uzytkownika.module";

@NgModule({
  declarations: [
    AppComponent,
    LogowanieIRejestracjaComponent,
    // OpinieComponent,
    PanelUzytkownikaComponent,
    ProduktComponent,
    WyszukiwanieComponent,
    SugestieIZgloszeniaComponent,
    WyszukiwanieComponent,
    AdministratorViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SugestieIZgloszeniaModule
    ProduktModule,
    OpinieModule,
    RatingModule.forRoot(),
    PanelUzytkownikaModule,
    RouterOutlet,
    // LogowanieIRejestracjaModule,
    AppRoutingModule
  ],
  providers: [RatingConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
