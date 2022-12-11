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
import { AdministratorViewComponent } from './sugestie-i-zgloszenia/administrator-view/administrator-view.component';
import { SugestieIZgloszeniaModule } from "./sugestie-i-zgloszenia/sugestie-i-zgloszenia.module";

@NgModule({
  declarations: [
    AppComponent,
    LogowanieIRejestracjaComponent,
    OpinieComponent,
    PanelUzytkownikaComponent,
    ProduktComponent,
    SugestieIZgloszeniaComponent,
    WyszukiwanieComponent,
    AdministratorViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SugestieIZgloszeniaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
