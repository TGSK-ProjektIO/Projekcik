import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja/logowanie-i-rejestracja.component';
import { PanelUzytkownikaComponent } from './panel-uzytkownika/panel-uzytkownika.component';
import { ProduktComponent } from './produkt/produkt.component';
import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia/sugestie-i-zgloszenia.component';
import { PolishPaginatorIntl, WyszukiwanieComponent} from './wyszukiwanie/wyszukiwanie.component';
import { AdministratorViewComponent } from './sugestie-i-zgloszenia/administrator-view/administrator-view.component';
import { SugestieIZgloszeniaModule } from "./sugestie-i-zgloszenia/sugestie-i-zgloszenia.module";
import { ProduktModule } from "./produkt/produkt.module";
import { OpinieModule } from "./opinie/opinie.module";
import {LogowanieIRejestracjaModule} from "./logowanie-i-rejestracja/logowanie-i-rejestracja.module";
import { PanelUzytkownikaModule } from "./panel-uzytkownika/panel-uzytkownika.module";


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
    FormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    SugestieIZgloszeniaModule,
    // ProduktModule,
    OpinieModule,
    RatingModule.forRoot(),
    // PanelUzytkownikaModule,
    RouterOutlet,
    LogowanieIRejestracjaModule,
    AppRoutingModule
  ],
  providers: [RatingConfig, {provide: MatPaginatorIntl, useClass: PolishPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
